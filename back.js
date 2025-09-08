// Sample Products
let products = [
  { id: 1, name: "Macbook", price: 100000, image: "./images/laptop.jpg" },
  { id: 2, name: "Headphones", price: 2000, image: "./images/headphones.jpg" },
  { id: 3, name: "Smartphone", price: 65000, image: "./images/smartphone.jpg" },
  { id: 4, name: "Smart Watch", price: 3000, image: "./images/smartwatch.jpg" },
  { id: 5, name: "Wireless Mouse", price: 1500, image: "./images/mouse.jpg" },
  { id: 6, name: "Gaming Keyboard", price: 3500, image: "./images/keyboard.jpg" },
  { id: 7, name: "Monitor", price: 5000, image: "./images/monitor.jpg" },
  { id: 8, name: "Bluetooth Speaker", price: 3000, image: "./images/speaker.jpg" },
  { id: 9, name: "Power Bank", price: 1200, image: "./images/powerbank.jpg" },
  { id: 10, name: "Webcam", price: 1000, image: "./images/webcam.jpg" },
  { id: 11, name: "External SSD", price: 4500, image: "./images/ssd.jpg" },
  { id: 12, name: "Gaming Mouse Pad", price: 250, image: "./images/mousepad.jpg" }
];

let cart = [];
let salesRecord = [];

const productList = document.getElementById("product-list");
const cartContainer = document.getElementById("cartContainer");
const searchInput = document.getElementById("search");

// Render Products
function renderProducts() {
  const searchValue = searchInput.value.toLowerCase();
  productList.innerHTML = "";

  products
    .filter(p => p.name.toLowerCase().includes(searchValue))
    .forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button class="btn">Add to Cart</button>
      `;
      card.querySelector("button").addEventListener("click", () => addToCart(product));
      productList.appendChild(card);
    });
}

// Render Cart
function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Cart is empty.</p>";
    return;
  }
  cartContainer.innerHTML = `
    <ul>
      ${cart.map(item => `<li>${item.name} - ₹${item.price}</li>`).join("")}
    </ul>
    <p><strong>Total: ₹${cart.reduce((sum, item) => sum + item.price, 0)}</strong></p>
    <button id="checkoutBtn" class="btn">Checkout</button>
  `;
  
  document.getElementById('checkoutBtn').addEventListener('click', () => {
      recordSale([...cart]);
      cart = [];
      renderCart();
      toggleCart();
  });
}

// Add to Cart
function addToCart(product) {
  cart.push(product);
  renderCart();
}

// Add Product Modal Controls
const addProductModal = document.getElementById('add-product-modal');
const addProductBtn = document.getElementById('add-product-btn');
const closeAddProductBtn = document.getElementById('closeAddProductBtn');

function toggleAddProduct() {
    addProductModal.classList.toggle('hidden');
}

addProductBtn.addEventListener('click', toggleAddProduct);
closeAddProductBtn.addEventListener('click', toggleAddProduct);

// Close add product modal when clicking outside
addProductModal.addEventListener('click', (e) => {
    if (e.target === addProductModal) toggleAddProduct();
});

// Add New Product
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value;

  if (!name || !price || !image) return;

  products.push({ id: Date.now(), name, price, image });
  renderProducts();
  e.target.reset();
  toggleAddProduct(); // Close modal after submission
});

// Search
searchInput.addEventListener("input", renderProducts);

// Cart Modal Controls
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('closeCartBtn');

function toggleCart() {
    cartModal.classList.toggle('hidden');
}

cartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);

// Close cart when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) toggleCart();
});

// Sales Record Modal Controls
const salesModal = document.getElementById('sales-modal');
const salesRecordBtn = document.getElementById('sales-record-btn');
const closeSalesBtn = document.getElementById('closeSalesBtn');

function toggleSales() {
    salesModal.classList.toggle('hidden');
    if (!salesModal.classList.contains('hidden')) {
        updateSalesRecord();
    }
}

// Sales Record Functions
function recordSale(items) {
    const sale = {
        id: Date.now(),
        items: items,
        total: items.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toLocaleString()
    };
    salesRecord.push(sale);
    updateSalesRecord();
}

function updateSalesRecord() {
    const totalSold = document.getElementById('totalSold');
    const totalRevenue = document.getElementById('totalRevenue');
    const salesList = document.getElementById('salesList');

    const total = salesRecord.reduce((sum, sale) => sum + sale.total, 0);
    const itemsSold = salesRecord.reduce((sum, sale) => sum + sale.items.length, 0);

    totalSold.textContent = itemsSold;
    totalRevenue.textContent = total;

    // Update product-wise sales
    const productSales = {};
    salesRecord.forEach(sale => {
        sale.items.forEach(item => {
            if (!productSales[item.name]) {
                productSales[item.name] = { quantity: 0, revenue: 0 };
            }
            productSales[item.name].quantity += 1;
            productSales[item.name].revenue += item.price;
        });
    });

    salesList.innerHTML = Object.entries(productSales)
        .map(([name, data]) => `
            <div class="sales-item">
                <span>${name}</span>
                <span>Sold: ${data.quantity} | Revenue: ₹${data.revenue}</span>
            </div>
        `).join('');
}

// Add sales modal event listeners
salesRecordBtn.addEventListener('click', toggleSales);
closeSalesBtn.addEventListener('click', toggleSales);
salesModal.addEventListener('click', (e) => {
    if (e.target === salesModal) toggleSales();
});

// Add clear sales record function
function clearSalesRecord() {
    if (confirm('Are you sure you want to clear all sales records?')) {
        salesRecord = [];
        updateSalesRecord();
    }
}

// Add clear button event listener after other sales modal controls
document.getElementById('clearSalesBtn').addEventListener('click', clearSalesRecord);

// Initial render
renderProducts();
renderCart();
