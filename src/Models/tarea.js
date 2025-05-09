'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TareaSchema = new Schema({
    title: String,
    date: {type: Date, default: Date.now},
    description: String
})

module.exports = mongoose.model('Tarea', TareaSchema)