const { $where } = require("../Models/tareaModel"); 

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


    if (title.length == '' || description.length == '') {
         $('#alert').show();

    } else {

        //guaradar datos en la bdd
        postData(title, description);

    }
}

async function postData(title, description) {
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
    console.data(data);
}