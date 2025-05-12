'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Sirve para manejar las rutas de forma segura 


const app = express();
const port = 3000;
const url = "mongodb+srv://nicolas:nicolas123@cluster0.2sexo24.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//Configuración para evitrar fallos de conexión:
mongoose.Promise = global.Promise;

var tareaRoutes = require('./src/Routes/tarea'); // El nombre de la ruta no esta escrito correctamente

//Se carga el body.parser:
app.use(bodyParser.urlencoded({ extend: false }));

//Se convierte cualquier tipo de petición a json
app.use(bodyParser.json());

//Se activa el CORS para permitir peticiones AJAX y HTTP desde el frontend
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-header', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


// Esta linea se configura express.js para pocicionar el acceso a archivos estaticos
app.use(express.static(path.join(__dirname, 'src', 'Public'))); // En este caso los archivos estaticos se encuentran en la carpeta Public, tales como la carpeta css, js y algunas imagenes


//Se carga los archivos de ruta de la app
app.use('/api', tareaRoutes);

// Esta linea de codigo define la ruta especifica en el servidor node.js, cuand ose navega en la url localhost:3000/menu, se ejecuta la funcion dentro del archivo
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'Public' , 'index.html')); // En este caso se envia el archivo index.html que se encuentra en la carpeta Public
});



mongoose.connect(url, {useNewUrlParser: true}).then(() =>{
    console.log("Conexión a la BDD realizada con éxito!");
    app.listen(port, () => {
        console.log("Servidor ejecutándose en http://localhost:3000 " );
    })
})

