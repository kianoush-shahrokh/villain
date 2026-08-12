// ============================================
// shapping.js - صفحه سبد خرید
// ============================================

// ---------- رندر کردن سبد خرید ----------
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!container || !totalElement) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>🛒 سبد خرید شما خالی است!</p>
                <a href="index.html" class="btn-primary">مشاهده محصولات</a>
            </div>
        `;
        totalElement.textContent = '0';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <span class="item-code">#${item.code}</span>
                <p class="item-price">${item.price.toLocaleString()} TON</p>
            </div>
            <div class="item-actions">
                <button class="qty-btn decrease" data-id="${item.id}">−</button>
                <span class="qty">${item.quantity}</span>
                <button class="qty-btn increase" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">🗑️</button>
            </div>
            <div class="item-total">
                ${(item.price * item.quantity).toLocaleString()} TON
            </div>
        </div>
    `).join('');
    
    // نمایش جمع کل
    totalElement.textContent = getTotalPrice().toLocaleString();
    
    // ===== رویدادهای دکمه‌ها =====
    
    // افزایش
    container.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const cart = getCart();
            const item = cart.find(i => i.id === id);
            if (item) {
                updateQuantity(id, item.quantity + 1);
                renderCart();
                updateCartBadge();
            }
        });
    });
    
    // کاهش
    container.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const cart = getCart();
            const item = cart.find(i => i.id === id);
            if (item) {
                updateQuantity(id, item.quantity - 1);
                renderCart();
                updateCartBadge();
            }
        });
    });
    
    // حذف
    container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            removeFromCart(id);
            renderCart();
            updateCartBadge();
        });
    });
    
    // ===== دکمه پرداخت =====
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.removeEventListener('click', handleCheckout);
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

// ---------- تابع پرداخت ----------
function handleCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('سبد خرید شما خالی است!');
        return;
    }
    
    const total = getTotalPrice();
    const message = `✅ پرداخت\n\nمبلغ کل: ${total.toLocaleString()} TON\nتعداد اقلام: ${getItemCount()}\n\nآیا برای پرداخت آماده‌اید؟`;
    
    if (confirm(message)) {
        alert('🎉 پرداخت با موفقیت انجام شد!\nسفارش شما ثبت شد.');
        clearCart();
        renderCart();
        updateCartBadge();
    }
}

// ---------- راه‌اندازی صفحه سبد خرید ----------
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartBadge();
});

// ===== صادر کردن =====
window.renderCart = renderCart;