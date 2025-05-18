// Espera a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn');

    // Evita que el formulario se envíe
    btn.addEventListener('click', function (e) {
        e.preventDefault(); // Evita recargar la página

        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();

        if (title === '' || description === '') { // Verifica si los campos están vacíos
            Swal.fire({ // Muestra un mensaje de advertencia
                icon: 'warning',
                title: 'Campos obligatorios',
                text: 'Debes llenar todos los campos antes de guardar.'
            });
        } else {
            postData(title, description);
        }
    });

    // Función para enviar la solicitud POST
    async function postData(title, description) {
        try {
            const response = await fetch('/api/saveTarea', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });

            const data = await response.json(); // Convierte la respuesta a JSON
            console.log('Respuesta:', data);

            if (data.status === 'success') { // Verifica si la tarea se guardó correctamente
                Swal.fire({ // Muestra un mensaje de éxito
                    icon: 'success',
                    title: '¡Tarea guardada!',
                    text: 'La tarea se agregó correctamente.',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = 'tareas.html'; // Redirige a la página de tareas
                });
            } else {
                Swal.fire({ // Muestra un mensaje de error
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Ocurrió un error al guardar la tarea.'
                });
            }
        } catch (error) {
            console.error('Error al guardar la tarea:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'No se pudo conectar con el servidor.'
            });
        }
    }
});
