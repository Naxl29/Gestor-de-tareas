"use strict"

var express = require('express');
var Usuario = require('../Controllers/usuariosController');
var router = express.Router();

//rutas de usuarios

// Ruta para guardar un nuevo usuario
router.post('/saveUsuario', Usuario.saveUsuario);

// Ruta para obtener todos los usuarios
router.get('/usuarios', Usuario.getUsuarios);

// Ruta para obtener un usuario por ID
router.delete('/deleteUsuario/:id', Usuario.deleteUsuario);

// Ruta para actualizar un usuario
router.put('/updateUsuario/:id', Usuario.updateUsuario);

// Ruta para iniciar sesión
router.post('/login', Usuario.login)

// Ruta para cerrar sesión
router.post('/cerrarSesion', Usuario.cerrarSesion);

module.exports = router;
