// --- CONTROL DEL BUSCADOR ---
function abrirBuscador() {
    document.getElementById('search-modal').style.display = 'flex';
    document.getElementById('input-busqueda').focus();
}

function cerrarBuscador() {
    document.getElementById('search-modal').style.display = 'none';
}

// --- LÓGICA DE FILTRADO ---
function filtrarProductos() {
    let input = document.getElementById('input-busqueda').value.toLowerCase();
    let productos = document.querySelectorAll('.tarjeta-producto');

    productos.forEach(producto => {
        let nombre = producto.getAttribute('data-nombre').toLowerCase();
        if (nombre.includes(input)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

function filtrarPorCategoria(categoria) {
    let productos = document.querySelectorAll('.tarjeta-producto');
    productos.forEach(producto => {
        if (producto.getAttribute('data-categoria') === categoria) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
    document.querySelector('.seccion-productos').scrollIntoView({ behavior: 'smooth' });
}

// --- MOVER EL CARRUSEL CON LAS FLECHAS ---
function moverCarrusel(direccion) {
    const carrusel = document.getElementById('carrusel-productos');
    // Mueve el carrusel 260 píxeles (el ancho de una tarjeta aprox)
    const scrollAmount = 260 * direccion;
    carrusel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// Cerrar buscador con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        cerrarBuscador();
    }
});
