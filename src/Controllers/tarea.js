'use strict'

var Tarea = require('../Models/tarea');

//Objeto controller para disponer de todas las funciones de ruta

var controller = {
    //Método para guardar una tarea
    save : async (req, res) => {
        //Se obtienen los datos:
        var params = req.body;
        //Objeto para guardar
        var tarea = new Tarea();
        tarea.title = params.title;
        tarea.description = params.description;

        try {
            const tareaStored = await tarea.save();
            return res.status(200).send({
                status: 'success',
                tareaStored
            });
        } catch (err) {
            return res.status(500).send({ 
                status: "Error",
                message: "Error al guardar la tarea",
                error: err 
            });
        }
    },

    getTareas: (req, res) => {

        var query = Tarea.find({});

        query.sort('-date').exec((err, tareas) =>{

            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al extraer los datos'
                })
            }

            //Si no existen tareas:
            if(!tareas){
                return resizeTo.status(404).send({
                    status: 'Error',
                    message: 'No hay tareas para mostrar'
                })
            }

            //Si se obtienen las tareas:
            return res.status(200).send({
                status: 'success',
                tareas
            })
        })
    },

    //Eliminar tarea:
    delete : (req, res) =>{
        var tareaId = req.params.id;
        Tarea.findOneAndDelete({_id: tareaId}, (err, tareaRemoved) =>{

            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar'
                })
            }

            if(!tareaRemoved){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado la tarea'
                })
            }

            //Si no hay ningún error:
            return res.status(200).send({
                status: 'success',
                tarea: tareaRemoved
            })
        })

    },

    update : (req, res) => {
        var tareaId = req.params.id;
        var params = req.body.params;
        const title = params.title;
        const description = params.description;

        Tarea.findOneAndUpdate(
            { _id: tareaId },
            { title: title, description: description },
            { new: true },
            (err, tareaUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error al actualizar!!"
                    });
                }

                if (!tareaUpdated) {
                    return res.status(404).send({
                        status: "error",
                        message: "Error, no existe la tarea!!"
                    });
                }

                // Si no hay ningún error obtenemos la tarea actualizada
                return res.status(200).send({
                    status: "success",
                    tarea: tareaUpdated
                });
            }
        );
    }
}

module.exports = controller;