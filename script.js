document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.getElementById('add-product-modal');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const productForm = document.getElementById('productForm');

    function openModal() {
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        productForm.reset(); // Reset form when closing
    }

    // Modal event listeners
    addProductBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    // Form submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const image = document.getElementById('productImage').value;

        if (name && price && image) {
            products.push({ id: Date.now(), name, price, image });
            renderProducts();
            closeModal(); // Close modal after successful submission
        }
    });

    // Initialize products and cart
    let products = [
        // ...existing code from back.js...
    ];

    let cart = [];
    // ...rest of the existing code from back.js...
});
