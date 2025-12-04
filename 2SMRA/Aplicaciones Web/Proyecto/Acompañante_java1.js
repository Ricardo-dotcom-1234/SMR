// Variables
let titulo = document.querySelector("p#grax");
const nombreEmpresa = "SpeedLine Motors";
const mensaje = "Gracias por visitar " + nombreEmpresa;

// Array de modelos
const modelos = [
    { nombre: "Moto Deportiva", velocidad: 300, disponible: true },
    { nombre: "Coche Deportivo", velocidad: 320, disponible: true },
    { nombre: "SUV Premium", velocidad: 280, disponible: false },
    { nombre: "Moto Touring", velocidad: 250, disponible: true }
];

// Función para mostrar mensaje
function mostrarMensaje() {
    titulo.textContent = mensaje;
    console.log("Mensaje mostrado:", mensaje);
}

// Función para contar vehículos disponibles
function contarDisponibles() {
    let contador = 0;
    for (let i = 0; i < modelos.length; i++) {
        if (modelos[i].disponible) {
            contador++;
        }
    }
    return contador;
}

// Función para obtener disponibilidad por tipo
function obtenerDisponibilidad(tipo) {
    let disponible = false;
    switch(tipo.toLowerCase()) {
        case "deportiva":
        case "deportivo":
            disponible = modelos[0].disponible || modelos[1].disponible;
            break;
        case "touring":
            disponible = modelos[3].disponible;
            break;
        case "suv":
            disponible = modelos[2].disponible;
            break;
        default:
            disponible = false;
    }
    return disponible;
}

// Función para procesar el formulario
function procesarFormulario(evento) {
    evento.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const tipo = document.getElementById("tipo").value;
    const mensaje = document.getElementById("mensaje").value;
    
    // Validar con if
    if (nombre === "" || email === "") {
        alert("Por favor, completa todos los campos requeridos");
        return;
    }
    
    // Switch para procesar tipo de vehículo
    let respuesta = "";
    switch(tipo) {
        case "moto":
            respuesta = "Motos: " + modelos[0].nombre + " y " + modelos[3].nombre;
            break;
        case "coche":
            respuesta = "Coches: " + modelos[1].nombre;
            break;
        default:
            respuesta = "Selecciona un tipo de vehículo";
    }
    
    console.log("Formulario enviado:", { nombre, email, tipo, mensaje });
    alert("Solicitud recibida, " + nombre + ". " + respuesta);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    mostrarMensaje();
    
    // Agregar evento al formulario
    const formulario = document.getElementById("contactForm");
    if (formulario) {
        formulario.addEventListener("submit", procesarFormulario);
    }
    
    // Mostrar cantidad de vehículos disponibles
    const disponibles = contarDisponibles();
    console.log("Vehículos disponibles: " + disponibles + " de " + modelos.length);

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Función para cambiar menú
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('menu-collapsed');
    menu.classList.toggle('menu-expanded');
}

/* ======= Login handling (front-end simulation) ======= */
// Simple users array (for demo only). Replace or remove for production.
const usuarios = [
    { email: 'admin@speedline.com', password: 'admin123', nombre: 'Administrador' },
    { email: 'cliente@ejemplo.com', password: 'cliente123', nombre: 'Cliente' }
];

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const msg = document.getElementById('loginMessage');

    if (!email || !password) {
        if (msg) msg.textContent = 'Rellena email y contraseña.';
        return;
    }

    const user = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
        // Simulate login success
        if (msg) {
            msg.style.color = '#b6ffcc';
            msg.textContent = '¡Bienvenido, ' + user.nombre + '! Redirigiendo...';
        }
        // Store simple session flag
        try { localStorage.setItem('user', JSON.stringify({ email: user.email, nombre: user.nombre })); } catch(e){}
        setTimeout(() => { window.location.href = 'Pagina_web_1.html'; }, 900);
    } else {
        if (msg) {
            msg.style.color = '#ffbbbb';
            msg.textContent = 'Email o contraseña incorrectos.';
        }
    }
}

