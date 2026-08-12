// ===== منوی کشویی پروفایل =====
document.addEventListener("DOMContentLoaded", function () {
  const profileToggle = document.getElementById("profileToggle");
  const profileDropdown = document.getElementById("profileDropdown");
  const profileWrapper = document.querySelector(".profile-wrapper");
  let isOpen = false;
  let hoverTimeout;

  // ===== کلیک روی دکمه پروفایل =====
  profileToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    isOpen = !isOpen;

    if (isOpen) {
      profileDropdown.classList.add("show");
    } else {
      profileDropdown.classList.remove("show");
    }
  });

  // ===== هاور روی دکمه پروفایل =====
  profileToggle.addEventListener("mouseenter", function () {
    clearTimeout(hoverTimeout);
    profileDropdown.classList.add("show");
    isOpen = true;
  });

  // ===== خروج ماوس از دکمه =====
  profileToggle.addEventListener("mouseleave", function () {
    hoverTimeout = setTimeout(() => {
      if (!isOpen) {
        profileDropdown.classList.remove("show");
      }
    }, 300);
  });

  // ===== هاور روی منو =====
  profileDropdown.addEventListener("mouseenter", function () {
    clearTimeout(hoverTimeout);
    profileDropdown.classList.add("show");
    isOpen = true;
  });

  // ===== خروج ماوس از منو =====
  profileDropdown.addEventListener("mouseleave", function () {
    if (!isOpen) {
      profileDropdown.classList.remove("show");
    } else {
      hoverTimeout = setTimeout(() => {
        profileDropdown.classList.remove("show");
        isOpen = false;
      }, 300);
    }
  });

  // ===== کلیک بیرون از منو =====
  document.addEventListener("click", function (e) {
    if (!profileWrapper.contains(e.target)) {
      isOpen = false;
      profileDropdown.classList.remove("show");
    }
  });

  // ===== کلیک روی گزینه‌های منو =====
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      isOpen = false;
      profileDropdown.classList.remove("show");
    });
  });
});

// ===== منوی کشویی زبان =====
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("languageToggle");
  const languageDropdown = document.getElementById("languageDropdown");
  const currentLanguage = document.getElementById("currentLanguage");
  const languageWrapper = document.querySelector(".language-wrapper");
  let isLangOpen = false;
  let langHoverTimeout;

  // ===== کلیک روی دکمه زبان =====
  languageToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    isLangOpen = !isLangOpen;

    if (isLangOpen) {
      languageDropdown.classList.add("show");
      languageToggle.classList.add("active");
    } else {
      languageDropdown.classList.remove("show");
      languageToggle.classList.remove("active");
    }
  });

  // ===== هاور روی دکمه زبان =====
  languageToggle.addEventListener("mouseenter", function () {
    clearTimeout(langHoverTimeout);
    languageDropdown.classList.add("show");
    languageToggle.classList.add("active");
    isLangOpen = true;
  });

  // ===== خروج ماوس از دکمه زبان =====
  languageToggle.addEventListener("mouseleave", function () {
    langHoverTimeout = setTimeout(() => {
      if (!isLangOpen) {
        languageDropdown.classList.remove("show");
        languageToggle.classList.remove("active");
      }
    }, 300);
  });

  // ===== هاور روی منوی زبان =====
  languageDropdown.addEventListener("mouseenter", function () {
    clearTimeout(langHoverTimeout);
    languageDropdown.classList.add("show");
    languageToggle.classList.add("active");
    isLangOpen = true;
  });

  // ===== خروج ماوس از منوی زبان =====
  languageDropdown.addEventListener("mouseleave", function () {
    if (!isLangOpen) {
      languageDropdown.classList.remove("show");
      languageToggle.classList.remove("active");
    } else {
      langHoverTimeout = setTimeout(() => {
        languageDropdown.classList.remove("show");
        languageToggle.classList.remove("active");
        isLangOpen = false;
      }, 300);
    }
  });

  // ===== کلیک بیرون از منوی زبان =====
  document.addEventListener("click", function (e) {
    if (!languageWrapper.contains(e.target)) {
      isLangOpen = false;
      languageDropdown.classList.remove("show");
      languageToggle.classList.remove("active");
    }
  });
});

// ===== تابع تغییر زبان =====
function changeLanguage(langCode, flag, langName) {
  // به‌روزرسانی دکمه اصلی
  const currentLanguage = document.getElementById("currentLanguage");
  currentLanguage.textContent = `${flag} ${langName}`;

  // بستن منو
  const languageDropdown = document.getElementById("languageDropdown");
  const languageToggle = document.getElementById("languageToggle");
  languageDropdown.classList.remove("show");
  languageToggle.classList.remove("active");

  // غیرفعال کردن همه آیتم‌ها
  document.querySelectorAll(".language-item").forEach((item) => {
    item.classList.remove("active-lang");
  });

  // فعال کردن آیتم انتخاب شده
  document.querySelectorAll(".language-item").forEach((item) => {
    if (item.getAttribute("data-lang") === langCode) {
      item.classList.add("active-lang");
    }
  });

  // نمایش پیام تغییر زبان
  console.log(`زبان به ${langName} تغییر یافت`);

  // اینجا می‌تونید منطق تغییر زبان سایت رو پیاده‌سازی کنید
  // مثلاً تغییر متن‌های سایت بر اساس زبان انتخاب شده

  // نمایش پیام به کاربر (اختیاری)
  showToast(`زبان به ${langName} تغییر یافت`);
}

// ===== تابع نمایش پیام (اختیاری) =====
function showToast(message) {
  // ساخت المان toast
  const toast = document.createElement("div");
  toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2d2d3f;
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 99999;
        animation: slideIn 0.3s ease;
        direction: rtl;
    `;
  toast.textContent = message;
  document.body.appendChild(toast);

  // حذف بعد از 3 ثانیه
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// ===== اضافه کردن انیمیشن‌های toast =====
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
