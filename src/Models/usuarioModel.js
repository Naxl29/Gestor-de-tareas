'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
})

// Middleware para hashear la contraseña antes de guardar
UsuarioSchema.pre('saveUsuario', async function(next) {
    // Solo hashear la contraseña si ha sido modificada o es nueva
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generar un salt
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Método para comparar la contraseña ingresada con la contraseña hasheada
UsuarioSchema.methods.compararPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('Usuario', UsuarioSchema)