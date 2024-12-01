const usuarios = [
    { username: "admin", password: "12345" },
    { username: "coordinador", password: "12345" },
    { username: "panolero", password: "12345" },
    { username: "docente", password: "12345" },
    { username: "alumno", password: "12345" },
];

// Manejo del formulario
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Verificación de las credenciales
    const usuarioValido = usuarios.find(user => user.username === username && user.password === password);

    if (usuarioValido.username == 'admin') {
        errorMessage.textContent = "";
        alert("Inicio de sesión exitoso. ¡Bienvenido admin! Usuario Administrador");
        window.location.href = 'inventarioAdmin.html';
    } 
    if (usuarioValido.username == 'coordinador') {
        errorMessage.textContent = "";
        alert("Inicio de sesión exitoso. ¡Bienvenido coordinador! Usuario Coordinador");
        window.location.href = 'perfilesCoordinador.html';
    }
    if (usuarioValido.username == 'panolero') {
        errorMessage.textContent = "";
        alert("Inicio de sesión exitoso. ¡Bienvenido panolero! Usuario Panolero");
        window.location.href = 'inventarioPanolero.html';
    }
    if (usuarioValido.username == 'docente') {
        errorMessage.textContent = "";
        alert("Inicio de sesión exitoso. ¡Bienvenido docente! Usuario Docente");
        window.location.href = 'inventario.html';
    }
    if (usuarioValido.username == 'alumno') {
        errorMessage.textContent = "";
        alert("Inicio de sesión exitoso. ¡Bienvenido alumno! Usuario Alumno");
        window.location.href = 'inventario.html';
    }
    else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
});