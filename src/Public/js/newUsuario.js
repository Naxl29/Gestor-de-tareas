const { $where } = require("../Models/usuarioModel"); 

const btn = document.getElementById('btn');

$(document).ready(function(){    
    $('#alert-usuario').hide();
});

$('#btn-alert-usuario').click(function(){
    $('#alert-usuario').hide();
}); 

btnRegistro.onclick = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación de campos vacíos
    if (name === '' || email === '' || password === '') {
        $('#alert-usuario').show();
        $('#alert-usuario').html('Todos los campos son obligatorios');
        return;
    }

    // Validación formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        $('#alert-usuario').show();
        $('#alert-usuario').html('Por favor, introduce un email válido');
        return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 8) {
        $('#alert-usuario').show();
        $('#alert-usuario').html('La contraseña debe tener al menos 8 caracteres');
        return;
    }
    
    // Si pasa todas las validaciones, guardar datos en la BD
    registrarUsuario(name, email, password);
}

async function registrarUsuario(name, email, password) {
    try {
        const response = await fetch('/api/saveUsuario', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            // Mostrar mensaje de éxito
            $('#alert-usuario').removeClass('alert-danger').addClass('alert-success');
            $('#alert-usuario').html('Usuario registrado correctamente');
            $('#alert-usuario').show();
            
            // Limpiar el formulario
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            // Mostrar mensaje de error
            $('#alert-usuario').removeClass('alert-success').addClass('alert-danger');
            $('#alert-usuario').html(data.message || 'Error al registrar usuario');
            $('#alert-usuario').show();
        }
    } catch (error) {
        console.error('Error:', error);
        $('#alert-usuario').removeClass('alert-success').addClass('alert-danger');
        $('#alert-usuario').html('Error de conexión');
        $('#alert-usuario').show();
    }
}