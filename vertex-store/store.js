const searchInput = document.getElementById('searchInput');
const productCards = document.querySelectorAll('.product-card');

// Función para buscar por texto
searchInput.addEventListener('keyup', function() {
    const searchTerm = searchInput.value.toLowerCase();
    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Función para filtrar por categoría (Le pasamos el 'event' para que no falle en algunos navegadores)
function filterProducts(category, event) {
    // Cambiar el color del botón activo
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Mostrar u ocultar productos
    productCards.forEach(card => {
        if (category === 'todos' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
