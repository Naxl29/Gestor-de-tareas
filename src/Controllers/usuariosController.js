'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/usuarioModel');

// Función reutilizable para validar si el correo está en uso por otro usuario
const EmailExist = async (email, excludeUserId = null) => {
    const user = await Usuario.findOne({ email: email.toLowerCase() });
    return user && (!excludeUserId || user._id.toString() !== excludeUserId);
};

const controller = {

    // Método para guardar un usuario
    saveUsuario: async (req, res) => {
        const params = req.body;

        try {
            if (await EmailExist(params.email)) {
                return res.status(400).send({
                    status: 'error',
                    message: 'El correo electrónico ya está registrado.'
                });
            }

            const usuario = new Usuario();
            usuario.name = params.name;
            usuario.email = params.email.toLowerCase();
            usuario.password = await bcrypt.hash(params.password, 10);

            const usuarioStored = await usuario.save();
            return res.status(200).send({
                status: 'success',
                usuarioStored
            });

        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al crear usuario',
                error: err.message
            });
        }
    },

    // Método para iniciar sesión
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Usuario.findOne({ email: email.toLowerCase() }); // Buscar el usuario por correo electrónico

            if (!user) {
                return res.status(401).send({
                    status: "error",
                    message: "Usuario no encontrado",
                });
            }

            const ValidPassword = await bcrypt.compare(password, user.password);

            if (!ValidPassword) {
                return res.status(401).send({
                    status: "error",
                    message: "Contraseña incorrecta",
                });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                'gestor_de_tareas', // Recomendado: usar process.env.JWT_SECRET
                { expiresIn: '1h' }
            );

            return res.status(200).send({
                status: "success",
                message: "Inicio de sesión exitoso",
                token: token
            });

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al iniciar sesión",
            });
        }
    },

    cerrarSesion: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'No se pudo cerrar sesión'
                });
            }
            res.clearCookie('connect.sid');
            return res.status(200).send({
                status: 'success',
                message: 'Sesión cerrada'
            });
        });
    },

    getUsuarioById: async (req, res) => {
        try {
            const userId = req.user.userId;
            const user = await Usuario.findById(userId).select('-password');

            if (!user) {
                return res.status(404).send({
                    status: "error",
                    message: "Usuario no encontrado."
                });
            }

            return res.status(200).send({
                status: "success",
                user
            });

        } catch (error) {
            console.error("Error al obtener detalles del usuario:", error);
            return res.status(500).send({
                status: "error",
                message: "Error interno del servidor al obtener el usuario."
            });
        }
    },

    updateCurrentUser: async (req, res) => {
        try {
            const userId = req.user.userId;
            const { name, email} = req.body;

            if (email && await EmailExist(email, userId)) {
                return res.status(400).send({
                    status: 'error',
                    message: 'El nuevo correo electrónico ya está registrado por otro usuario.'
                });
            }

            // Construir el objeto de actualización
            let updateFields = {}; // Solo incluir campos que se van a actualizar
            if (name !== undefined) updateFields.name = name;
            if (email !== undefined) updateFields.email = email.toLowerCase();

            const updatedUser = await Usuario.findByIdAndUpdate(
                userId,
                { $set: updateFields },
                { new: true, runValidators: true }
            ).select('-password');

            return res.status(200).send({
                status: "success",
                message: "Usuario actualizado correctamente",
                user: updatedUser
            });

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    status: 'error',
                    message: error.message
                });
            }
            return res.status(500).send({
                status: "error",
                message: "Error interno del servidor al actualizar el usuario."
            });
        }
    }
};

module.exports = controller;
