// ===== مدیریت سکشن 2 =====
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.selection-card');
    const packageInput = document.getElementById('packageName');
    const confirmBtn = document.querySelector('.btn-confirm');
    let selectedType = null;
    
    // انتخاب کارت
    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedType = this.dataset.type;
            console.log(' انتخاب شد:', selectedType);
        });
    });
    
    // دکمه تایید
    confirmBtn.addEventListener('click', function() {
        const packageName = packageInput.value.trim();
        
        if (!selectedType) {
            alert(getTranslation('package_select_error') || 'Please select a package type!');
            return;
        }
        
        if (!packageName) {
            alert(getTranslation('package_name_error') || 'Please enter a package name!');
            return;
        }
        
        // ذخیره اطلاعات و انتقال به بخش ساخت پک
        const packageData = {
            type: selectedType,
            name: packageName
        };
        
        console.log('✅ اطلاعات پک:', packageData);
        
        // انتقال به بخش بعدی
        // اینجا می‌توانید به بخش ساخت پک بروید
        // window.location.href = '#packageBuilder';
        // یا نمایش پیام موفقیت
        alert(getTranslation('package_success') || ' Package created successfully!');
    });
    
    // Enter key برای ورودی
    packageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            confirmBtn.click();
        }
    });
});