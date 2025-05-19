document.getElementById('btn_cerrar').addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el evento predeterminado se dispare, importante para enlaces

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres cerrar sesión?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
      
        if (result.isConfirmed) {
            localStorage.removeItem('token'); // Eliminar el token

            Swal.fire({
                icon: 'success',
                title: 'Sesión cerrada',
                text: 'Has cerrado sesión exitosamente',
                timer: 1500,
                showConfirmButton: false
            });

            // Redirigir después de que SweetAlert2 termine de mostrar el mensaje de éxito
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Si el usuario hace clic en "Cancelar" o fuera de la alerta, no hacemos nada
            console.log("Cierre de sesión cancelado.");
        }
    });
});