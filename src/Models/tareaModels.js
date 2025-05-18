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
    
    description: String,
    // Define un campo 'description' de tipo String para almacenar la descripción de la tarea.

    
    userId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true } // se define un campo 'userId' de tipo ObjectId que referencia al modelo 'Usuario'.
})

// Exporta el modelo 'Tarea' basado en el esquema 'TareaSchema'.
module.exports = mongoose.model('Tarea', TareaSchema)