document.getElementById('btn_cerrar').addEventListener('click', () => {
    localStorage.removeItem('token'); // Eliminar el token

    Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión exitosamente',
        timer: 1500,
        showConfirmButton: false
    });

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});
