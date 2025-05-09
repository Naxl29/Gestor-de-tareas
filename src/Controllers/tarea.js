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

    getTareas (req, res) => {

        var query = Tarea.find({});

        query.sort('-date').exec((err, tareas) =>{

            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al extraer los datos'
                })
            }

            //Si no existen tareas:
            if(!tareas)
        })
    }

