document.addEventListener('DOMContentLoaded', async () => {
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const profileForm = document.getElementById('profileForm');
    const updateBtn = document.getElementById('updateBtn');
    const fotoPerfil = document.getElementById('foto-perfil');
    const fotoModal = document.getElementById('fotoModal');
    const imgModal = document.getElementById('imgModal');
    const closeButton = document.getElementsByClassName('close-button')[0];

    const token = localStorage.getItem('token');

    async function dateUser() {
       
        try {
            const response = await fetch('/api/usuario', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                userNameInput.value = data.user.name;
                userEmailInput.value = data.user.email;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar',
                    text: data.message
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor para cargar el perfil.'
            });
        }
    }

    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = userNameInput.value.trim();
        const email = userEmailInput.value.trim();

        if (!name || !email) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacios',
                text: 'El nombre y el correo electrónico son obligatorios.'
            });
            return;
        }

        const updateData = { name, email };

        try {
            const response = await fetch('/api/usuario', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            const data = await response.json();

            if (data.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: data.message,
                   }).then(() => {
                    window.location.href = 'tareas.html'; // Redirige a la vista de tareas
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar',
                    text: data.message
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor para actualizar el perfil.'
            });
        }
    });

    fotoPerfil.addEventListener('click', () => {
        fotoModal.style.display = 'block';
        imgModal.src = fotoPerfil.src;
    });

    closeButton.addEventListener('click', () => {
        fotoModal.style.display = 'none';
    });

    fotoModal.addEventListener('click', (e) => {
        if (e.target !== imgModal) {
            fotoModal.style.display = 'none';
        }
    });

    dateUser();
});