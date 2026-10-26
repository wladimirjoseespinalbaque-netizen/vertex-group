// Función para abrir y cerrar el panel de búsqueda
function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'flex';
        document.getElementById('searchInput').focus(); // Pone el cursor automáticamente
    }
}

// Lógica del buscador en vivo
const searchInput = document.getElementById('searchInput');
const productCards = document.querySelectorAll('.product-card');

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

// Función para simular el filtro de categorías grandes
function filterByCategory(category) {
    // Esto es una simulación visual. En el futuro, aquí puedes cambiar la vista o cargar productos específicos.
    alert(`Has seleccionado la categoría: ${category.toUpperCase()}. Aquí se mostrarán los productos de esta sección.`);
    
    // Opcional: Filtrar los productos actuales por su data-category
    productCards.forEach(card => {
        if (card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
