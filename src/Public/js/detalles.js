const fotoClickable = document.querySelector('.foto-clickable');
const modal = document.getElementById('fotoModal');
const modalImg = document.getElementById('imgModal');
const closeButton = document.querySelector('.close-button');

const nombreDesktop = document.getElementById('nombre-desktop');
const nombreInput = document.getElementById('nombre-input');
const editarNombreBtn = document.getElementById('editar-nombre-btn');
const guardarNombreBtn = document.getElementById('guardar-nombre-btn');

// Habilidades
const habilidad1 = document.getElementById('habilidad-1');
const habilidad1Input = document.getElementById('habilidad-1-input');
const editarHabilidad1Btn = document.getElementById('editar-habilidad-1-btn');
const guardarHabilidad1Btn = document.getElementById('guardar-habilidad-1-btn');

const habilidad2 = document.getElementById('habilidad-2');
const habilidad2Input = document.getElementById('habilidad-2-input');
const editarHabilidad2Btn = document.getElementById('editar-habilidad-2-btn');
const guardarHabilidad2Btn = document.getElementById('guardar-habilidad-2-btn');

const habilidad3 = document.getElementById('habilidad-3');
const habilidad3Input = document.getElementById('habilidad-3-input');
const editarHabilidad3Btn = document.getElementById('editar-habilidad-3-btn');
const guardarHabilidad3Btn = document.getElementById('guardar-habilidad-3-btn');

if (fotoClickable) {
    fotoClickable.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.src;
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
setupEditarGuardar(editarHabilidad1Btn, guardarHabilidad1Btn, habilidad1, habilidad1Input);
setupEditarGuardar(editarHabilidad2Btn, guardarHabilidad2Btn, habilidad2, habilidad2Input);
setupEditarGuardar(editarHabilidad3Btn, guardarHabilidad3Btn, habilidad3, habilidad3Input);
