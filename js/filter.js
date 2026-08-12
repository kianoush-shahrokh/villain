// ============================================
// main.js - صفحه اصلی + گالری + سبد خرید
// ============================================

// ---------- دیتای محصولات با چند عکس ----------
const products = [
    {
        "id": 1,
        "name": "کیف چرمی لوکس",
        "code": "1245",
        "price": 1250000,
        "images": [
            "../assets/images/icons/1.png",
            "../assets/images/icons/2.png",
        ],
        "category": "special"
    },
    {
        "id": 2,
        "name": "ساعت هوشمند X9",
        "code": "2341",
        "price": 850000,
        "images": [
            "product2-1.jpg",
            "product2-2.jpg"
        ],
        "category": "gift"
    },
    {
        "id": 3,
        "name": "پاوربانک 20000 میلی‌آمپر",
        "code": "3456",
        "price": 450000,
        "images": [
            "product3-1.jpg",
            "product3-2.jpg",
            "product3-3.jpg",
            "product3-4.jpg"
        ],
        "category": "all"
    },
    {
        "id": 4,
        "name": "هدفون بی‌سیم Pro",
        "code": "4567",
        "price": 720000,
        "images": [
            "product4-1.jpg",
            "product4-2.jpg"
        ],
        "category": "special"
    },
];

// ============================================
// مدیریت سبد خرید (localStorage)
// ============================================

function getCart() {
    const data = localStorage.getItem('shoppingCart');
    return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function addToCart(product) {
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ 
            ...product, 
            quantity: 1,
            image: product.images && product.images.length > 0 ? product.images[0] : 'default.jpg'
        });
    }
    
    saveCart(cart);
    updateCartBadge();
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartBadge();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        updateCartBadge();
    }
}

function getTotalPrice() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getItemCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function clearCart() {
    saveCart([]);
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const count = getItemCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}

// ============================================
// مودال با گالری تصاویر
// ============================================

let currentProductId = null;
let currentImageIndex = 0;
let currentImages = [];

const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalCode = document.getElementById('modalCode');
const modalPrice = document.getElementById('modalPrice');
const modalCancel = document.getElementById('modalCancel');
const modalAdd = document.getElementById('modalAdd');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryDots = document.getElementById('galleryDots');

// ---------- باز کردن مودال ----------
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProductId = productId;
    currentImages = product.images && product.images.length > 0 
        ? product.images 
        : ['default.jpg'];
    currentImageIndex = 0;
    
    // پر کردن اطلاعات مودال
    updateGallery();
    modalName.textContent = product.name;
    modalCode.textContent = '#' + product.code;
    modalPrice.textContent = product.price.toLocaleString() + ' TON';
    
    // نمایش مودال
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ---------- به‌روزرسانی گالری ----------
function updateGallery() {
    if (!currentImages.length) return;
    
    // تغییر عکس با انیمیشن
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.src = currentImages[currentImageIndex];
        modalImage.alt = 'تصویر ' + (currentImageIndex + 1);
        modalImage.style.opacity = '1';
    }, 150);
    
    // به‌روزرسانی دات‌ها
    galleryDots.innerHTML = '';
    currentImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'gallery-dot' + (index === currentImageIndex ? ' active' : '');
        dot.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery();
        });
        galleryDots.appendChild(dot);
    });
}

// ---------- عکس قبلی ----------
function prevImage() {
    if (currentImages.length <= 1) return;
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateGallery();
}

// ---------- عکس بعدی ----------
function nextImage() {
    if (currentImages.length <= 1) return;
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateGallery();
}

// ---------- بستن مودال ----------
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProductId = null;
    currentImages = [];
    currentImageIndex = 0;
}

// ---------- افزودن به سبد خرید از مودال ----------
function addToCartFromModal() {
    if (currentProductId === null) return;
    
    const product = products.find(p => p.id === currentProductId);
    if (!product) return;
    
    addToCart(product);
    
    // نمایش پیام موفقیت
    const addBtn = modalAdd;
    const originalText = addBtn.textContent;
    addBtn.textContent = '✅ اضافه شد';
    addBtn.style.background = '#28a745';
    addBtn.style.boxShadow = '0 4px 20px rgba(40, 167, 69, 0.4)';
    
    setTimeout(() => {
        addBtn.textContent = originalText;
        addBtn.style.background = '';
        addBtn.style.boxShadow = '';
    }, 1500);
    
    setTimeout(() => {
        closeModal();
    }, 800);
}

// ---------- رویدادهای مودال ----------
if (modalCancel) {
    modalCancel.addEventListener('click', closeModal);
}

if (modalAdd) {
    modalAdd.addEventListener('click', addToCartFromModal);
}

if (galleryPrev) {
    galleryPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        prevImage();
    });
}

if (galleryNext) {
    galleryNext.addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });
}

// کلیدهای کیبورد
document.addEventListener('keydown', function(e) {
    if (!modal || !modal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
    } else if (e.key === 'Escape') {
        closeModal();
    }
});

// بستن با کلیک روی overlay
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// ============================================
// نمایش محصولات
// ============================================

function displayProducts(productsToShow) {
    const container = document.querySelector('.products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsToShow.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: #888; padding: 50px 0;">
                <p style="font-size: 18px;">محصولی یافت نشد</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach(product => {
        // عکس اول رو برای نمایش توی کارت استفاده کن
        const firstImage = product.images && product.images.length > 0 
            ? product.images[0] 
            : 'default.jpg';
        
        container.innerHTML += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${firstImage}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-code">#${product.code}</span>
                    <div class="product-price-cart">
                        <span class="product-price">${product.price.toLocaleString()} TON</span>
                        <button class="add-to-cart" data-id="${product.id}">🛒</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    // ===== رویداد دکمه‌های سبد خرید =====
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            openModal(productId);
        });
    });
}

// ============================================
// فیلتر کردن محصولات
// ============================================

function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(product => product.category === category);
        displayProducts(filtered);
    }
}

// ============================================
// تغییر زبان (برای هدر)
// ============================================

function changeLanguage(lang, flag, name) {
    document.getElementById('currentLanguage').textContent = flag + ' ' + name;
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.remove('show');
    const btn = document.getElementById('languageToggle');
    btn.classList.remove('active');
    
    // اینجا می‌تونی منطق تغییر زبان رو اضافه کنی
    console.log('زبان تغییر کرد به:', lang);
}

// ============================================
// راه‌اندازی اولیه
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // نمایش محصولات
    displayProducts(products);
    
    // به‌روزرسانی نشانگر سبد خرید
    updateCartBadge();
    
    // ===== منوی کشویی زبان =====
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            languageDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageToggle.classList.remove('active');
                languageDropdown.classList.remove('show');
            }
        });
    }
    
    // ===== منوی کشویی پروفایل =====
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }
    
    // ===== فیلترها =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.dataset.filter;
            filterProducts(filterValue);
        });
    });
});

// ============================================
// صادر کردن برای استفاده در صفحات دیگر
// ============================================

window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.getTotalPrice = getTotalPrice;
window.getItemCount = getItemCount;
window.clearCart = clearCart;
window.updateCartBadge = updateCartBadge;
window.products = products;
window.changeLanguage = changeLanguage;
window.openModal = openModal;
window.closeModal = closeModal;











































