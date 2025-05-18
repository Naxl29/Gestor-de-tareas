const fotoClickable = document.querySelector('.foto-clickable');
const modal = document.getElementById('fotoModal');
const modalImg = document.getElementById('imgModal');
const closeButton = document.querySelector('.close-button');

const nombreDesktop = document.getElementById('nombre-desktop');
const nombreInput = document.getElementById('nombre-input');
const editarNombreBtn = document.getElementById('editar-nombre-btn');
const guardarNombreBtn = document.getElementById('guardar-nombre-btn');

if (fotoClickable) {
    fotoClickable.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = fotoClickable.src;
    });
}

if (closeButton) {
    closeButton.addEventListener('click', function () {
        modal.style.display = "none";
    });
}

window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

function setupEditarGuardar(editarBtn, guardarBtn, textoSpan, inputBox) {
    editarBtn.addEventListener('click', () => {
        textoSpan.style.display = 'none';
        editarBtn.style.display = 'none';
        inputBox.style.display = 'inline-block';
        guardarBtn.style.display = 'inline-block';
    });

    guardarBtn.addEventListener('click', () => {
        textoSpan.textContent = inputBox.value;
        textoSpan.style.display = 'inline-block';
        editarBtn.style.display = 'inline-block';
        inputBox.style.display = 'none';
        guardarBtn.style.display = 'none';
    });
}

// Aplicar función a los campos
setupEditarGuardar(editarNombreBtn, guardarNombreBtn, nombreDesktop, nombreInput);