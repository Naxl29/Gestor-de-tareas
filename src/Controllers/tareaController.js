'use strict'

var Tarea = require('../Models/tareaModels');

var controller = {
    //Método para guardar una tarea
    saveTarea: async (req, res) => {
        //Se obtienen los datos:
        var params = req.body;
        //Objeto para guardar
        var tarea = new Tarea(); 
        //Se asignan los valores:
        tarea.title = params.title;
        tarea.description = params.description;

        //Se asigna el usuario que está creando la tarea
        tarea.userId = req.user.userId;

        //Se valida el título
        try {
            const tareaStored = await tarea.save(); // Guardar en la base de datos
            return res.status(200).send({ // Enviar respuesta
                status: 'success',
                tareaStored 
            });
        } catch (err) {
            return res.status(500).send({  // En caso de error
                status: "Error",
                message: "Error al guardar la tarea",
                error: err 
            });
        }
    },

    getTareas: async (req, res) => {
        try {
            const tareas = await Tarea.find({ userId: req.user.userId }).sort('-date'); // Obtener todas las tareas ordenadas por fecha
            if (!tareas || tareas.length === 0) { // No hay tareas
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay tareas para mostrar'
                })
            }
            return res.status(200).send({ // Enviar respuesta
                status: 'success', // En caso de éxito
                tareas
            })
        } catch (err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al extraer los datos'
            })
        }
    },

        //Eliminar tarea:
        deleteTarea: async (req, res) => {
            const tareaId = req.params.id;

            try {
                // Asegurarse de que solo se pueda eliminar si la tarea pertenece al usuario autenticado
                const tareaRemoved = await Tarea.findOneAndDelete({
                    _id: tareaId,
                    userId: req.user.userId // Comprobar propiedad
                });

                if (!tareaRemoved) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No tienes permiso para eliminar la tarea.'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    tarea: tareaRemoved
                });
            } catch (err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar'
                });
            }
        },


        //Actualizar tareas
        updateTarea: async (req, res) => {
        var tareaId = req.params.id;
        const { title, description } = req.body;  // Aquí corregi, no estaba tomando los campos

        try {
           const tareaUpdated = await Tarea.findOneAndUpdate(
                { _id: tareaId, userId: req.user.userId },
                { title, description },
                { new: true }
            );
            if (!tareaUpdated) {
                return res.status(404).send({ // No se encontró la tarea
                    status: "error",
                    message: "Error, no existe la tarea!!"
                });
            }
            return res.status(200).send({
                status: "success",
                tarea: tareaUpdated
            });
        } catch (err) {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar!!"
            });
        }
    }

}

module.exports = controller;