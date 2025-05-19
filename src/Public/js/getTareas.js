async function getTareas() { // Función para obtener las tareas
    try {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage

        // Verificar si hay un token antes de hacer la solicitud
        if (!token) {
            console.warn("No hay token de autenticación. Redirigiendo a login.");
            $("#message").text("Por favor, inicia sesión para ver las tareas.");
            return; // Detener la ejecución si no hay token
        }

        const response = await fetch("/api/tareas", {
            method: "GET", // Aunque GET es el método por defecto, es buena práctica especificarlo
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // se añade el token al encabezado
            },
        });

        const data = await response.json(); // Respuesta del servidor
        console.log(data);
        const showTareas = document.getElementById("show-tareas"); // Mostrar tareas
        showTareas.innerHTML = "";
        const mensaje = document.createElement("p");
        mensaje.id = "message";
        mensaje.className = "empty-message";
        showTareas.appendChild(mensaje);

        if (!data.tareas || data.tareas.length === 0) { // Si no hay tareas
            $("#message").text("No tienes tareas para mostrar.");
        } else {
            $("#message").text("");

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
                // Estilos aplicados directamente en JavaScript para mejor control
                showButton.style.width = '30px';
                showButton.style.height = '30px';
                showButton.style.padding = '0';
                showButton.onclick = () => {
                    $("#content-title").text(`Título: ${tarea.title}`);
                    $("#content-description").text(`Descripción: ${tarea.description}`);
                    const fecha = new Date(tarea.date); // Convertir a objeto Date
                    $("#content-date").text(`Fecha: ${fecha.toLocaleDateString('es-ES', {  // Formato de fecha
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}`);

                    const modal = new bootstrap.Modal(document.getElementById('myModal')); // Crear modal
                    modal.show();
                };

                // botón de editar
                editButton.className = "btn btn-success btn-sm mx-2";
                editButton.id = "edit" + index;
                editButton.innerHTML = '<i class="bi bi-pencil"></i>'; // Icono de lápiz
                editButton.type = "button";
                editButton.style.width = '30px';
                editButton.style.height = '30px';
                editButton.style.padding = '0';
                editButton.onclick = () => {
                    window.location.href = `edit.html?id=${encodeURIComponent(tarea._id)}&title=${encodeURIComponent(tarea.title)}&description=${encodeURIComponent(tarea.description)}`;
                };

                // Botón de eliminar
                deleteButton.className = "btn btn-danger btn-sm";
                deleteButton.id = "delete" + index;
                deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; // Icono de papelera
                deleteButton.type = "button";
                deleteButton.style.width = '30px';
                deleteButton.style.height = '30px';
                deleteButton.style.padding = '0';
                deleteButton.onclick = () => {
                    confirmDelete(id);
                };

                // Asignar valores a los elementos
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
        const token = localStorage.getItem('token'); // Obtener el token

        if (!token) {
            console.warn("No hay token para eliminar. Redirigiendo a login.");
            Swal.fire({
                icon: "error",
                title: "Sesión requerida",
                text: "Por favor, inicia sesión para eliminar tareas.",
            }).then(() => {
                window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
            });
            return;
        }

        const response = await fetch(`/api/deleteTarea/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // se añade el token al encabezado
            },
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
            throw new Error("Error en la respuesta del servidor.");
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