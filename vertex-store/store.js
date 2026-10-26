// --- CONTROL DEL BUSCADOR ---
function abrirBuscador() {
    document.getElementById('search-modal').style.display = 'flex';
    document.getElementById('input-busqueda').focus(); // Pone el cursor automáticamente
}

function cerrarBuscador() {
    document.getElementById('search-modal').style.display = 'none';
}

// --- LÓGICA DE FILTRADO DE PRODUCTOS ---
function filtrarProductos() {
    let input = document.getElementById('input-busqueda').value.toLowerCase();
    let productos = document.querySelectorAll('.tarjeta-producto');

    productos.forEach(producto => {
        // Busca en el atributo "data-nombre" del HTML
        let nombre = producto.getAttribute('data-nombre').toLowerCase();
        
        if (nombre.includes(input)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

// --- LÓGICA DE LAS CATEGORÍAS ---
function mostrarAlerta(categoria) {
    // Como aún no tienes los productos (hasta los 18), mostramos un mensaje amigable.
    alert(`¡Excelente elección! Pronto tendremos los mejores productos de ${categoria}. ¡Prepárate!`);
    
    // Opcional: Si quieres que al tocar una categoría, la página baje a los productos, descomenta esta línea:
    // document.querySelector('.seccion-productos').scrollIntoView({ behavior: 'smooth' });
}

// Cerrar el buscador si el usuario presiona la tecla "Escape"
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        cerrarBuscador();
    }
});
