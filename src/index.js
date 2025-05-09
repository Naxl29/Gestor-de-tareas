'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const url = "mongodb+srv://nicolas:nicolas123@cluster0.2sexo24.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//Configuración para evitrar fallos de conexión:
mongoose.Promise = global.Promise;

var tareaRoutes = require('./routes/tarea');

//Se carga el body.parser:
app.use(bodyParser.urlencoded({ extend: false }));

//Se convierte cualquier tipo de petición a json
app.use(bodyParser.json());

//Se activa el CORS para permitir peticiones AJAX y HTTP desde el frontend
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-header', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res,header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Se carga los archivos de ruta de la app
app.use('/api', tareaRoutes);

mongoose.connect(url, {useNewUrlParser: true}).then(() =>{
    console.log("Conexión a la BDD realizada con éxito!");
    app.listen(port, () => {
        console.log("Servidor ejecutándose en el puerto " + port);
    })
})

