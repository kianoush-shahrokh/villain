// ============================================
// داده‌های VIP (JSON داخل JS)
// ============================================
const vipData = {
    settings: {
      title: "🎉 پکیج‌های ویژه VIP",
      subtitle: "جشنواره کریسمس - تخفیف‌های شگفت‌انگیز",
      countdownText: "⏳ زمان باقی‌مانده:",
      countdownDays: 0,
      customTitle: "✨ پک سفارشی بسازید",
      customDesc: "اگر پک‌های بالا نیاز شما رو برآورده نمی‌کنه، می‌تونید پک خودتون رو بسازید.",
      customBtn: "ساخت پک سفارشی",
      submitBtn: "ثبت سفارش VIP",
      userInfoTitle: "اطلاعات سفارش VIP",
      currency: "TON"
    },
    packages: [
      {
        id: "basic",
        badge: "🔥 پرفروش",
        icon: "🎄",
        title: "پک کریسمس",
        features: [
          "۱۰ عدد ایموجی اختصاصی",
          "۱ عدد لگو حرفه‌ای",
          "۲ عدد بنر تبلیغاتی",
          "پشتیبانی ۲۴/۷",
          "تحویل ۴۸ ساعته"
        ],
        oldPrice: 150,
        newPrice: 99,
        discount: "-34%"
      },
      {
        id: "premium",
        badge: "⭐ ویژه",
        icon: "🎅",
        title: "پک پریمیوم",
        features: [
          "۲۰ عدد ایموجی اختصاصی",
          "۳ عدد لگو حرفه‌ای",
          "۵ عدد بنر تبلیغاتی",
          "۳ عدد تامبنیل اختصاصی",
          "پشتیبانی ۲۴/۷",
          "تحویل ۲۴ ساعته",
          "طراحی اختصاصی"
        ],
        oldPrice: 350,
        newPrice: 199,
        discount: "-43%"
      },
      {
        id: "ultimate",
        badge: "👑 سلطنتی",
        icon: "🤶",
        title: "پک آلتیمیت",
        features: [
          "۵۰ عدد ایموجی اختصاصی",
          "۱۰ عدد لگو حرفه‌ای",
          "۱۵ عدد بنر تبلیغاتی",
          "۱۰ عدد تامبنیل اختصاصی",
          "۵ عدد پست اینستاگرام",
          "پشتیبانی ویژه ۲۴/۷",
          "تحویل ۱۲ ساعته",
          "طراحی اختصاصی + برندینگ",
          "مشاوره رایگان"
        ],
        oldPrice: 800,
        newPrice: 449,
        discount: "-44%"
      }
    ]
  };
  
  // ============================================
  // متغیرهای عمومی
  // ============================================
  let selectedPackage = null;
  
  // ============================================
  // ساخت پک‌ها
  // ============================================
  function renderPackages() {
    const container = document.getElementById('vipPackages');
    if (!container) return;
    
    let html = '';
    
    vipData.packages.forEach(pkg => {
      html += `
        <div class="vip-package" data-package="${pkg.id}">
          <div class="package-badge">${pkg.badge}</div>
          <div class="package-icon">${pkg.icon}</div>
          <h4 class="package-title">${pkg.title}</h4>
          <ul class="package-features">
      `;
      
      pkg.features.forEach(feature => {
        html += `<li>✅ ${feature}</li>`;
      });
      
      html += `
          </ul>
          <div class="package-pricing">
            <span class="old-price">${pkg.oldPrice} ${vipData.settings.currency}</span>
            <span class="new-price">${pkg.newPrice} ${vipData.settings.currency}</span>
            <span class="discount-badge">${pkg.discount}</span>
          </div>
          <button class="vip-order-btn" data-package="${pkg.id}">خرید پک</button>
        </div>
      `;
    });
    
    container.innerHTML = html;
  }
  
  // ============================================
  // تایمر شمارش معکوس
  // ============================================
  function startCountdown() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + vipData.settings.countdownDays);
    endDate.setHours(23, 59, 59, 0);
    
    function updateCountdown() {
      const now = new Date();
      const diff = endDate - now;
      const countdownEl = document.getElementById('countdown');
      
      if (!countdownEl) return;
      
      if (diff <= 0) {
        countdownEl.textContent = 'جشنواره به پایان رسید!';
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      countdownEl.textContent = `${days} روز ${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
  
  // ============================================
  // رویدادها
  // ============================================
  function attachEvents() {
    // دکمه‌های خرید پک
    const orderBtns = document.querySelectorAll('.vip-order-btn');
    const userInfoSection = document.querySelector('.vip-user-info');
    
    orderBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const packageId = this.getAttribute('data-package');
        const packageData = vipData.packages.find(p => p.id === packageId);
        
        if (!packageData) return;
        
        selectedPackage = {
          id: packageData.id,
          title: packageData.title,
          price: packageData.newPrice,
          currency: vipData.settings.currency
        };
        
        if (userInfoSection) {
          userInfoSection.style.display = 'block';
          userInfoSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        localStorage.setItem('selectedVipPackage', JSON.stringify(selectedPackage));
        console.log('پک انتخاب شده:', selectedPackage);
      });
    });
    
    // دکمه پک سفارشی
    const customBtn = document.querySelector('.custom-package-btn');
    if (customBtn) {
      customBtn.addEventListener('click', function() {
        selectedPackage = {
          id: 'custom',
          title: 'پک سفارشی',
          price: 'توافقی',
          currency: vipData.settings.currency
        };
        
        if (userInfoSection) {
          userInfoSection.style.display = 'block';
          userInfoSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        localStorage.setItem('selectedVipPackage', JSON.stringify(selectedPackage));
        console.log('پک سفارشی انتخاب شد');
      });
    }
    
    // دکمه ثبت سفارش
    const submitBtn = document.querySelector('.submit-vip-order');
    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        const userId = document.querySelector('.user-id')?.value || '';
        const description = document.querySelector('.user-description')?.value || '';
        
        const savedPackage = localStorage.getItem('selectedVipPackage');
        const packageData = JSON.parse(savedPackage) || { title: 'نامشخص', price: '۰', currency: 'TON' };
        
        if (!userId.trim()) {
          alert('لطفاً آیدی تلگرام خود را وارد کنید!');
          return;
        }
        
        if (!description.trim()) {
          alert('لطفاً توضیحات خود را وارد کنید!');
          return;
        }
        
        const orderData = {
          package: packageData.title,
          price: `${packageData.price} ${packageData.currency}`,
          userId: userId,
          description: description,
          date: new Date().toLocaleString('fa-IR')
        };
        
        alert(
          '✅ سفارش VIP شما با موفقیت ثبت شد!\n\n' +
          '🎁 پک: ' + orderData.package + '\n' +
          '💰 قیمت: ' + orderData.price + '\n' +
          '🆔 آیدی کاربر: ' + orderData.userId + '\n' +
          '📝 توضیحات: ' + orderData.description + '\n' +
          '📅 تاریخ ثبت: ' + orderData.date
        );
        
        console.log('سفارش VIP:', orderData);
        localStorage.setItem('lastVipOrder', JSON.stringify(orderData));
        
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
    }
  }
  
  // ============================================
  // راه‌اندازی
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    renderPackages();
    startCountdown();
    attachEvents();
    console.log('✅ بخش VIP آماده است!');
  });