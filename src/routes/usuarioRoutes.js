"use strict"

var express = require('express');
var Usuario = require('../Controllers/usuariosController');
const auth = require('../middlewares/auth');
var router = express.Router();

//rutas de usuarios

// Ruta para guardar un nuevo usuario
router.post('/saveUsuario', Usuario.saveUsuario);

// Ruta para obtener un usuario por ID
router.get('/usuario', auth, Usuario.getUsuarioById);

// Ruta para actualizar el usuario actual
router.put('/usuario', auth, Usuario.updateCurrentUser);

// Ruta para iniciar sesión
router.post('/login', Usuario.login)

// Ruta para cerrar sesión
router.post('/cerrarSesion', Usuario.cerrarSesion);

module.exports = router;

