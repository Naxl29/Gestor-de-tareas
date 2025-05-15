const btn = document.getElementById('btn');

$(document).ready(function(){    
    $('#alert').hide();
});

$('#btn-alert').click(function(){
    $('#alert').hide();
}); 

btn.onclick = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title.length === 0 || description.length === 0) {
        $('#alert').show();
    } else {
        postData(title, description);
    }
}

async function postData(title, description) {
    try {
        const response = await fetch('/api/saveTarea', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'success') {
            window.location.href = '/'; // o redirige a la lista de tareas
        }

    } catch (error) {
        console.error('Error al guardar la tarea:', error);
        $('#alert').show();
    }
}