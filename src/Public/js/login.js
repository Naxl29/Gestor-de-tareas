document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value;

    if (email === "" || password === "") {
        Swal.fire({
            icon: "warning",
            title: "Campos vacíos",
            text: "Por favor, completa todos los campos.",
        });
        return;
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200 && data.status === "success") {
            Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: data.message,
                timer: 1500,
                showConfirmButton: false,
            });

            // Redirigir después del éxito
            setTimeout(() => {
                window.location.href = "tareas.html";
            }, 1500);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message || "No se pudo iniciar sesión.",
            });
        }

    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo conectar con el servidor.",
        });
    }
});