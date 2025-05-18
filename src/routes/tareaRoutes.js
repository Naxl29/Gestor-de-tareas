"use strict"

var express = require('express');
var Tarea = require('../Controllers/tareaController');
var router = express.Router();

//rutas de tareas

// Ruta para guardar una nueva tarea
router.post('/saveTarea', Tarea.saveTarea);

// Ruta para obtener todas las tareas
router.get('/tareas', Tarea.getTareas);

// Ruta para obtener una tarea por ID
router.delete('/deleteTarea/:id', Tarea.deleteTarea);

// Ruta para actualizar una tarea
router.put('/updateTarea/:id', Tarea.updateTarea);

module.exports = router;