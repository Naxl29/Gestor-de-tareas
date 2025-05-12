async function getTareas() {
    const response = await fetch("/api/tareas");
    const data = await response.json();
    console.log(data);
    const showTareas = document.getElementById("show-tareas");

    if(data.notes.length == 0) {
        $("#message").text("No hay tareas para mostrar");

    } else {
        $("#message").text("");
        for (let i = 0; i < data.notes.length; i++) {

            const id = data.notes[i]._id;
            const title = document.createElement("h5");
            const date = document.createElement("small");
            const description = document.createElement("p");
            const deleteButton = document.createElement("button");
            const showbutton = document.createElement("button");
            const editButton = document.createElement("button");
            const note = document.createElement("div");
            const divbutton = document.createElement("div");
            const formbutton = document.createElement("form");

            note.className = "card mb-3 px-2 py-2 card-note";
            divbutton.className = "d-flex flex-row-mt-2";

            title.textContent = data.notes[i].title;

            date.textContent = data.notes[i].date.substring(8, 10) + data.notes[i].date.substring(4, 8) + data.notes[i].date.substring(0, 4);
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

            description.textContent = data.notes[i].description;

            //añadir los elementos al DOM
            note.append(title);
            note.append(date);
            note.append(showbutton);
            note.append(editButton);
            note.append(deleteButton);
            note.append(formbutton);

            note.append(divbutton);
            showTareas.append(note);

            //boton mostrar modal
            showbutton.onclick = () => {

                $("#myModal").modal("show");
                $("#modal-title").text(data.notes[i].title);
                $("#content-body").html(description);

        }

        //boton de eliminar
        deleteButton.onclick = () => {
          console.log(id);
          deleNote(id);
                
        }

        //boton de editar
        editButton.onclick = () => {
            const title = data.notes[i].title;
            const description = data.notes[i].description;
            window.location.href = "edit.html?id=" + id + "&title=" + title + "&description=" + description;
        }
    }

}  

// funcion para eliminar la tarea
async function deleNote(id) {
   await fetch("/api/delete/" + id, {
        method: "DELETE",
   }).then(res => res.text()).then(res => console.log(res));
 
}

getTareas();
}
