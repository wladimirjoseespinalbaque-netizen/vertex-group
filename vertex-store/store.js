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
    const scrollAmount = 260 * direccion;
    carrusel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// Cerrar buscador con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        cerrarBuscador();
    }
});

// --- SISTEMA DE CARRITO DE COMPRAS ---

function agregarAlCarrito(id, nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carritoVertex')) || [];
    let productoExistente = carrito.find(p => p.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }

    localStorage.setItem('carritoVertex', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`¡${nombre} añadido al carrito!`);
}

function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoVertex')) || [];
    let totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.innerText = totalItems;
}

function mostrarCarritoEnCheckout() {
    let carrito = JSON.parse(localStorage.getItem('carritoVertex')) || [];
    const contenedor = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total-pagar');
    const inputLista = document.getElementById('input-lista-productos');
    const inputTotal = document.getElementById('input-total-pagar');

    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center;">Tu carrito está vacío. <a href="index.html">Volver a la tienda</a></p>';
        if (totalElemento) totalElemento.innerText = '$0.00';
        return;
    }

    contenedor.innerHTML = '';
    let total = 0;
    let textoProductos = '';

    carrito.forEach((p, index) => {
        let subtotal = p.precio * p.cantidad;
        total += subtotal;
        textoProductos += `${p.cantidad}x ${p.nombre} ($${subtotal.toFixed(2)})\n`;

        contenedor.innerHTML += `
            <div class="item-carrito">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="info-item">
                    <h4>${p.nombre}</h4>
                    <p>$${p.precio.toFixed(2)} x ${p.cantidad}</p>
                </div>
                <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">✖</button>
            </div>
        `;
    });

    if (totalElemento) totalElemento.innerText = `$${total.toFixed(2)}`;
    if (inputLista) inputLista.value = textoProductos;
    if (inputTotal) inputTotal.value = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carritoVertex')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carritoVertex', JSON.stringify(carrito));
    mostrarCarritoEnCheckout();
    actualizarContadorCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('carritoVertex');
}

// --- INICIALIZACIÓN Y LECTURA DE URL (Para Comprar Ahora) ---
document.addEventListener("DOMContentLoaded", function() {
    // 1. Revisar si venimos de un botón "Comprar Ahora"
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('producto') && urlParams.has('precio')) {
        let nombre = urlParams.get('producto');
        let precio = parseFloat(urlParams.get('precio').replace('$', ''));

        // Creamos un carrito temporal solo con este producto
        let carritoDirecto = [{
            id: Date.now(), // ID único basado en el tiempo
            nombre: nombre,
            precio: precio,
            imagen: 'img/audifonos_bluetooth.jpg', // Imagen por defecto
            cantidad: 1
        }];

        localStorage.setItem('carritoVertex', JSON.stringify(carritoDirecto));
    }

    // 2. Actualizar la interfaz
    actualizarContadorCarrito();
    mostrarCarritoEnCheckout();
});
