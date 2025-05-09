'use strict'

var Tarea = require('../Models/tarea');

//Objeto controller para disponer de todas las funciones de ruta

var controller = {
    //Método para guardar una tarea
    save : (req, res) =>{
        //Se obtienen los datos:
        var params = req.body;
        //Objeto para guardar
        var tarea = new Tarea();
        tarea.title = params.title;
        tarea.description = params.description;

        //Se guarda el articulo en la bd:
        tarea.save((err, tareaStored) => {
            
            if(err || !tareaStored){
                return res.status(404).send({
                    status: "Error",
                    message: "La tarea no se ha guardado"
                })
            }
            //Se devuelve una respuesta si todo funciona correctamente:
            return res.status(200).send({
                status: 'success',
                tareaStored
            })
        })
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
                status: 'Error',
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

    }
}
update: (req, res) => {
    var tareaId = req.params.id;

    // Recogemos los datos del body
    var params = req.body;

    // Asignar valores
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
module.exports = controller;