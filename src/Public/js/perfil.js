document.addEventListener('DOMContentLoaded', async () => {
    // Obtiene elementos del DOM.
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const profileForm = document.getElementById('profileForm');
    const updateBtn = document.getElementById('updateBtn');
    const fotoPerfil = document.getElementById('foto-perfil');
    const fotoModal = document.getElementById('fotoModal');
    const imgModal = document.getElementById('imgModal');
    const closeButton = document.getElementsByClassName('close-button')[0];

    // Obtiene el token del almacenamiento local.
    const token = localStorage.getItem('token');

    // Función asíncrona para obtener datos del usuario.
    async function dateUser() {
        try {
            // Realiza una petición GET a la API para obtener datos del usuario.
            const response = await fetch('/api/usuario', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` } // Incluye el token en la autorización.
            });
            const data = await response.json(); // Convierte la respuesta a JSON.

            // Si la respuesta es exitosa, llena los campos del formulario.
            if (data.status === 'success') {
                userNameInput.value = data.user.name;
                userEmailInput.value = data.user.email;
            } else {
                // Si hay un error, muestra una alerta.
                Swal.fire({ icon: 'error', title: 'Error al cargar', text: data.message });
            }
        } catch (error) {
            // Si hay un error de conexión, muestra una alerta.
            Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'No se pudo conectar con el servidor para cargar el perfil.' });
        }
    }

    // Escucha el evento 'submit' del formulario de perfil.
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita la recarga de la página.

        // Obtiene el nombre y el email del formulario.
        const name = userNameInput.value.trim();
        const email = userEmailInput.value.trim();

        // Valida que los campos no estén vacíos.
        if (!name || !email) {
            Swal.fire({ icon: 'warning', title: 'Campos vacios', text: 'El nombre y el correo electrónico son obligatorios.' });
            return;
        }

        const updateData = { name, email }; // Crea un objeto con los datos a actualizar.

        try {
            // Realiza una petición PUT a la API para actualizar el usuario.
            const response = await fetch('/api/usuario', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(updateData) // Envía los datos en formato JSON.
            });
            const data = await response.json(); // Convierte la respuesta a JSON.

            // Si la actualización es exitosa, muestra una alerta y redirige.
            if (data.status === 'success') {
                Swal.fire({ icon: 'success', title: '¡Éxito!', text: data.message }).then(() => {
                    window.location.href = 'tareas.html'; // Redirige a la vista de tareas
                });
            } else {
                // Si hay un error, muestra una alerta.
                Swal.fire({ icon: 'error', title: 'Error al actualizar', text: data.message });
            }
        } catch (error) {
            // Si hay un error de conexión, muestra una alerta.
            Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'No se pudo conectar con el servidor para actualizar el perfil.' });
        }
    });

    // Al hacer clic en la foto de perfil, muestra el modal.
    fotoPerfil.addEventListener('click', () => {
        fotoModal.style.display = 'block';
        imgModal.src = fotoPerfil.src; // Establece la fuente de la imagen en el modal.
    });

    // Al hacer clic en el botón de cerrar del modal, lo oculta.
    closeButton.addEventListener('click', () => {
        fotoModal.style.display = 'none';
    });

    // Al hacer clic fuera de la imagen en el modal, lo oculta.
    fotoModal.addEventListener('click', (e) => {
        if (e.target !== imgModal) {
            fotoModal.style.display = 'none';
        }
    });

    // Llama a la función para cargar los datos del usuario al cargar la página.
    dateUser();
});