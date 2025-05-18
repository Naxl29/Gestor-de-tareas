async function getTareas() { // Función para obtener las tareas
    try {
        const response = await fetch("/api/tareas");
        const data = await response.json(); // Respuesta del servidor
        console.log(data);
        const showTareas = document.getElementById("show-tareas"); // Mostrar tareas

        if (!data.tareas || data.tareas.length === 0) { // Si no hay tareas
            $("#message").text("No hay tareas para mostrar");
        } else {
            $("#message").text("");
            showTareas.innerHTML = "";

            data.tareas.forEach((tarea, index) => { // Crear cada tarea
                const id = tarea._id;
                const title = document.createElement("h5");
                const date = document.createElement("small");
                const description = document.createElement("p");
                const deleteButton = document.createElement("button");
                const showButton = document.createElement("button");
                const editButton = document.createElement("button");
                const tareaDiv = document.createElement("div");
                const divButton = document.createElement("div");

                tareaDiv.className = "card mb-3 px-2 py-2 card-tarea"; 
                divButton.className = "d-flex gap-2 mt-2";

                title.textContent = `Título: ${tarea.title}`;

                showButton.className = "btn btn-primary btn-sm";
                showButton.id = "show" + index;
                showButton.innerHTML = '<i class="bi bi-eye"></i>'; // Icono de ojo
                showButton.type = "button";
                 showButton.onclick = () => {
                    $("#content-title").text(`Título: ${tarea.title}`);
                    $("#content-description").text(`Descripción: ${tarea.description}`);
                    const fecha = new Date(tarea.date); // Convertir a objeto Date
                    $("#content-date").text(`Fecha: ${fecha.toLocaleDateString('es-ES', {  // Formato de fecha
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}`);

                    const modal = new bootstrap.Modal(document.getElementById('myModal')); // Crear modal
                    modal.show();
                };



                editButton.className = "btn btn-success btn-sm mx-2";
                editButton.id = "edit" + index;
                editButton.innerHTML = '<i class="bi bi-pencil"></i>'; // Icono de lápiz
                editButton.type = "button";
                console.log("Editando tarea:", tarea);
                console.log("ID generado:", id);
                editButton.onclick = () => {
                        window.location.href = `edit.html?id=${encodeURIComponent(tarea._id)}&title=${encodeURIComponent(tarea.title)}&description=${encodeURIComponent(tarea.description)}`;
                };

                deleteButton.className = "btn btn-danger btn-sm";
                deleteButton.id = "delete" + index;
                deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; // Icono de papelera
                deleteButton.type = "button";
                deleteButton.onclick = () => {
                    confirmDelete(id);
                };

                divButton.append(showButton, editButton, deleteButton);
                tareaDiv.append(title, date, description, divButton);
                showTareas.append(tareaDiv);
            });
        }
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        $("#message").text("Error al cargar tareas.");
    }
}

// Función que muestra los mensajes para confirmar la eliminación de una tarea
function confirmDelete(id) {
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

// Función para enviar la solicitud DELETE
async function deleteTarea(id) {
    try {
        const response = await fetch(`/api/deleteTarea/${id}`, {
            method: 'DELETE',
        });

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
            getTareas(); // Recargar lista
        } else {
            throw new Error("Error en la respuesta del servidor");
        }
    } catch (error) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'No se pudo eliminar la tarea',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
        console.error("Error al eliminar tarea:", error);
    }
}

getTareas();
