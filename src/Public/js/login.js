// Escucha el evento 'submit' del formulario de login.
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario.

    // Obtiene el email y la contraseña del formulario.
    const email = this.email.value.trim(); // Elimina espacios en blanco al inicio y final.
    const password = this.password.value;

    // Verifica si los campos están vacíos.
    if (email === "" || password === "") {
        Swal.fire({ icon: "warning", title: "Campos vacíos", text: "Por favor, completa todos los campos." });
        return; // Detiene la ejecución si hay campos vacíos.
    }

    try {
        // Realiza una petición POST al endpoint de login.
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json", "accept": "application/json" },
            body: JSON.stringify({ email, password }), // Envía email y contraseña en formato JSON.
        });

        const data = await response.json(); // Convierte la respuesta a JSON.

        // Si la respuesta es exitosa (status 200 y data.status 'success')...
        if (response.status === 200 && data.status === "success") {
            localStorage.setItem('token', data.token); // Guarda el token en el almacenamiento local.
            Swal.fire({
                icon: "success", title: "¡Bienvenido!", text: data.message, timer: 1500, showConfirmButton: false,
            });
            // Redirige a la página de tareas después de 1.5 segundos.
            setTimeout(() => { window.location.href = "tareas.html"; }, 1500);
        } else {
            // Si la autenticación falla, muestra un mensaje de error.
            Swal.fire({ icon: "error", title: "Error", text: data.message || "No se pudo iniciar sesión." });
        }

    } catch (error) {
        // Si ocurre un error de conexión, muestra un mensaje de error.
        console.error("Error:", error);
        Swal.fire({ icon: "error", title: "Error de conexión", text: "No se pudo conectar con el servidor." });
    }
});