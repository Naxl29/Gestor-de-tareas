'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/usuarioModel');

var controller = {

   //Método para guardar un usuario
    saveUsuario: async (req, res) => {
        const params = req.body;

        try {
            // Verificar si el correo ya está registrado ignorando mayúsculas y minúsculas
            const existingUser = await Usuario.findOne({ email: params.email.toLowerCase() });

            if (existingUser) {
                return res.status(400).send({
                    status: 'error',
                    message: 'El correo electrónico ya está registrado.'
                });
            }

            // Crear nuevo usuario
            const usuario = new Usuario();
            usuario.name = params.name;
            usuario.email = params.email.toLowerCase(); // Guardamos el email en minúsculas
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

    
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Buscar al usuario en la base de datos
            const user = await Usuario.findOne({ email });

            if (!user) {
            return res.status(401).send({
                status: "error",
                message: "Usuario no encontrado",
            });
            }

            // Verificar la contraseña
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
            return res.status(401).send({
                status: "error",
                message: "Contraseña incorrecta",
            });
            }

             // Generar token
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                'clave_secreta_segura', // Cámbiala por una más segura
                { expiresIn: '1h' }
            );

            // Si las credenciales son válidas, devolver un mensaje de éxito
            res.status(200).send({
            status: "success",
            message: "Inicio de sesión exitoso",
            token: token
            });
            
        } catch (error) {
            res.status(500).send({
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
                    message: 'No se pudo cerrar sesión' });
            }
            res.clearCookie('connect.sid'); // Opcional: limpia la cookie
            res.status(200).send({ 
                status: 'success', 
                message: 'Sesión cerrada' });
        });
    },


    // Método para ver todos los usuarios
    getUsuarios: (req, res) => {

        var query = Usuario.find({});

        query.exec((err, usuarios) =>{

            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al extraer los datos'
                })
            }

            //Si no existen usuarios:
            if(!usuarios){
                return res.status(404).send({
                    status: 'Error',
                    message
                })
            }

            //Si se obtienen los usuarios:
            return res.status(200).send({
                status: 'success',
                usuarios
            })
        })
    },

    // Método para eliminar un usuario
    deleteUsuario: (req, res) => {
        var usuarioId = req.params.id;
        Usuario.findOneAndDelete({ _id: usuarioId }, (err, usuarioRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar'
                });
            }

            if (!usuarioRemoved) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado el usuario'
                });
            }

            // Si no hay ningún error:
            return res.status(200).send({
                status: 'success',
                usuario: usuarioRemoved
            });
        });
    },
    
    // Método para actualizar un usuario
    updateUsuario: (req, res) => {
        var usuarioId = req.params.id;
        var params = req.body;
        const name = params.name;
        const email = params.email;

        Usuario.findOneAndUpdate(
            { _id: usuarioId },
            { name: name, email: email },
            { new: true },
            (err, usuarioUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error al actualizar!!"
                    });
                }

                if (!usuarioUpdated) {
                    return res.status(404).send({
                        status: "error",
                        message: "Error, no existe el usuario!!"
                    });
                }

                // Si no hay ningún error obtenemos el usuario actualizado
                return res.status(200).send({
                    status: "success",
                    usuario: usuarioUpdated
                });
            }
        );
    }
};

module.exports = controller;
