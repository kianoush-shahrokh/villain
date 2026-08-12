
// ===== بخش پایین صفحه =====
const sendBtn = document.getElementById('sendIdBtn');
const telegramInput = document.getElementById('telegramId');
const adminLink = document.getElementById('adminLink');

// ===== تنظیم لینک ادمین =====
const ADMIN_USERNAME = 'AdminUsername'; // نام کاربری ادمین رو اینجا بذار
adminLink.href = `https://t.me/${ADMIN_USERNAME}`;

// ===== ارسال آیدی =====
sendBtn.addEventListener('click', function() {
    const userId = telegramInput.value.trim();

    if (!userId) {
        telegramInput.style.borderColor = '#e74c3c';
        telegramInput.style.background = 'rgba(231, 76, 60, 0.1)';
        telegramInput.placeholder = 'لطفاً آیدی خود را وارد کنید!';

        setTimeout(() => {
            telegramInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            telegramInput.style.background = 'rgba(255, 255, 255, 0.08)';
            telegramInput.placeholder = 'your_username';
        }, 2000);

        return;
    }

    const originalText = sendBtn.innerHTML;
    sendBtn.innerHTML = '✅ ارسال شد!';
    sendBtn.style.background = 'linear-gradient(135deg, #27ae60, #1e8449)';

    setTimeout(() => {
        sendBtn.innerHTML = originalText;
        sendBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    }, 3000);

    localStorage.setItem('telegramId', userId);
    console.log('آیدی تلگرام:', userId);
});

// ===== بارگذاری آیدی ذخیره شده =====
window.addEventListener('DOMContentLoaded', function() {
    const savedId = localStorage.getItem('telegramId');
    if (savedId) {
        telegramInput.value = savedId;
    }
});

// ===== پاک کردن خطا هنگام تایپ =====
telegramInput.addEventListener('input', function() {
    this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    this.style.background = 'rgba(255, 255, 255, 0.08)';
});





