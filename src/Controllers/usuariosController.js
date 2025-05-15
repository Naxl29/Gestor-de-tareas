'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/usuarioModel');

var controller = {

    //Método para guardar un usuario
    saveUsuario: async (req, res) => {
        //Se obtienen los datos:
        var params = req.body;
        //Objeto para guardar
        var usuario = new Usuario();
        usuario.name = params.name;
        usuario.email = params.email;
        usuario.password = await bcrypt.hash(params.password, 10);

        try {
            const usuarioStored = await usuario.save();
            return res.status(200).send({
                status: 'success',
                usuarioStored
            });
        } catch (err) {
            return res.status(500).send({ 
                status: "Error",
                message: "Error al crear usuario",
                error: err 
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

            // Si las credenciales son válidas, devolver un mensaje de éxito
            res.status(200).send({
            status: "success",
            message: "Inicio de sesión exitoso",
            });
        } catch (error) {
            res.status(500).send({
            status: "error",
            message: "Error al iniciar sesión",
            });
        }
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
