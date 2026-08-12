// =============================================
// مدیریت موجودی هدر و صفحه TON
// =============================================

// بروزرسانی موجودی در هدر
function updateHeaderBalance(balance) {
    const headerBalance = document.getElementById('headerBalance');
    if (headerBalance) {
        headerBalance.textContent = balance.toFixed(2);
    }
    localStorage.setItem('userBalance', balance.toString());
}

// دریافت موجودی از localStorage
function getHeaderBalance() {
    const balance = localStorage.getItem('userBalance');
    return balance ? parseFloat(balance) : 0;
}

// =============================================
// کدهای اصلی صفحه TON
// =============================================

(function() {
    'use strict';

    // =============================================
    // گرفتن تمام المنت‌های مورد نیاز
    // =============================================
    
    const connectBtn = document.getElementById('connectBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const sendBtn = document.getElementById('sendBtn');
    const receiveBtn = document.getElementById('receiveBtn');
    const refreshTxBtn = document.getElementById('refreshTxBtn');
    const copyBtn = document.getElementById('copyBtn');

    const walletAddress = document.getElementById('walletAddress');
    const walletBalance = document.getElementById('walletBalance');
    const balanceUsd = document.getElementById('balanceUsd');
    const connectionBadge = document.getElementById('connectionBadge');
    const statusText = document.getElementById('statusText');
    const networkName = document.getElementById('networkName');
    const networkDot = document.getElementById('networkDot');
    const txCount = document.getElementById('txCount');
    const txList = document.getElementById('txList');

    const connectPlaceholder = document.getElementById('connectPlaceholder');
    const connectedContent = document.getElementById('connectedContent');

    // =============================================
    // متغیرهای وضعیت
    // =============================================
    
    let isConnected = false;
    let currentAddress = '';
    let currentBalance = '0.00';
    let transactions = [];

    // =============================================
    // داده‌های نمونه
    // =============================================
    
    const DEMO_ADDRESS = 'EQD4fp6FkVfF9wqXwCUwPQk3khL8sVfQ';
    
    const SAMPLE_TRANSACTIONS = [
        {
            type: '📤 ارسال به ...',
            date: '۲ دقیقه پیش',
            amount: '-۵.۰۰ TON',
            status: 'تأیید',
            isPositive: false
        },
        {
            type: '📥 دریافت از ...',
            date: '۱ ساعت پیش',
            amount: '+۱۲.۵۰ TON',
            status: 'تأیید',
            isPositive: true
        },
        {
            type: '🔄 استیکینگ',
            date: '۳ ساعت پیش',
            amount: '+۰.۲۵ TON',
            status: 'در انتظار',
            isPositive: true
        },
        {
            type: '📤 ارسال به ...',
            date: '۵ ساعت پیش',
            amount: '-۲.۰۰ TON',
            status: 'تأیید',
            isPositive: false
        }
    ];

    // =============================================
    // توابع کمکی
    // =============================================
    
    function formatAddress(addr) {
        if (!addr || addr.length < 10) return addr;
        return addr.slice(0, 6) + '...' + addr.slice(-6);
    }

    function generateRandomAddress() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = 'EQ';
        for (let i = 0; i < 48; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function generateRandomBalance() {
        return (Math.random() * 150 + 10).toFixed(2);
    }

    // =============================================
    // توابع اصلی UI
    // =============================================
    
    function updateUI() {
        if (isConnected) {
            connectPlaceholder.style.display = 'none';
            connectedContent.style.display = 'block';
            
            connectionBadge.textContent = 'متصل';
            connectionBadge.className = 'badge connected';
            
            statusText.textContent = '🟢 متصل';
            statusText.style.color = '#00c864';
            
            walletAddress.textContent = formatAddress(currentAddress);
            walletBalance.innerHTML = `${currentBalance} <small>TON</small>`;
            
            const usdValue = (parseFloat(currentBalance) * 5.2).toFixed(2);
            balanceUsd.textContent = `≈ $${usdValue} USD`;
            
            sendBtn.disabled = false;
            receiveBtn.disabled = false;
            
            renderTransactions(transactions);
            txCount.textContent = transactions.length;
            
            // بروزرسانی هدر
            updateHeaderBalance(parseFloat(currentBalance));
            
        } else {
            connectPlaceholder.style.display = 'block';
            connectedContent.style.display = 'none';
            
            connectionBadge.textContent = 'قطع';
            connectionBadge.className = 'badge';
            
            statusText.textContent = '🔴 قطع';
            statusText.style.color = '#F40C1C';
            
            sendBtn.disabled = true;
            receiveBtn.disabled = true;
            
            txCount.textContent = '۰';
            txList.innerHTML = `
                <div style="text-align:center;color:#555;padding:20px 0;font-size:14px;">
                    🔒 برای مشاهده تراکنش‌ها ولت را متصل کنید
                </div>
            `;
            
            // بروزرسانی هدر به صفر
            updateHeaderBalance(0);
        }
    }

    function renderTransactions(txs) {
        if (!txs || txs.length === 0) {
            txList.innerHTML = `
                <div style="text-align:center;color:#555;padding:20px 0;font-size:14px;">
                    هیچ تراکنشی یافت نشد
                </div>
            `;
            return;
        }

        txList.innerHTML = txs.map(tx => `
            <div class="tx-item">
                <div class="tx-info">
                    <span class="tx-type">${tx.type}</span>
                    <span class="tx-date">${tx.date}</span>
                </div>
                <div class="tx-right">
                    <span class="tx-amount ${tx.isPositive ? 'positive' : 'negative'}">${tx.amount}</span>
                    <span class="tx-status ${tx.status === 'در انتظار' ? 'pending' : ''}">${tx.status}</span>
                </div>
            </div>
        `).join('');
    }

    // =============================================
    // نمایش نوتیفیکیشن
    // =============================================
    
    function showToast(message, color = '#F40C1C') {
        const existing = document.querySelector('.custom-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.textContent = message;
        
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1a1a1a',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: '16px',
            border: `2px solid ${color}`,
            boxShadow: `0 0 40px rgba(244,12,28,0.2)`,
            fontFamily: "'Vazirmatn', sans-serif",
            fontSize: '14px',
            fontWeight: '600',
            zIndex: '9999',
            direction: 'rtl',
            textAlign: 'center',
            maxWidth: '90%'
        });

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 350);
        }, 3000);
    }

    // =============================================
    // توابع شبیه‌سازی عملیات
    // =============================================
    
    function connectWallet() {
        connectBtn.innerHTML = '<span class="spinner"></span> در حال اتصال...';
        connectBtn.disabled = true;

        setTimeout(() => {
            isConnected = true;
            currentAddress = generateRandomAddress();
            currentBalance = generateRandomBalance();
            transactions = SAMPLE_TRANSACTIONS.map(tx => ({
                ...tx,
                date: ['همین الان', '۱ دقیقه پیش', '۵ دقیقه پیش', '۱۰ دقیقه پیش', '۳۰ دقیقه پیش'][Math.floor(Math.random() * 5)]
            }));
            
            updateUI();
            
            connectBtn.innerHTML = '🔗 اتصال به ولت';
            connectBtn.disabled = false;
            
            showToast('✅ ولت با موفقیت متصل شد!', '#00c864');
        }, 1500);
    }

    function disconnectWallet() {
        isConnected = false;
        currentAddress = '';
        currentBalance = '0.00';
        transactions = [];
        
        updateUI();
        showToast('🔌 اتصال ولت قطع شد', '#F40C1C');
    }

    function copyAddress() {
        if (!isConnected) {
            showToast('❌ ابتدا ولت را متصل کنید', '#F40C1C');
            return;
        }
        
        const addr = currentAddress || DEMO_ADDRESS;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(addr).then(() => {
                showToast('📋 آدرس کپی شد!', '#00c864');
            }).catch(() => {
                fallbackCopy(addr);
            });
        } else {
            fallbackCopy(addr);
        }
    }

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('📋 آدرس کپی شد!', '#00c864');
        } catch (err) {
            showToast('❌ کپی ناموفق بود', '#F40C1C');
        }
        
        textArea.remove();
    }

    function refreshTransactions() {
        if (!isConnected) {
            showToast('❌ ابتدا ولت را متصل کنید', '#F40C1C');
            return;
        }

        refreshTxBtn.innerHTML = '<span class="spinner"></span> در حال بروزرسانی...';
        refreshTxBtn.disabled = true;

        setTimeout(() => {
            const newTxs = SAMPLE_TRANSACTIONS.map(tx => {
                const dates = ['همین الان', '۱ دقیقه پیش', '۵ دقیقه پیش', '۱۰ دقیقه پیش', '۳۰ دقیقه پیش', '۱ ساعت پیش'];
                return {
                    ...tx,
                    date: dates[Math.floor(Math.random() * dates.length)]
                };
            });
            
            if (Math.random() > 0.5) {
                const randomAmount = (Math.random() * 10 + 1).toFixed(2);
                newTxs[0].amount = `-${randomAmount} TON`;
            }
            
            transactions = newTxs;
            renderTransactions(transactions);
            txCount.textContent = transactions.length;

            refreshTxBtn.innerHTML = '🔄 بروزرسانی تراکنش‌ها';
            refreshTxBtn.disabled = false;
            
            showToast('🔄 تراکنش‌ها بروزرسانی شدند', '#F40C1C');
        }, 1000);
    }

    function simulateSend() {
        if (!isConnected) {
            showToast('❌ ابتدا ولت را متصل کنید', '#F40C1C');
            return;
        }
        showToast('📤 پنجره ارسال باز می‌شود (نمایشی)', '#F40C1C');
    }

    function simulateReceive() {
        if (!isConnected) {
            showToast('❌ ابتدا ولت را متصل کنید', '#F40C1C');
            return;
        }
        showToast('📥 آدرس دریافت: ' + formatAddress(currentAddress), '#00c864');
    }

    // =============================================
    // اتصال رویدادها
    // =============================================
    
    if (connectBtn) connectBtn.addEventListener('click', connectWallet);
    if (disconnectBtn) disconnectBtn.addEventListener('click', disconnectWallet);
    if (copyBtn) copyBtn.addEventListener('click', copyAddress);
    if (sendBtn) sendBtn.addEventListener('click', simulateSend);
    if (receiveBtn) receiveBtn.addEventListener('click', simulateReceive);
    if (refreshTxBtn) refreshTxBtn.addEventListener('click', refreshTransactions);

    // =============================================
    // مقداردهی اولیه
    // =============================================
    
    isConnected = false;
    transactions = [];
    updateUI();

    // =============================================
    // استایل اسپینر
    // =============================================
    
    const style = document.createElement('style');
    style.textContent = `
        .spinner {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.15);
            border-top: 2px solid #F40C1C;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .custom-toast {
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('💎 TON Wallet UI Loaded Successfully!');

})();

// =============================================
// بارگذاری اولیه موجودی هدر
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    const balance = getHeaderBalance();
    updateHeaderBalance(balance);
});