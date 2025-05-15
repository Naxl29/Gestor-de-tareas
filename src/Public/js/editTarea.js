const update = document.getElementById("update");
// Obtenemos los parámetros enviados por la URL
const values = window.location.search;
// Creamos la instancia
const urlParams = new URLSearchParams(values);

// Asignamos los valores directamente
document.getElementById("title").value = urlParams.get("title");
document.getElementById("description").value = urlParams.get("descripcion");

$(document).ready(function () {
    $("#alert-edit").hide();
});

$("#btn-alert-edit").click(function () {
    $("#alert-edit").hide();
});

update.onclick = () => {
    const titleValue = document.getElementById("title").value;
    const descriptionValue = document.getElementById("description").value;

    if (titleValue === "" || descriptionValue === "") {
        $("#alert-edit").show();
    } else {
        updateData(urlParams.get("id"), titleValue, descriptionValue);
    }
}

// Función para actualizar la tarea
async function updateData(id, title, description) {
    try {
        const response = await fetch("/api/tareas/" + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            window.location.href = "/"; // Redirige solo si la respuesta es exitosa
        } else {
            $("#alert-edit").show();
            $("#title-alert").text("Hubo un error al actualizar la tarea.");
        }
    } catch (error) {
        $("#alert-edit").show();
        $("#title-alert").text("Error en la conexión con el servidor.");
        console.error("Error:", error);
    }
}