"use strict"

var express = require('express');
var tarea = require('../Controllers/tarea');
var router = express.Router();

//rutas
router.post('/save', tarea.save);
router.get('/tareas', tarea.getTareas);

router.delete('/tarea/:id', tarea.deleteTarea);
router.put('/update/:id', tarea.updateTarea);

module.exports = router;

