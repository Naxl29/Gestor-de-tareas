"use strict"

var express = require('express');
var Usuario = require('../Controllers/usuariosController');
var router = express.Router();

//rutas de usuarios
router.post('/saveUsuario', Usuario.saveUsuario);
router.get('/usuarios', Usuario.getUsuarios);
router.delete('/deleteUsuario/:id', Usuario.deleteUsuario);
router.put('/updateUsuario/:id', Usuario.updateUsuario);
router.post('/login', Usuario.login)

module.exports = router;
