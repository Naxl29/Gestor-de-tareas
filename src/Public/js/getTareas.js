async function getTareas() {
    const response = await fetch("/api/tareas");
    const data = await response.json();
    console.log(data);
    const showTareas = document.getElementById("show-tareas");

    if(data.tareas.length == 0) {
        $("#message").text("No hay tareas para mostrar");

    } else {
        $("#message").text("");
        for (let i = 0; i < data.tareas.length; i++) {

            const id = data.tareas[i]._id;
            const title = document.createElement("h5");
            const date = document.createElement("small");
            const description = document.createElement("p");
            const deleteButton = document.createElement("button");
            const showbutton = document.createElement("button");
            const editButton = document.createElement("button");
            const tarea = document.createElement("div");
            const divbutton = document.createElement("div");
            const formbutton = document.createElement("form");

            tarea.className = "card mb-3 px-2 py-2 card-tarea";
            divbutton.className = "d-flex flex-row-mt-2";

            title.textContent = data.tareas[i].title;

            date.textContent = data.tareas[i].date.substring(8, 10) + data.tareas[i].date.substring(4, 8) + data.tareas[i].date.substring(0, 4);
            date.className = "date";

            //caracteristicas de los botones del DOM
            showbutton.className = "btn btn-primary btn-sm";
            showbutton.id = "show + i";
            showbutton.textContent = "Mostrar";
            showbutton.type = "button";

            editButton.className = "btn btn-succes btn-sm mx-3";
            editButton.id = "edit + i";
            editButton.textContent = "Editar";
            editButton.type = "button";

            deleteButton.className = "btn btn-danger btn-sm";
            deleteButton.id = "delete + i";
            deleteButton.textContent = "Eliminar";
            deleteButton.type = "button";

            description.textContent = data.tareas[i].description;

            //añadir los elementos al DOM
            tarea.append(title);
            tarea.append(date);
            tarea.append(showbutton);
            tarea.append(editButton);
            tarea.append(deleteButton);
            tarea.append(formbutton);

            tarea.append(divbutton);
            showTareas.append(tarea);

            //boton mostrar modal
            showbutton.onclick = () => {

                $("#myModal").modal("show");
                $("#modal-title").text(data.tareas[i].title);
                $("#content-body").html(description);

        }

        //boton de eliminar
        deleteButton.onclick = () => {
          console.log(id);
          deletarea(id);
                
        }

        //boton de editar
        editButton.onclick = () => {
            const title = data.tareas[i].title;
            const description = data.tareas[i].description;
            window.location.href = "edit.html?id=" + id + "&title=" + title + "&description=" + description;
        }
    }

}  

// funcion para eliminar la tarea
async function deletarea(id) {
   await fetch("/api/delete/" + id, {
        method: "DELETE",
   }).then(res => res.text()).then(res => console.log(res));
 
}

getTareas();
}
