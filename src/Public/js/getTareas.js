async function getTareas() {
    try {
        const response = await fetch("/api/tareas");
        const data = await response.json();
        console.log(data);
        const showTareas = document.getElementById("show-tareas");

        if (data.tareas.length == 0) {
            $("#message").text("No hay tareas para mostrar");
        } else {
            $("#message").text("");
            showTareas.innerHTML = "";
            data.tareas.forEach((tarea, index) => {
                const id = tarea._id;
                const title = document.createElement("h5");
                const date = document.createElement("small");
                const description = document.createElement("p");
                const deleteButton = document.createElement("button");
                const showbutton = document.createElement("button");
                const editButton = document.createElement("button");
                const tareaDiv = document.createElement("div");
                const divbutton = document.createElement("div");

                tareaDiv.className = "card mb-3 px-2 py-2 card-tarea";
                divbutton.className = "d-flex flex-row-mt-2";

                title.textContent = tarea.title;
                date.textContent = new Date(tarea.date).toLocaleDateString();
                date.className = "date";

                showbutton.className = "btn btn-primary btn-sm";
                showbutton.id = "show" + index;
                showbutton.textContent = "Mostrar";
                showbutton.type = "button";
                showbutton.onclick = () => {
                    $("#myModal").modal("show");
                    $("#modal-title").text(tarea.title);
                    $("#content-body").html(description);
                }

                editButton.className = "btn btn-success btn-sm mx-3";
                editButton.id = "edit" + index;
                editButton.textContent = "Editar";
                editButton.type = "button";
                editButton.onclick = () => {
                    window.location.href = "edit.html?id=" + id + "&title=" + tarea.title + "&description=" + tarea.description;
                }

                deleteButton.className = "btn btn-danger btn-sm";
                deleteButton.id = "delete" + index;
                deleteButton.textContent = "Eliminar";
                deleteButton.type = "button";
                deleteButton.onclick = () => {
                    deleteTarea(id);
                }

                description.textContent = tarea.description;

                tareaDiv.append(title);
                tareaDiv.append(date);
                tareaDiv.append(showbutton);
                tareaDiv.append(editButton);
                tareaDiv.append(deleteButton);
                showTareas.append(tareaDiv);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

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

getTareas();