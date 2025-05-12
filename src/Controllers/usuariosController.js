'use strict'

var Usuario = require('../Models/usuarioModel');

var controller = {

    //Método para guardar un usuario
    saveUsuario: async (req, res) => {
        //Se obtienen los datos:
        var params = req.body;
        //Objeto para guardar
        var usuario = new Usuario();
        usuario.nombre = params.nombre;
        usuario.email = params.email;
        usuario.password = params.password

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
                return resizeTo.status(404).send({
                    status: 'Error',
                    message: 'No hay usuarios para mostrar'
                })
            }

            //Si se obtienen los usuarios:
            return res.status(200).send({
                status: 'success',
                usuarios
            })
        })
    },


    getusuarioid: async (req, res) => {
        const usuarioId = req.params.id;

        //validar que el id sea valido
        if (!require('mongoose').Types.ObjectId.isValid(usuarioId)) {
            return res.status(400).send({
                status: 'error',
                message: 'ID no válido'
            });
        }
    
        try {
            const usuario = await Usuario.findById(usuarioId);

            if (!usuario) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Ususario no encontrado'
                });
            }
        
            return res.status(200).send({
                status: 'success',
                usuario
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al buscar el usuario',
                error
            });
        }
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
