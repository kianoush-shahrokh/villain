// انتخاب همه دکمه‌های گزینه‌ها
const optionBtns = document.querySelectorAll('.option-btn');

// اضافه کردن رویداد کلیک به هر دکمه
optionBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // پیدا کردن گروه والد این دکمه
    const parentGroup = this.closest('.option-group');
    
    // حذف کلاس active از همه دکمه‌های هم گروه
    const allBtnsInGroup = parentGroup.querySelectorAll('.option-btn');
    allBtnsInGroup.forEach(b => b.classList.remove('active'));
    
    // اضافه کردن کلاس active به دکمه کلیک شده
    this.classList.add('active');
    
    // دریافت مقدار انتخاب شده
    const selectedValue = this.getAttribute('data-value');
    const selectedText = this.textContent;
    const groupLabel = parentGroup.querySelector('.option-label').textContent;
    
    // نمایش در کنسول (برای تست)
    console.log(`${groupLabel} : ${selectedText} (${selectedValue})`);
  });
});

// مدیریت آپلود فایل
const fileInput = document.getElementById('imageUpload');
const fileList = document.getElementById('fileList');
let uploadedFiles = [];

fileInput.addEventListener('change', function(e) {
  const files = Array.from(this.files);
  
  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`فایل ${file.name} بزرگتر از 5 مگابایت است!`);
      return;
    }
    
    uploadedFiles.push(file);
    displayFile(file);
  });
  
  // ریست کردن input برای آپلود مجدد
  this.value = '';
});

function displayFile(file) {
  const fileItem = document.createElement('div');
  fileItem.className = 'file-item';
  
  const fileName = document.createElement('span');
  fileName.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  
  const removeBtn = document.createElement('span');
  removeBtn.className = 'remove-file';
  removeBtn.textContent = '✕';
  removeBtn.onclick = function() {
    fileItem.remove();
    const index = uploadedFiles.indexOf(file);
    if (index > -1) {
      uploadedFiles.splice(index, 1);
    }
  };
  
  fileItem.appendChild(fileName);
  fileItem.appendChild(removeBtn);
  fileList.appendChild(fileItem);
}

// رویداد کلیک دکمه ثبت سفارش
const submitBtn = document.querySelector('.submit-order');
submitBtn.addEventListener('click', function() {
  // جمع‌آوری همه انتخاب‌ها
  const allSelections = [];
  const activeBtns = document.querySelectorAll('.option-btn.active');
  
  // بررسی انتخاب همه گزینه‌ها (به جز آپلود که اختیاریه)
  const optionGroups = document.querySelectorAll('.option-group:not(:has(#imageUpload)):not(:has(.user-description)):not(:has(.user-id))');
  let allSelected = true;
  
  optionGroups.forEach(group => {
    const hasActive = group.querySelector('.option-btn.active');
    if (!hasActive) {
      allSelected = false;
    }
  });
  
  if (!allSelected) {
    alert('لطفاً همه گزینه‌ها را انتخاب کنید!');
    return;
  }
  
  // گرفتن توضیحات کاربر
  const description = document.querySelector('.user-description').value;
  if (!description.trim()) {
    alert('لطفاً توضیحات خود را وارد کنید!');
    return;
  }
  
  // گرفتن آیدی کاربر
  const userId = document.querySelector('.user-id').value;
  if (!userId.trim()) {
    alert('لطفاً آیدی تلگرام خود را وارد کنید!');
    return;
  }
  
  // جمع‌آوری اطلاعات
  activeBtns.forEach(btn => {
    const groupLabel = btn.closest('.option-group').querySelector('.option-label').textContent;
    const selectedText = btn.textContent;
    const price = btn.getAttribute('data-price');
    if (price) {
      allSelections.push(`${groupLabel} : ${selectedText} (${price} TON)`);
    } else {
      allSelections.push(`${groupLabel} : ${selectedText}`);
    }
  });
  
  // تشخیص زبان انتخاب شده
  let selectedLanguage = 'فارسی';
  const languageBtn = document.querySelector('.option-btn.active[data-value="english"]');
  if (languageBtn) selectedLanguage = 'English';
  const russianBtn = document.querySelector('.option-btn.active[data-value="russian"]');
  if (russianBtn) selectedLanguage = 'Русский';
  const chineseBtn = document.querySelector('.option-btn.active[data-value="chinese"]');
  if (chineseBtn) selectedLanguage = '中文';
  
  // اطلاعات کامل سفارش
  const orderData = {
    selections: allSelections,
    language: selectedLanguage,
    description: description,
    userId: userId,
    files: uploadedFiles.map(f => f.name),
    totalPrice: calculateTotalPrice()
  };
  
  // نمایش پیام موفقیت
  alert(
    '✅ سفارش شما با موفقیت ثبت شد!\n\n' +
    allSelections.join('\n') + '\n\n' +
    '🌐 زبان انتخابی: ' + selectedLanguage + '\n' +
    '📝 توضیحات: ' + description + '\n' +
    '🆔 آیدی کاربر: ' + userId + '\n' +
    '📎 تعداد فایل‌ها: ' + uploadedFiles.length + ' عدد\n' +
    '💰 قیمت کل: ' + orderData.totalPrice + ' TON'
  );
  
  console.log('سفارش تامبنیل:', orderData);
  
  // 🔄 رفرش صفحه بعد از 1 ثانیه
  setTimeout(function() {
    location.reload();
  }, 1000);
});

// محاسبه قیمت کل
function calculateTotalPrice() {
  const activePriceBtn = document.querySelector('.option-btn.active[data-price]');
  if (activePriceBtn) {
    return activePriceBtn.getAttribute('data-price');
  }
  return '0';
}

// درگ و دراپ برای آپلود
const uploadArea = document.querySelector('.upload-area');
uploadArea.addEventListener('dragover', function(e) {
  e.preventDefault();
  this.style.borderColor = '#F40C1C';
  this.style.background = '#1a1a1a';
});

uploadArea.addEventListener('dragleave', function(e) {
  e.preventDefault();
  this.style.borderColor = '#444444';
  this.style.background = '#121212';
});

uploadArea.addEventListener('drop', function(e) {
  e.preventDefault();
  this.style.borderColor = '#444444';
  this.style.background = '#121212';
  
  const files = Array.from(e.dataTransfer.files);
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      if (file.size <= 5 * 1024 * 1024) {
        uploadedFiles.push(file);
        displayFile(file);
      } else {
        alert(`فایل ${file.name} بزرگتر از 5 مگابایت است!`);
      }
    }
  });
});




































