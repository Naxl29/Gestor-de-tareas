// Función que muestra los mensajes para confirmar la eliminación de una tarea
function comfirmDelete(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la tarea',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteTarea(id);
        }
    });
}

// Función para enviar la solicitud DELETE al codigo 
async function deleteTarea(id) {

    const response = await fetch(`/api/delete/${id}`, {
        method: 'DELETE',
    });

    // Se muestra mensaje de exito al eliminar la tarea
    if (response.ok) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Tarea eliminada correctamente',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });

        // Actualizar lista de tareas 
        if (typeof getTareas === 'function') {
            getTareas();
        }
    } else {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'No se pudo eliminar la tarea',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
    }
}

