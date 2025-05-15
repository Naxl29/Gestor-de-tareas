"use strict"

var express = require('express');
var Tarea = require('../Controllers/tareaController');
var Usuario = require('../Controllers/usuariosController');
var router = express.Router();

//rutas
router.post('/saveTarea', Tarea.saveTarea);
router.get('/tareas', Tarea.getTareas);
router.delete('/deleteTarea/:id', Tarea.deleteTarea);
router.put('/updateTarea/:id', Tarea.updateTarea);

router.post('/saveUsuario', Usuario.saveUsuario);
router.get('/usuarios', Usuario.getUsuarios);
router.delete('/deleteUsuario/:id', Usuario.deleteUsuario);
router.put('/updateUsuario/:id', Usuario.updateUsuario);
router.post('/login', Usuario.login);

module.exports = router;