// Extraer parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const titleValue = urlParams.get("title");
const descriptionValue = urlParams.get("description");

// Referencias a los elementos del DOM
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const updateButton = document.getElementById("btnEdit");

// Verificar si el ID de tarea está 
if (!id) {
    Swal.fire({
        icon: "error",
        title: "ID de tarea no encontrado",
        text: "Regresa a la lista y vuelve a intentar.",
    });
    throw new Error("ID de tarea no encontrado en la URL");
}

// se hace un preRelleno con los campos con los valores de la URL
titleInput.value = titleValue || "";
descriptionInput.value = descriptionValue || "";

// Función para actualizar la tarea
async function updateData(id, title, description) {
    try {
        console.log("/api/updateTarea/" + id);
        const response = await fetch("/api/updateTarea/" + id,  {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la tarea");
        }

        const data = await response.json();

        // Éxito al actualizar tareas
        Swal.fire({
            icon: "success",
            title: "Tarea actualizada correctamente",
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            window.location.href = "tareas.html";
        });

    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Error en la conexión con el servidor",
            text: error.message,
        });
    }
}

// Evento del botón ACTUALIZAR
updateButton.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el formulario se recargue

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
        // Alerta si hay campos vacíos
        Swal.fire({
            icon: "error",
            title: "¡ATENCIÓN!",
            text: "No puedes dejar espacios en blanco.",
        });
        return;
    }

    // Ejecutar la actualización
    updateData(id, title, description);
});
