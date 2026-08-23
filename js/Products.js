// ===== متغیرهای مدیریت محصولات و سبد خرید =====
let products = [];
let cart = {};

// ===== دریافت محصولات واقعی از دیتابیس سرور =====
async function loadProductsFromDB() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
            products = data.data.map(p => ({
                id: p.id,
                name: p.title,
                img: p.webp_path ? `/${p.webp_path}` : `/${p.svg_path}`,
                price: parseFloat(p.price) || 4,
                category: p.category || 'gifts',
                json_path: p.json_path,
                svg_path: p.svg_path
            }));
        } else {
            console.warn('محصولی در دیتابیس یافت نشد.');
        }
    } catch (err) {
        console.error('خطا در بارگذاری محصولات:', err);
    }
    
    renderProducts('all');
    updateUI();
}

// ===== رندر محصولات در صفحه =====
function renderProducts(category = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category || (category === 'gifts' && p.category === 'gift'));

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="color:#aaa; text-align:center; width:100%; grid-column: 1/-1;">محصولی در این بخش وجود ندارد</div>';
        return;
    }

    grid.innerHTML = filtered.map(product => {
        const count = cart[product.id] || 0;
        return `
            <div class="product-card ${count > 0 ? 'selected' : ''}" data-id="${product.id}" onclick="toggleProduct(${product.id})">
                <img src="${product.img}" alt="${product.name}" onerror="this.src='../assets/stickers/GiftShop_Farsi_AgAD-BwAAvQXsVA.webp'">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price} TON</div>
            </div>
        `;
    }).join('');
}

// ===== انتخاب / عدم انتخاب محصول =====
function toggleProduct(productId) {
    const current = cart[productId] || 0;
    
    if (current > 0) {
        delete cart[productId];
    } else {
        cart[productId] = 1;
    }
    
    updateUI();
}

// ===== بروزرسانی رابط کاربری (تعداد و قیمت) =====
function updateUI() {
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((sum, [id, count]) => {
        const product = products.find(p => p.id === parseInt(id));
        return sum + (product ? product.price * count : 0);
    }, 0);

    const cartCountEl = document.getElementById('cartCount');
    const cartTotalEl = document.getElementById('cartTotal');
    
    if (cartCountEl) cartCountEl.textContent = totalItems;
    if (cartTotalEl) cartTotalEl.textContent = totalPrice.toFixed(2);

    document.querySelectorAll('.product-card').forEach(card => {
        const id = parseInt(card.dataset.id);
        const count = cart[id] || 0;
        card.classList.toggle('selected', count > 0);
    });

    const warning = document.getElementById('cartMinWarning');
    const cartBtn = document.getElementById('cartFixedBtn');
    
    if (warning) {
        if (totalItems < 5 && totalItems > 0) warning.classList.add('show');
        else warning.classList.remove('show');
    }

    if (cartBtn) {
        cartBtn.style.opacity = (totalItems > 0) ? '1' : '0.7';
    }
}

// ===== مدیریت دکمه‌های فیلتر دسته‌بندی =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProducts(this.dataset.filter);
        updateUI();
    });
});

// ===== دکمه ثبت سبد خرید / رفتن به تسویه =====
const cartBtn = document.getElementById('cartFixedBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
        
        if (totalItems === 0) {
            alert('لطفاً حداقل یک استیکر انتخاب کنید.');
            return;
        }
        
        localStorage.setItem('cartData', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    });
}

// ===== لود اولیه داده‌ها از سرور =====
document.addEventListener('DOMContentLoaded', function() {
    loadProductsFromDB();
});