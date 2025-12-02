let titulo = document.querySelector("p#grax");
titulo.textContent = "Gracias por visitar SpeedLine Motors";

function toggleMenu() {
    const menu = document.getElementById('menuList');
    menu.classList.toggle('menu-collapsed');
    menu.classList.toggle('menu-expanded');
}

