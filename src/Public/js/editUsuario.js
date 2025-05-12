const update = document.getElementById("update");

//obtenemos los parametros enviados por la url
const values = window.location.search;
const urlParams = new URLSearchParams(values);

//accedemos a los valores
const id = urlParams.get("id");
const nameParam = urlParams.get("name");
const emailParam = urlParams.get("email");
const passwordParam = urlParams.get("password");

//obtenemos los elementos del formulario
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

//asignamos los valores
nameInput.value = nameParam;
emailInput.value = emailParam;
passwordInput.value = passwordParam;

//ocultamos la alerta
$(document).ready(function () {
    $("#alert-edit").hide();
});

$("#btn-alert-edit").click(function () {
    $("#alert-edit").hide();
});

//funcion para actualizar el usuario
update.onclick = () => {
    const nameValue = nameInput.value;
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    if (nameValue === "" || emailValue === "" || passwordValue === "") {
        $("#alert-edit").show();
    } else {
        updateData(id, nameValue, emailValue, passwordValue);
        window.location.href = "/";
    }
};

//funcion para enviar los datos actulizados al servidor
async function updateData(id, name, email, password) {
    const response = await fetch("/api/usuarios/" + id,{
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    const data = await response.json();
    console.log(data);

} 
