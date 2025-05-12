const update = document.getElementById("update");
//obtenemos los parametros enviados por la url
const values = window.location.search;
// creamos las instancia
const urlParams = new URLSearchParams(values);
//accedemos a los valores
var id = urlParams.get("id");
var titleParam = urlParams.get("title");
var descriptionParam = urlParams.get("descripcion");

const title = document.getElementById("title");
const description = document.getElementById("description");

//asignamos los valores 
title.value = titleParam;
description.textContent = descriptionParam;

$(document).ready(function () {
    $("#alert-edit").hide();
});

$("#btn-alert-edit").click(function () {
    $("#alert-edit").hide();
});

update.onclick = () => {
    const titleValue = title.value;
    const descriptionValue = description.value;

    if (titleValue === "" || descriptionValue === "") {
        $("#alert-edit").show();
    }else {
        updateData(id, titleValue, descriptionValue);
        window.location.href = "/";
    }
}   
//funcion para actualizar la tarea
async function updateData(id, title, description) {
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
    console.log (data);
}