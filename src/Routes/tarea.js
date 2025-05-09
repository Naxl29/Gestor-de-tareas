"use strict"

var express = require('express');
var Tarea = require('../Controllers/tarea');
var router = express.Router();

//rutas
router.post('/save', Tarea.save);
router.get('/tareas', Tarea.getTareas);

router.delete('/delete/:id', Tarea.delete);
router.put('/update/:id', Tarea.update);

module.exports = router;

