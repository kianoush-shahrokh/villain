// ===== دیتابیس محصولات =====
const products = [
    { id: 1, name: 'Happy Emoji', img: '../assets/images/icons/1.png', price: 2, category: 'all' },
    { id: 2, name: 'Heart Emoji', img: 'assets/images/icons/2.png', price: 3, category: 'gift' },
    { id: 3, name: 'Star Emoji', img: 'assets/images/icons/3.png', price: 4, category: 'special' },
    { id: 4, name: 'Flag Emoji', img: 'assets/images/icons/4.png', price: 5, category: 'flag' },
    { id: 5, name: 'Fire Emoji', img: 'assets/images/icons/5.png', price: 3, category: 'all' },
    { id: 6, name: 'Rocket Emoji', img: 'assets/images/icons/6.png', price: 6, category: 'special' },
    { id: 7, name: 'Gift Box', img: 'assets/images/icons/7.png', price: 7, category: 'gift' },
    { id: 8, name: 'Rainbow Flag', img: 'assets/images/icons/8.png', price: 5, category: 'flag' },
    { id: 9, name: 'Diamond', img: 'assets/images/icons/9.png', price: 8, category: 'other' },
    { id: 10, name: 'Crown', img: 'assets/images/icons/10.png', price: 9, category: 'special' },
    { id: 11, name: 'Rose', img: 'assets/images/icons/11.png', price: 4, category: 'gift' },
    { id: 12, name: 'Globe', img: 'assets/images/icons/12.png', price: 6, category: 'other' },
];

// ===== مدیریت سبد خرید =====
let cart = {};

// ===== رندر محصولات =====
function renderProducts(category = 'all') {
    const grid = document.getElementById('productsGrid');
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    grid.innerHTML = filtered.map(product => {
        const count = cart[product.id] || 0;
        return `
            <div class="product-card ${count > 0 ? 'selected' : ''}" data-id="${product.id}" onclick="toggleProduct(${product.id})">
                <img src="${product.img}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23333%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23fff%22 font-size=%2230%22 font-family=%22Arial%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price} TON</div>
            </div>
        `;
    }).join('');
}

// ===== انتخاب/عدم انتخاب محصول =====
function toggleProduct(productId) {
    const current = cart[productId] || 0;
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    
    if (current > 0) {
        if (totalItems <= 0) {
            alert(getTranslation('cart_min_error') || 'You must select at least 5 products!');
            return;
        }
        delete cart[productId];
    } else {
        cart[productId] = 1;
    }
    
    updateUI();
}

// ===== بروزرسانی UI =====
function updateUI() {
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((sum, [id, count]) => {
        const product = products.find(p => p.id === parseInt(id));
        return sum + (product ? product.price * count : 0);
    }, 0);

    document.getElementById('cartCount').textContent = totalItems;
    document.getElementById('cartTotal').textContent = totalPrice;

    document.querySelectorAll('.product-card').forEach(card => {
        const id = parseInt(card.dataset.id);
        const count = cart[id] || 0;
        card.classList.toggle('selected', count > 0);
    });

    const warning = document.getElementById('cartMinWarning');
    const cartBtn = document.getElementById('cartFixedBtn');
    
    if (totalItems < 5 && totalItems > 0) {
        if (warning) warning.classList.add('show');
        cartBtn.style.opacity = '0.7';
    } else if (totalItems >= 5) {
        if (warning) warning.classList.remove('show');
        cartBtn.style.opacity = '1';
    } else {
        if (warning) warning.classList.remove('show');
        cartBtn.style.opacity = '1';
    }
}

// ===== فیلتر =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProducts(this.dataset.filter);
        updateUI();
    });
});

// ===== دکمه ثابت پایین =====
const cartBtn = document.getElementById('cartFixedBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
        
        if (totalItems === 0) {
            alert(getTranslation('cart_empty') || 'Cart is empty!');
            return;
        }
        
        if (totalItems < 5) {
            alert(getTranslation('cart_min_error') || 'You must select at least 5 products!');
            return;
        }
        
        localStorage.setItem('cartData', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    });
}

// ===== لود اولیه =====
document.addEventListener('DOMContentLoaded', function() {
    renderProducts('all');
    updateUI();
});