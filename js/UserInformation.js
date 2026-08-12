// ============================================
// دیتای محصولات خریداری شده
// ============================================
const purchasedProducts = [{
    id: 1,
    name: 'محصول 1 ',
    code: '#WP-2024-001',
    date: '۱۴۰۴/۰۱/۱۵',
    image: '../assets/images/icons/1.png',
    downloadLink: '#'
},{
    id: 1,
    name: '  محصول 2',
    code: '#WP-2024-001',
    date: '۱۴۰۴/۰۱/۱۵',
    image: '',
    downloadLink: '#'
},
];

// ============================================
// ساخت کارت‌های محصولات به صورت داینامیک
// ============================================
const container = document.getElementById('productsContainer');

purchasedProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);

    card.innerHTML = `
        <div class="product-image">
            ${product.image ? 
                `<img src="${product.image}" alt="${product.name}">` : 
                `<div class="no-image">📁</div>`
            }
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <span class="product-code">${product.code}</span>
            <div class="product-meta">
                <span class="product-date">📅 <span>${product.date}</span></span>
                <button class="download-btn" data-id="${product.id}">
                    ⬇️ دانلود
                </button>
            </div>
        </div>
    `;

    container.appendChild(card);
});

// ============================================
// مدیریت رویداد کلیک روی دکمه‌های دانلود
// ============================================
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const productId = this.getAttribute('data-id');
        const product = purchasedProducts.find(p => p.id == productId);

        if (product) {
            // تغییر وضعیت دکمه به در حال دانلود
            this.innerHTML = '⏳ در حال دانلود...';
            this.style.opacity = '0.7';
            this.disabled = true;

            // شبیه‌سازی دانلود (با تاخیر ۱.۵ ثانیه)
            setTimeout(() => {
                // تغییر وضعیت به دانلود شده
                this.innerHTML = '✅ دانلود شد';
                this.classList.add('downloaded');
                this.style.opacity = '1';
                this.disabled = false;

                // نمایش پیام موفقیت
                showNotification(`دانلود ${product.name} با موفقیت انجام شد!`);

                // در صورت نیاز، لینک دانلود واقعی را فعال کنید:
                // window.location.href = product.downloadLink;
                // یا
                // window.open(product.downloadLink, '_blank');

            }, 1500);
        }
    });
});

// ============================================
// تابع نمایش نوتیفیکیشن (پیام اعلان)
// ============================================
function showNotification(message) {
    // حذف نوتیفیکیشن قبلی
    const oldNotif = document.querySelector('.custom-notification');
    if (oldNotif) oldNotif.remove();

    // ساخت نوتیفیکیشن جدید
    const notif = document.createElement('div');
    notif.className = 'custom-notification';
    notif.innerHTML = `
        <div style="
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #1a1a1a;
            color: #fff;
            padding: 18px 25px;
            border-radius: 12px;
            border-right: 4px solid #F40C1C;
            box-shadow: 0 8px 30px rgba(0,0,0,0.8);
            z-index: 9999;
            font-size: 15px;
            animation: slideIn 0.5s ease;
            max-width: 400px;
        ">
            <span style="color: #F40C1C; font-weight: 700;">✓</span> ${message}
        </div>
        <style>
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        </style>
    `;

    document.body.appendChild(notif);

    // حذف خودکار نوتیفیکیشن بعد از ۴ ثانیه
    setTimeout(() => {
        if (notif) {
            notif.style.transition = 'all 0.5s ease';
            notif.style.transform = 'translateX(100px)';
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 500);
        }
    }, 4000);
}

// ============================================
// کلیک روی کارت محصول (برای نمایش جزئیات)
// ============================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // اگر روی دکمه دانلود کلیک نشده باشه
        if (!e.target.closest('.download-btn')) {
            const name = this.querySelector('.product-name')?.textContent || 'محصول';
            showNotification(`مشاهده جزئیات: ${name}`);
        }
    });
});

// پیام در کنسول برای تایید بارگذاری
console.log('✅ پنل کاربری با موفقیت بارگذاری شد!');
console.log('🔴 رنگ اصلی: #F40C1C');