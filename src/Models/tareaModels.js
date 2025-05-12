'use strict' 
// Activa el modo estricto de JavaScript para evitar errores comunes y mejorar la seguridad del código.

const mongoose = require('mongoose');
// Importa la librería mongoose para interactuar con bases de datos MongoDB.

var Schema = mongoose.Schema;
// Crea una referencia al constructor Schema de mongoose para definir esquemas de datos.

var TareaSchema = new Schema({
    title: String, 
    // Define un campo 'title' de tipo String para almacenar el título de la tarea.
    
    date: {type: Date, default: Date.now}, 
    // Define un campo 'date' de tipo Date con un valor por defecto de la fecha y hora actual.
    
    description: String 
    // Define un campo 'description' de tipo String para almacenar la descripción de la tarea.
})

// Exporta el modelo 'Tarea' basado en el esquema 'TareaSchema'.
// Esto permite que el modelo sea utilizado en otras partes de la aplicación.
module.exports = mongoose.model('Tarea', TareaSchema)