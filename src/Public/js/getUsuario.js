// Importa '$where' de usuarioModel (no usado directamente aquí).
const { $where } = require("../Models/usuarioModel");

// Obtiene el botón por ID (no usado directamente aquí).
const btn = document.getElementById('btn');

// Al cargar el documento, oculta la alerta de usuario.
$(document).ready(function(){
    $('#alert-usuario').hide();
});

// Al hacer clic en el botón de cerrar alerta, la oculta.
$('#btn-alert-usuario').click(function(){
    $('#alert-usuario').hide();
});

// Al hacer clic en el botón de registro...
btnRegistro.onclick = () => {
    // Obtiene los valores de los campos.
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Valida campos vacíos.
    if (name === '' || email === '' || password === '') {
        $('#alert-usuario').show().html('Todos los campos son obligatorios');
        return;
    }

    // Valida formato de email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        $('#alert-usuario').show().html('Por favor, introduce un email válido');
        return;
    }

    // Valida longitud mínima de contraseña.
    if (password.length < 8) {
        $('#alert-usuario').show().html('La contraseña debe tener al menos 8 caracteres');
        return;
    }

    // Si todo es válido, registra al usuario.
    registrarUsuario(name, email, password);
}

// Registra al usuario enviando datos al servidor.
async function registrarUsuario(name, email, password) {
    try {
        const response = await fetch('/api/saveUsuario', {
            method: 'POST',
            headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();

        if (data.status === 'success') {
            $('#alert-usuario').removeClass('alert-danger').addClass('alert-success').html('Usuario registrado correctamente').show();
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            // Obtiene y muestra info del usuario registrado.
            if (data.usuario && data.usuario.id) {
                getUsuario(data.usuario.id)
                    .then(usuario => console.log('Usuario obtenido:', usuario))
                    .catch(error => console.error('Error al obtener usuario:', error));
            }

            // Redirige a login tras 2 segundos.
            setTimeout(() => { window.location.href = '/login'; }, 2000);
        } else {
            $('#alert-usuario').removeClass('alert-success').addClass('alert-danger').html(data.message || 'Error al registrar usuario').show();
        }
    } catch (error) {
        console.error('Error:', error);
        $('#alert-usuario').removeClass('alert-success').addClass('alert-danger').html('Error de conexión').show();
    }
}

// Obtiene la información de un usuario por su ID.
async function getUsuario(id) {
    try {
        const response = await fetch(`/api/getUsuario/${id}`, {
            method: 'GET',
            headers: { 'accept': 'application/json' }
        });
        const data = await response.json();
        return data.status === 'success' ? data.usuario : Promise.reject(data.message || 'Error al obtener usuario');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
} 