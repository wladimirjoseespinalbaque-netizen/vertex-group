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
        producto.style.display = nombre.includes(input) ? 'block' : 'none';
    });
}

function filtrarPorCategoria(categoria) {
    let productos = document.querySelectorAll('.tarjeta-producto');
    productos.forEach(producto => {
        producto.style.display = (producto.getAttribute('data-categoria') === categoria) ? 'block' : 'none';
    });
    document.querySelector('.seccion-productos').scrollIntoView({ behavior: 'smooth' });
}

function moverCarrusel(direccion) {
    const carrusel = document.getElementById('carrusel-productos');
    carrusel.scrollBy({ left: 260 * direccion, behavior: 'smooth' });
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") cerrarBuscador();
});

// --- SISTEMA DE CARRITO ---

function agregarAlCarrito(id, nombre, precio, imagen, caracteristica) {
    let carrito = JSON.parse(localStorage.getItem('carritoVertex')) || [];
    let productoExistente = carrito.find(p => p.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        let fecha = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
        carrito.push({ id, nombre, precio, imagen, cantidad: 1, caracteristica: caracteristica || 'Producto de calidad', fecha: fecha });
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

function mostrarCarrito() {
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
                    <p style="font-size: 12px; color: #888; margin-bottom: 5px;">${p.caracteristica}</p>
                    <p style="font-size: 12px; color: #aaa; margin-bottom: 5px;">Añadido: ${p.fecha}</p>
                    <p style="font-weight: bold; color: var(--azul-marino);">$${p.precio.toFixed(2)} x ${p.cantidad}</p>
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
    mostrarCarrito();
    actualizarContadorCarrito();
}

function limpiarCarritoAlComprar() {
    localStorage.removeItem('carritoVertex');
}

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", function() {
    // 1. Si venimos de "Comprar Ahora", inyectamos ese producto al carrito
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('producto') && urlParams.has('precio')) {
        let nombre = urlParams.get('producto');
        let precio = parseFloat(urlParams.get('precio').replace('$', ''));
        
        let carritoDirecto = [{
            id: Date.now(),
            nombre: nombre,
            precio: precio,
            imagen: 'img/audifonos_bluetooth.jpg', // Imagen por defecto
            cantidad: 1,
            caracteristica: 'Producto seleccionado',
            fecha: new Date().toLocaleDateString('es-ES')
        }];
        localStorage.setItem('carritoVertex', JSON.stringify(carritoDirecto));
    }

    // 2. Mostrar carrito (en carrito.html o checkout.html) y actualizar contador
    actualizarContadorCarrito();
    mostrarCarrito();
});
