"use strict"

var express = require('express');
var Tarea = require('../Controllers/tareaController');
var router = express.Router();

//rutas
router.post('/saveTarea', Tarea.saveTarea);
router.get('/tareas', Tarea.getTareas);

router.delete('/deleteTarea/:id', Tarea.deleteTarea);
router.put('/updateTarea/:id', Tarea.updateTarea);

module.exports = router;

