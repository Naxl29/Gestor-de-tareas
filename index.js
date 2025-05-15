'use strict';

const express = require('express');
const mongoose = require('./src/database/conexion');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Importar rutas de usuario y tarea
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const tareaRoutes = require('./src/routes/tareaRoutes');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'Public')));

// Rutas de tarea
app.use('/api', tareaRoutes);

// Rutas de usuario
app.use('/api', usuarioRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'Public', 'index.html'));
});

// Iniciar servidor (ya conectado mongoose desde conexion.js)
app.listen(port, () => {
    console.log("Servidor ejecutándose en http://localhost:" + port);
});
