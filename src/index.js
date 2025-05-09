'use stric'

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const url = "mongodb+srv://nicolas:nicolas123@cluster0.2sexo24.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//Configuración para evitrar fallos de conexión:
mongoose.Promise = global.Promise;

mongoose.connect(url, {useNewUrlParser: true}).then(() =>{
    console.log("Conexión a la BDD realizada con éxito!");
    app.listen(port, () => {
        console.log("Servidor ejecutándose en el puerto " + port);
    })
})

