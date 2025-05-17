'use strict'

var Tarea = require('../Models/tareaModels');

//Objeto controller para disponer de todas las funciones de ruta

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

        try {

            const tareaStored = await tarea.save(); // Guarda la tarea en la base de datos
            return res.status(200).send({
                status: 'success',
                tareaStored 
            });
        } catch (err) {
            return res.status(500).send({  // Error al guardar
                status: "Error",
                message: "Error al guardar la tarea",
                error: err 
            });
        }
    },

    getTareas: async (req, res) => { // Método para obtener todas las tareas
        try {
            const tareas = await Tarea.find().sort('-date'); // Ordenar por fecha descendente
            if (!tareas || tareas.length === 0) { // Si no hay tareas
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay tareas para mostrar'
                })
            }
            return res.status(200).send({ // Si hay tareas
                status: 'success',
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
    deleteTarea: async (req, res) =>{ 
        var tareaId = req.params.id;
        try {
            const tareaRemoved = await Tarea.findOneAndDelete({_id: tareaId}); // Eliminar la tarea
            if (!tareaRemoved) { // Si no se encuentra la tarea
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado la tarea'
                })
            }
            return res.status(200).send({ 
                status: 'success',
                tarea: tareaRemoved
            })
        } catch (err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al eliminar'
            })
        }
    },

    updateTarea: async (req, res) => { // Método para actualizar una tarea
        var tareaId = req.params.id;
        var params = req.body.params;
        const title = params.title;
        const description = params.description;

        try {
            const tareaUpdated = await Tarea.findOneAndUpdate( // Buscar y actualizar la tarea
                { _id: tareaId },
                { title: title, description: description },
                { new: true }
            );
            if (!tareaUpdated) {
                return res.status(404).send({
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