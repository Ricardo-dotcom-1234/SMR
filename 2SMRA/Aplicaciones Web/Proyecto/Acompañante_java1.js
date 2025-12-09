// ========================================
// PROYECTO: SpeedLine Motors
// ========================================

// ===== GUARDAR EN VARIABLES =====
let titulo = document.querySelector("p#grax");
const nombreEmpresa = "SpeedLine Motors";
const mensaje = "Gracias por visitar " + nombreEmpresa;

// ===== ARRAYS =====
const usuarios = [
    { email: 'admin@speedline.com', password: 'admin123', nombre: 'Administrador' },
    { email: 'cliente@ejemplo.com', password: 'cliente123', nombre: 'Cliente' }
];

// ===== FUNCIONES =====

// FUNCIÓN: Login con IF y búsqueda en array
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const msg = document.getElementById('loginMessage');

    // IF: Validar campos vacíos
    if (!email || !password) {
        if (msg) msg.textContent = 'Rellena email y contraseña.';
        return;
    }

    // IF: Buscar usuario en array
    const user = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (user) {
        if (msg) {
            msg.style.color = '#b6ffcc';
            msg.textContent = '¡Bienvenido, ' + user.nombre + '!';
        }
        try {
            localStorage.setItem('user', JSON.stringify({ email: user.email, nombre: user.nombre }));
        } catch(e){}
        setTimeout(() => { window.location.href = 'Pagina_web_1.html'; }, 900);
    } else {
        if (msg) {
            msg.style.color = '#ffbbbb';
            msg.textContent = 'Email o contraseña incorrectos.';
        }
    }
}

// ===== EJECUTAR AL CARGAR =====
document.addEventListener("DOMContentLoaded", function() {
    // Ejecutar funciones
    mostrarMensaje();
    mostrarVelocidades();
    
    // Mostrar cantidad de vehículos
    const cantidad = contarVehiculos();
    console.log("Total de vehículos: " + cantidad);
    
    // Probar obtenerVelocidad
    console.log("Velocidad deportiva: " + obtenerVelocidad("deportiva") + " km/h");

    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// ===== EJECUTAR AL CARGAR =====
document.addEventListener("DOMContentLoaded", function() {
    // Mostrar mensaje de bienvenida
    const titulo = document.querySelector("p#mensaje");
    if (titulo) {
        titulo.textContent = mensaje;
    }

    // Configurar login si existe el formulario
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});