const btn = document.getElementById('btnRegistro');

btn.onclick = () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Validación de campos vacíos
    if (name === '' || email === '' || password === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Todos los campos son obligatorios'
        });
        return;
    }

    // Validación formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'warning',
            title: 'Email inválido',
            text: 'Por favor, introduce un email válido'
        });
        return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 8) {
        Swal.fire({
            icon: 'warning',
            title: 'Contraseña corta',
            text: 'La contraseña debe tener al menos 8 caracteres'
        });
        return;
    }

    // Si pasa todas las validaciones del frontend, intentar registrar el usuario
    registrarUsuario(name, email, password);
};

async function registrarUsuario(name, email, password) {
    try {
        const response = await fetch('/api/saveUsuario',{
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Usuario registrado correctamente',
                showConfirmButton: false,
                timer: 2000
            });

            // Limpiar formulario
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            setTimeout(() => {
                window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
            }, 2000);

        } else if (data.message === 'El correo electrónico ya está registrado.') { // Si el mensaje es identico al mensaje de backend se activa el else if
            // Mostrar mensaje de usuario existente
            Swal.fire({
                icon: 'error',
                title: 'Usuario existente',
                text: 'Ya hay una cuenta registrada con ese correo electrónico. Por favor, utiliza uno diferente o inicia sesión.'
            });

        } else {
            // Mostrar otros errores del servidor
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message || 'Error al registrar usuario'
            });
        }

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor'
        });
    }
}
