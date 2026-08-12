// ========== مدیریت زبان و ترجمه ==========

let currentLanguage = 'en'; // زبان پیش‌فرض انگلیسی

// ========== دیتابیس ترجمه‌ها (داخل خود جاوااسکریپت) ==========
const translations = {
    en: {
        // ===== صفحه اصلی (index.html) =====
        page_title: 'Home',
        user_label: 'Dear User',
        user_info: 'User Information',
        user_orders: 'User Orders',
        gifts_rewards: 'Gifts & Rewards',
        logout: 'Logout',
        design_order: 'Design Order',
        design_desc: 'Professional graphic design, logo, etc...',
        auto_order: 'Automatic Order',
        auto_desc: 'Fast and automatic order processing',
        portfolio: 'Portfolio',
        home: 'Home',
        gifts: 'Gifts',
        
        // ===== صفحه سفارش اتوماتیک (Automatic-order.html) =====
        page_title_auto: 'Automatic Order',
        filter_all: 'All',
        filter_special: 'Special',
        filter_gift: 'Gifts',
        filter_flag: 'Flag',
        filter_other: 'Other',
        product1_name: 'Product Name',
        product2_name: 'Product Name',
        product3_name: 'Product Name',
        add_to_cart: '🛒',
        add_to_cart_modal: 'Add to Cart',
        cancel: 'Cancel',
        product_name: 'Product Name',
        
        // ===== صفحه سفارش طراحی (Design-order.html) - نسخه اول =====
        page_title_design: 'Design Order',
        design_settings: 'Banner Design Settings',
        banner_platform: 'Banner Platform:',
        platform_instagram: 'Instagram',
        platform_telegram: 'Telegram',
        platform_youtube: 'YouTube',
        platform_advertising: 'Advertising',
        text_type: 'Text Type:',
        text_persian: 'Persian',
        text_english: 'English',
        text_russian: 'Russian',
        text_chinese: 'Chinese',
        text_mixed: 'Mixed',
        banner_size: 'Banner Size:',
        size_small: 'Small',
        size_medium: 'Medium',
        size_large: 'Large',
        size_custom: 'Custom',
        color_scheme: 'Color Scheme:',
        color_warm: 'Warm',
        color_cool: 'Cool',
        color_neutral: 'Neutral',
        color_glamorous: 'Glamorous',
        color_custom: 'Custom',
        order_level: 'Order Level:',
        level_normal: 'Normal - 12 TON',
        level_vip: 'VIP - 30 TON',
        level_pro: 'Pro - 55 TON',
        upload_image: 'Upload Image or Icon (Optional):',
        upload_click: 'Click to upload or drag files',
        additional_info: 'Additional Description:',
        description_placeholder: 'Write your banner design description...',
        telegram_id: 'Enter your Telegram ID:',
        telegram_placeholder: 'Example: @username or ID number',
        submit_order: 'Submit Banner Design Order',
        
        // ===== صفحه طراحی (Design-order.html) - نسخه جدید با باکس‌ها =====
        page_title_design_new: 'Design Order',
        products_title: 'Products',
        products_subtitle: 'View our professional services',
        service_thumbnail: 'Thumbnail Design',
        service_logo: 'Logo Design',
        service_post: 'Post Design',
        service_banner: 'Banner Design',
        service_emoji: 'Emoji Design',
        service_vip: 'VIP',
        
        // ===== صفحه هدایا (bonus.html) =====
        page_title_bonus: 'Gifts',
        silver_box: 'Silver Box',
        gold_box: 'Gold Box',
        diamond_box: 'Diamond Box',
        legendary_box: 'Legendary Box',
        
        // ===== صفحه نقره‌ای (silver.html) =====
        page_title_silver: 'Silver Box',
        spin_wheel: 'Spin the Wheel of Luck',
        spin_button: 'Spin the Wheel',
        winner_label: '🏆 You won:',
        waiting_message: 'Waiting for your click!',
        attempts: '🎯 Attempts:',
        last_winner: '🏆 Last Winner:',
        reset: '🔄 Reset',
        contact_admin: '📨 Contact Admin',
        enter_telegram_id: 'Enter your Telegram ID',
        telegram_hint: 'Enter your ID to receive the prize',
        send_id: 'Send ID',
        contact_admin_title: 'Contact Admin',
        message_admin: 'Message Admin',
        admin_hint: 'Message the admin to receive your prize',
        congrats: 'Congratulations!',
        you_won: 'You won!',
        modal_instruction1: 'Message the admin to receive your prize',
        modal_instruction2: 'And enter your ID',
        
        // ===== صفحه ایموجی (Emoji.html) =====
        page_title_emoji: 'Emoji Design',
        emoji_settings: 'Emoji Design Settings',
        emoji_style: 'Emoji Style:',
        style_cartoon: 'Cartoon',
        style_realistic: 'Realistic',
        style_minimal: 'Minimal',
        style_3d: '3D',
        style_neon: 'Neon',
        style_watermark: 'Watermark',
        style_animated: 'Animated',
        color_happy: 'Happy',
        color_dark: 'Dark',
        color_colorful: 'Colorful',
        color_natural: 'Natural',
        emoji_count: 'Number of Emojis:',
        count_1: '1',
        count_2: '2',
        count_3: '3',
        count_5: '5',
        count_more: 'More',
        level_normal_emoji: 'Normal - 5 TON',
        level_vip_emoji: 'VIP - 15 TON',
        level_pro_emoji: 'Pro - 30 TON',
        emoji_description_placeholder: 'Write your emoji design description...',
        submit_emoji_order: 'Submit Emoji Design Order',

        // در بخش en (انگلیسی):
        page_title_logo: 'Logo Design',
        logo_settings: 'Logo Design Settings',
        logo_style: 'Logo Style:',
        style_iconic: 'Iconic',
        style_typography: 'Typography',
        style_minimal: 'Minimal',
        style_3d_logo: '3D',
        style_mascot: 'Mascot',
        style_mixed: 'Mixed',
        style_luxury: 'Luxury',
        color_mono: 'Monochrome',
        color_multi: 'Multi Color',
        color_gradient: 'Gradient',
        logo_size: 'Logo Size:',
        level_normal_logo: 'Normal - 15 TON',
        level_vip_logo: 'VIP - 35 TON',
        level_pro_logo: 'Pro - 60 TON',
        logo_description_placeholder: 'Write your logo design description...',
        submit_logo_order: 'Submit Logo Design Order',
        // در بخش en (انگلیسی):
        page_title_post: 'Post Design',
        post_settings: 'Post Design Settings',
        post_type: 'Post Type:',
        post_story: 'Story',
        post_cover: 'Cover',
        post_instagram: 'Instagram',
        post_advertising: 'Advertising',
        color_attractive: 'Attractive',
        image_count: 'Number of Images:',
        level_normal_post: 'Normal - 8 TON',
        level_vip_post: 'VIP - 20 TON',
        level_pro_post: 'Pro - 40 TON',
        post_description_placeholder: 'Write your post design description...',
        submit_post_order: 'Submit Post Design Order',
        // در بخش en (انگلیسی):
        page_title_cart: 'Shopping Cart',
        cart_title: '🛒 Shopping Cart',
        cart_subtitle: 'View and manage your selected products',
        total_label: 'Total:',
        checkout_btn: 'Checkout',
        // در بخش en (انگلیسی):
        page_title_thumbnail: 'Thumbnail Design',
        thumbnail_settings: 'Thumbnail Settings',
        thumbnail_style: 'Thumbnail Style:',
        style_vlog: 'Vlog',
        style_fact: 'Fact',
        style_gaming: 'Gaming',
        style_manhwa: 'Manhwa',
        style_horror: 'Horror',
        thumbnail_size: 'Thumbnail Size:',
        size_720p: '1280x720',
        size_1080p: '1920x1080',
        size_square: '720x720',
        level_normal_thumb: 'Normal - 10 TON',
        level_vip_thumb: 'VIP - 25 TON',
        level_pro_thumb: 'Pro - 50 TON',
        thumbnail_description_placeholder: 'Write your thumbnail design description...',
        submit_thumbnail_order: 'Submit Thumbnail Order',
        // در بخش en (انگلیسی):
        page_title_ton: 'Wallet',
        wallet_title: 'Wallet TON',
        badge_disconnected: 'Disconnected',
        connect_wallet_text: 'Connect your wallet',
        connect_wallet_sub: 'To view balance and transactions',
        connect_btn: '🔗 Connect Wallet',
        mainnet: 'Mainnet',
        disconnect_btn: '🔌 Disconnect',
        actions_title: 'Actions',
        badge_fast: 'Fast',
        send_btn: '📤 Send',
        receive_btn: '📥 Receive',
        action_hint: 'Connect wallet to activate',
        transactions_title: 'Recent Transactions',
        tx_send: '📤 Sent to ...',
        tx_receive: '📥 Received from ...',
        tx_staking: '🔄 Staking',
        tx_date_1: '2 minutes ago',
        tx_date_2: '1 hour ago',
        tx_date_3: '3 hours ago',
        tx_confirm: 'Confirmed',
        tx_pending: 'Pending',
        refresh_btn: '🔄 Refresh Transactions',
        status_label: 'Status:',
        status_disconnected: '🔴 Disconnected',
        version_label: 'Interface Version:',
        // در بخش en (انگلیسی):
        page_title_user: 'User Information',
        user_avatar: 'User',
        user_name: 'John Doe',
        user_email: '📧 Email:',
        user_member: '📅 Member since:',
        stat_purchases: 'Purchases',
        stat_pending: 'Pending',
        stat_downloaded: 'Downloaded',
        purchased_products: '📦 Purchased Products',
        support_title: 'Contact Support',
        support_desc: 'For questions, issues or further guidance, contact the admin',
        contact_admin_btn: '📨 Contact Admin on Telegram',
        support_hours: '🕐 Support: 24/7',
        response_time: '⚡ Response time: Less than 1 hour',
        // در بخش en (انگلیسی):
        page_title_vip: 'VIP Packages',
        vip_title: '🎉 VIP Special Packages',
        vip_subtitle: 'Christmas Festival - Amazing Discounts',
        time_left: '⏳ Time Left:',
        countdown_text: '5 days 14 hours 30 minutes',
        custom_package_title: '✨ Create Custom Package',
        custom_package_desc: 'If the packages above don\'t meet your needs, you can create your own package.',
        custom_package_btn: 'Create Custom Package',
        vip_description_placeholder: 'Write your specific needs...',
        submit_vip_order: 'Submit VIP Order',
        package_builder_title: 'Build Your Package',
        package_builder_subtitle: 'Choose your preferred design type',
        package_sticker: 'Sticker Package',
        package_sticker_desc: 'Animated large stickers for chat',
        package_emoji: 'Emoji Package',
        package_emoji_desc: 'Small emojis inside messages',
        package_name_placeholder: 'Enter your package name...',
        package_confirm: 'Confirm ✓',
        package_select_error: 'Please select a package type!',
        package_name_error: 'Please enter a package name!',
        package_success: '✅ Package created successfully!',
    },
    
    fa: {
        // ===== صفحه اصلی (index.html) =====
        page_title: 'صفحه اصلی',
        user_label: 'کاربر عزیز',
        user_info: 'اطلاعات کاربر',
        user_orders: 'سفارشات کاربر',
        gifts_rewards: 'هدایا و جوایز',
        logout: 'خروج',
        design_order: 'سفارش طراحی',
        design_desc: 'طراحی حرفه‌ای گرافیک، لوگو و...',
        auto_order: 'سفارش اتوماتیک',
        auto_desc: 'پردازش خودکار و سریع سفارشات',
        portfolio: 'نمومنه کار',
        home: 'خانه',
        gifts: 'هدایا',
        
        // ===== صفحه سفارش اتوماتیک (Automatic-order.html) =====
        page_title_auto: 'سفارش اتوماتیک',
        filter_all: 'همه',
        filter_special: 'ویژه',
        filter_gift: 'هدایا',
        filter_flag: 'پرچم',
        filter_other: 'سایر',
        product1_name: 'نام محصول',
        product2_name: 'نام محصول',
        product3_name: 'نام محصول',
        add_to_cart: '🛒',
        add_to_cart_modal: 'افزودن به سبد خرید',
        cancel: 'لغو',
        product_name: 'نام محصول',
        
        // ===== صفحه سفارش طراحی (Design-order.html) - نسخه اول =====
        page_title_design: 'سفارش طراحی',
        design_settings: 'تنظیمات طراحی بنر',
        banner_platform: 'پلتفرم بنر:',
        platform_instagram: 'اینستاگرام',
        platform_telegram: 'تلگرام',
        platform_youtube: 'یوتیوب',
        platform_advertising: 'تبلیغات',
        text_type: 'نوع نوشته:',
        text_persian: 'فارسی',
        text_english: 'English',
        text_russian: 'Русский',
        text_chinese: '中文',
        text_mixed: 'ترکیبی',
        banner_size: 'سایز بنر:',
        size_small: 'کوچک',
        size_medium: 'متوسط',
        size_large: 'بزرگ',
        size_custom: 'سفارشی',
        color_scheme: 'رنگ‌بندی:',
        color_warm: 'گرم',
        color_cool: 'سرد',
        color_neutral: 'خنثی',
        color_glamorous: 'پر زرق و برق',
        color_custom: 'دلخواه کاربر',
        order_level: 'سطح سفارش:',
        level_normal: 'عادی - 12 TON',
        level_vip: 'ویژه - 30 TON',
        level_pro: 'حرفه‌ای - 55 TON',
        upload_image: 'آپلود تصویر یا آیکون (اختیاری):',
        upload_click: 'برای آپلود کلیک کنید یا فایل را بکشید',
        additional_info: 'توضیحات تکمیلی:',
        description_placeholder: 'توضیحات خود را برای طراحی بنر بنویسید...',
        telegram_id: 'آیدی تلگرام خود را وارد کنید:',
        telegram_placeholder: 'مثال: @username یا ID شماره‌ای',
        submit_order: 'ثبت سفارش طراحی بنر',
        
        // ===== صفحه طراحی (Design-order.html) - نسخه جدید با باکس‌ها =====
        page_title_design_new: 'سفارش طراحی',
        products_title: 'محصولات',
        products_subtitle: 'خدمات تخصصی ما را مشاهده کنید',
        service_thumbnail: 'طراحی تامبنیل',
        service_logo: 'طراحی لگو',
        service_post: 'طراحی پست',
        service_banner: 'طراحی بنر',
        service_emoji: 'طراحی ایموجی',
        service_vip: 'VIP',
        
        // ===== صفحه هدایا (bonus.html) =====
        page_title_bonus: 'هدایا',
        silver_box: 'باکس نقره‌ای',
        gold_box: 'باکس طلایی',
        diamond_box: 'باکس الماسی',
        legendary_box: 'باکس لجندری',
        
        // ===== صفحه نقره‌ای (silver.html) =====
        page_title_silver: 'باکس نقره‌ای',
        spin_wheel: 'چرخانه شانس',
        spin_button: 'چرخش شانس',
        winner_label: '🏆 برنده شدید:',
        waiting_message: 'منتظر کلیک شما هستیم!',
        attempts: '🎯 دفعات شرکت:',
        last_winner: '🏆 آخرین برنده:',
        reset: '🔄 ریست',
        contact_admin: '📨 ارتباط با ادمین',
        enter_telegram_id: 'آیدی تلگرام خود را وارد کنید',
        telegram_hint: 'برای دریافت جایزه، آیدی خود را وارد کنید',
        send_id: 'ارسال آیدی',
        contact_admin_title: 'ارتباط با ادمین',
        message_admin: 'پیام به ادمین',
        admin_hint: 'برای دریافت جایزه به ادمین پیام دهید',
        congrats: 'تبریک!',
        you_won: 'شما برنده شدید!',
        modal_instruction1: 'برای دریافت جایزه به ادمین پیام دهید',
        modal_instruction2: 'و ایدی خود را وارد کنید',
        
        // ===== صفحه ایموجی (Emoji.html) =====
        page_title_emoji: 'طراحی ایموجی',
        emoji_settings: 'تنظیمات طراحی ایموجی',
        emoji_style: 'سبک ایموجی:',
        style_cartoon: 'کارتونی',
        style_realistic: 'واقع‌گرا',
        style_minimal: 'مینیمال',
        style_3d: 'سه بعدی',
        style_neon: 'نئون',
        style_watermark: 'واترمارک',
        style_animated: 'انیمیشنی',
        color_happy: 'شاد',
        color_dark: 'تیره',
        color_colorful: 'رنگارنگ',
        color_natural: 'طبیعی',
        emoji_count: 'تعداد ایموجی:',
        count_1: '۱ عدد',
        count_2: '۲ عدد',
        count_3: '۳ عدد',
        count_5: '۵ عدد',
        count_more: 'بیشتر',
        level_normal_emoji: 'عادی - 5 TON',
        level_vip_emoji: 'ویژه - 15 TON',
        level_pro_emoji: 'حرفه‌ای - 30 TON',
        emoji_description_placeholder: 'توضیحات خود را برای طراحی ایموجی بنویسید...',
        submit_emoji_order: 'ثبت سفارش طراحی ایموجی',
        // در بخش fa (فارسی):
        page_title_logo: 'طراحی لگو',
        logo_settings: 'تنظیمات طراحی لگو',
        logo_style: 'سبک لگو:',
        style_iconic: 'آیکونی',
        style_typography: 'تایپوگرافی',
        style_minimal: 'مینیمال',
        style_3d_logo: 'سه بعدی',
        style_mascot: 'مسکات',
        style_mixed: 'ترکیبی',
        style_luxury: 'لوکس',
        color_mono: 'تک رنگ',
        color_multi: 'چند رنگ',
        color_gradient: 'گرادینت',
        logo_size: 'سایز لگو:',
        level_normal_logo: 'عادی - 15 TON',
        level_vip_logo: 'ویژه - 35 TON',
        level_pro_logo: 'حرفه‌ای - 60 TON',
        logo_description_placeholder: 'توضیحات خود را برای طراحی لگو بنویسید...',
        submit_logo_order: 'ثبت سفارش طراحی لگو',
        // در بخش fa (فارسی):
        page_title_post: 'طراحی پست',
        post_settings: 'تنظیمات طراحی پست',
        post_type: 'نوع پست:',
        post_story: 'استوری',
        post_cover: 'کاور',
        post_instagram: 'اینستاگرام',
        post_advertising: 'تبلیغاتی',
        color_attractive: 'جذاب',
        image_count: 'تعداد تصویر:',
        level_normal_post: 'عادی - 8 TON',
        level_vip_post: 'ویژه - 20 TON',
        level_pro_post: 'حرفه‌ای - 40 TON',
        post_description_placeholder: 'توضیحات خود را برای طراحی پست بنویسید...',
        submit_post_order: 'ثبت سفارش طراحی پست',
        // در بخش fa (فارسی):
        page_title_cart: 'سبد خرید',
        cart_title: '🛒 سبد خرید',
        cart_subtitle: 'محصولات انتخاب شده خود را مشاهده و مدیریت کنید',
        total_label: 'جمع کل:',
        checkout_btn: 'پرداخت',
        // در بخش fa (فارسی):
        page_title_thumbnail: 'طراحی تامبنیل',
        thumbnail_settings: 'تنظیمات تامبنیل',
        thumbnail_style: 'سبک تامبنیل:',
        style_vlog: 'ولاگ',
        style_fact: 'فکت',
        style_gaming: 'گیمینگ',
        style_manhwa: 'مانهوا',
        style_horror: 'ترسناک',
        thumbnail_size: 'سایز تامبنیل:',
        size_720p: '1280x720',
        size_1080p: '1920x1080',
        size_square: '720x720',
        level_normal_thumb: 'عادی - 10 TON',
        level_vip_thumb: 'ویژه - 25 TON',
        level_pro_thumb: 'حرفه‌ای - 50 TON',
        thumbnail_description_placeholder: 'توضیحات خود را برای تامبنیل بنویسید...',
        submit_thumbnail_order: 'ثبت سفارش تامبنیل',
        // در بخش fa (فارسی):
        page_title_ton: 'کیف پول',
        wallet_title: 'کیف پول TON',
        badge_disconnected: 'قطع',
        connect_wallet_text: 'ولت خود را متصل کنید',
        connect_wallet_sub: 'برای مشاهده موجودی و تراکنش‌ها',
        connect_btn: '🔗 اتصال به ولت',
        mainnet: 'شبکه اصلی (Mainnet)',
        disconnect_btn: '🔌 قطع اتصال',
        actions_title: 'عملیات',
        badge_fast: 'سریع',
        send_btn: '📤 ارسال',
        receive_btn: '📥 دریافت',
        action_hint: 'برای فعال‌سازی، ولت را متصل کنید',
        transactions_title: 'تراکنش‌های اخیر',
        tx_send: '📤 ارسال به ...',
        tx_receive: '📥 دریافت از ...',
        tx_staking: '🔄 استیکینگ',
        tx_date_1: '۲ دقیقه پیش',
        tx_date_2: '۱ ساعت پیش',
        tx_date_3: '۳ ساعت پیش',
        tx_confirm: 'تأیید',
        tx_pending: 'در انتظار',
        refresh_btn: '🔄 بروزرسانی تراکنش‌ها',
        status_label: 'وضعیت:',
        status_disconnected: '🔴 قطع',
        version_label: 'نسخه رابط:',
        // در بخش fa (فارسی):
        page_title_user: 'اطلاعات کاربر',
        user_avatar: 'کاربر',
        user_name: 'کاربر عزیز',
        user_email: '📧 ایمیل:',
        user_member: '📅 عضو از:',
        stat_purchases: 'خرید',
        stat_pending: 'در انتظار',
        stat_downloaded: 'دانلود شده',
        purchased_products: '📦 محصولات خریداری شده',
        support_title: 'ارتباط با پشتیبانی',
        support_desc: 'برای سوالات، مشکلات یا راهنمایی بیشتر، با ادمین در ارتباط باشید',
        contact_admin_btn: '📨 ارتباط با ادمین در تلگرام',
        support_hours: '🕐 پاسخگویی: ۲۴ ساعته',
        response_time: '⚡ زمان پاسخ: کمتر از ۱ ساعت',
        // در بخش fa (فارسی):
        page_title_vip: 'پکیج‌های ویژه VIP',
        vip_title: '🎉 پکیج‌های ویژه VIP',
        vip_subtitle: 'جشنواره کریسمس - تخفیف‌های شگفت‌انگیز',
        time_left: '⏳ زمان باقی‌مانده:',
        countdown_text: '5 روز 14 ساعت 30 دقیقه',
        custom_package_title: '✨ پک سفارشی بسازید',
        custom_package_desc: 'اگر پک‌های بالا نیاز شما رو برآورده نمی‌کنه، می‌تونید پک خودتون رو بسازید.',
        custom_package_btn: 'ساخت پک سفارشی',
        vip_description_placeholder: 'نیازهای خاص خود را بنویسید...',
        submit_vip_order: 'ثبت سفارش VIP',
        package_builder_title: 'ساخت پک خود',
        package_builder_subtitle: 'نوع طراحی مورد نظر خود را انتخاب کنید',
        package_sticker: 'پک استیکر',
        package_sticker_desc: 'استیکرهای انمیشنی بزرگ برای چت',
        package_emoji: 'پک ایموجی',
        package_emoji_desc: 'ایموجی‌های کوچیک داخل پیام‌ها',
        package_name_placeholder: 'اسم پک مورد نیاز خود را وارد کنید...',
        package_confirm: 'تایید ✓',
        package_select_error: 'لطفاً یک نوع پک انتخاب کنید!',
        package_name_error: 'لطفاً اسم پک را وارد کنید!',
        package_success: '✅ پک با موفقیت ساخته شد!',
    },
    
    ru: {
        // ===== صفحه اصلی (index.html) =====
        page_title: 'Главная',
        user_label: 'Уважаемый пользователь',
        user_info: 'Информация пользователя',
        user_orders: 'Заказы пользователя',
        gifts_rewards: 'Подарки и награды',
        logout: 'Выйти',
        design_order: 'Заказ дизайна',
        design_desc: 'Профессиональный графический дизайн, логотип и...',
        auto_order: 'Автоматический заказ',
        auto_desc: 'Быстрая и автоматическая обработка заказов',
        portfolio: 'Портфолио',
        home: 'Главная',
        gifts: 'Подарки',
        
        // ===== صفحه سفارش اتوماتیک (Automatic-order.html) =====
        page_title_auto: 'Автоматический заказ',
        filter_all: 'Все',
        filter_special: 'Специальные',
        filter_gift: 'Подарки',
        filter_flag: 'Флаг',
        filter_other: 'Другое',
        product1_name: 'Название товара',
        product2_name: 'Название товара',
        product3_name: 'Название товара',
        add_to_cart: '🛒',
        add_to_cart_modal: 'Добавить в корзину',
        cancel: 'Отмена',
        product_name: 'Название товара',
        
        // ===== صفحه سفارش طراحی (Design-order.html) - نسخه اول =====
        page_title_design: 'Заказ дизайна',
        design_settings: 'Настройки дизайна баннера',
        banner_platform: 'Платформа баннера:',
        platform_instagram: 'Instagram',
        platform_telegram: 'Telegram',
        platform_youtube: 'YouTube',
        platform_advertising: 'Реклама',
        text_type: 'Тип текста:',
        text_persian: 'Персидский',
        text_english: 'English',
        text_russian: 'Русский',
        text_chinese: '中文',
        text_mixed: 'Смешанный',
        banner_size: 'Размер баннера:',
        size_small: 'Маленький',
        size_medium: 'Средний',
        size_large: 'Большой',
        size_custom: 'Пользовательский',
        color_scheme: 'Цветовая схема:',
        color_warm: 'Тёплая',
        color_cool: 'Холодная',
        color_neutral: 'Нейтральная',
        color_glamorous: 'Гламурная',
        color_custom: 'Пользовательская',
        order_level: 'Уровень заказа:',
        level_normal: 'Обычный - 12 TON',
        level_vip: 'VIP - 30 TON',
        level_pro: 'Про - 55 TON',
        upload_image: 'Загрузить изображение или иконку (необязательно):',
        upload_click: 'Нажмите для загрузки или перетащите файлы',
        additional_info: 'Дополнительное описание:',
        description_placeholder: 'Напишите описание дизайна баннера...',
        telegram_id: 'Введите ваш Telegram ID:',
        telegram_placeholder: 'Пример: @username или ID номер',
        submit_order: 'Отправить заказ на дизайн баннера',
        
        // ===== صفحه طراحی (Design-order.html) - نسخه جدید با باکس‌ها =====
        page_title_design_new: 'Заказ дизайна',
        products_title: 'Продукты',
        products_subtitle: 'Посмотрите наши профессиональные услуги',
        service_thumbnail: 'Дизайн миниатюры',
        service_logo: 'Дизайн логотипа',
        service_post: 'Дизайн поста',
        service_banner: 'Дизайн баннера',
        service_emoji: 'Дизайн эмодзи',
        service_vip: 'VIP',
        
        // ===== صفحه هدایا (bonus.html) =====
        page_title_bonus: 'Подарки',
        silver_box: 'Серебряный бокс',
        gold_box: 'Золотой бокс',
        diamond_box: 'Алмазный бокс',
        legendary_box: 'Легендарный бокс',
        
        // ===== صفحه نقره‌ای (silver.html) =====
        page_title_silver: 'Серебряный бокс',
        spin_wheel: 'Колесо удачи',
        spin_button: 'Крутить колесо',
        winner_label: '🏆 Вы выиграли:',
        waiting_message: 'Ждем вашего клика!',
        attempts: '🎯 Попыток:',
        last_winner: '🏆 Последний победитель:',
        reset: '🔄 Сброс',
        contact_admin: '📨 Связаться с администратором',
        enter_telegram_id: 'Введите ваш Telegram ID',
        telegram_hint: 'Введите свой ID для получения приза',
        send_id: 'Отправить ID',
        contact_admin_title: 'Связаться с администратором',
        message_admin: 'Сообщение администратору',
        admin_hint: 'Напишите администратору для получения приза',
        congrats: 'Поздравляем!',
        you_won: 'Вы выиграли!',
        modal_instruction1: 'Напишите администратору для получения приза',
        modal_instruction2: 'И введите свой ID',
        
        // ===== صفحه ایموجی (Emoji.html) =====
        page_title_emoji: 'Дизайн эмодзи',
        emoji_settings: 'Настройки дизайна эмодзи',
        emoji_style: 'Стиль эмодзи:',
        style_cartoon: 'Мультяшный',
        style_realistic: 'Реалистичный',
        style_minimal: 'Минималистичный',
        style_3d: '3D',
        style_neon: 'Неоновый',
        style_watermark: 'Водяной знак',
        style_animated: 'Анимированный',
        color_happy: 'Радостная',
        color_dark: 'Тёмная',
        color_colorful: 'Яркая',
        color_natural: 'Натуральная',
        emoji_count: 'Количество эмодзи:',
        count_1: '1',
        count_2: '2',
        count_3: '3',
        count_5: '5',
        count_more: 'Больше',
        level_normal_emoji: 'Обычный - 5 TON',
        level_vip_emoji: 'VIP - 15 TON',
        level_pro_emoji: 'Про - 30 TON',
        emoji_description_placeholder: 'Напишите описание дизайна эмодзи...',
        submit_emoji_order: 'Отправить заказ на дизайн эмодзи',
        // در بخش ru (روسی):
        page_title_logo: 'Дизайн логотипа',
        logo_settings: 'Настройки дизайна логотипа',
        logo_style: 'Стиль логотипа:',
        style_iconic: 'Иконичный',
        style_typography: 'Типографика',
        style_minimal: 'Минималистичный',
        style_3d_logo: '3D',
        style_mascot: 'Маскот',
        style_mixed: 'Смешанный',
        style_luxury: 'Люкс',
        color_mono: 'Монохромный',
        color_multi: 'Многоцветный',
        color_gradient: 'Градиент',
        logo_size: 'Размер логотипа:',
        level_normal_logo: 'Обычный - 15 TON',
        level_vip_logo: 'VIP - 35 TON',
        level_pro_logo: 'Про - 60 TON',
        logo_description_placeholder: 'Напишите описание дизайна логотипа...',
        submit_logo_order: 'Отправить заказ на дизайн логотипа',
        // در بخش ru (روسی):
        page_title_post: 'Дизайн поста',
        post_settings: 'Настройки дизайна поста',
        post_type: 'Тип поста:',
        post_story: 'История',
        post_cover: 'Обложка',
        post_instagram: 'Instagram',
        post_advertising: 'Реклама',
        color_attractive: 'Привлекательный',
        image_count: 'Количество изображений:',
        level_normal_post: 'Обычный - 8 TON',
        level_vip_post: 'VIP - 20 TON',
        level_pro_post: 'Про - 40 TON',
        post_description_placeholder: 'Напишите описание дизайна поста...',
        submit_post_order: 'Отправить заказ на дизайн поста',
        // در بخش ru (روسی):
        page_title_cart: 'Корзина',
        cart_title: '🛒 Корзина',
        cart_subtitle: 'Просмотр и управление выбранными товарами',
        total_label: 'Итого:',
        checkout_btn: 'Оплатить',
        // در بخش ru (روسی):
        page_title_thumbnail: 'Дизайн миниатюры',
        thumbnail_settings: 'Настройки миниатюры',
        thumbnail_style: 'Стиль миниатюры:',
        style_vlog: 'Влог',
        style_fact: 'Факт',
        style_gaming: 'Гейминг',
        style_manhwa: 'Манхва',
        style_horror: 'Хоррор',
        thumbnail_size: 'Размер миниатюры:',
        size_720p: '1280x720',
        size_1080p: '1920x1080',
        size_square: '720x720',
        level_normal_thumb: 'Обычный - 10 TON',
        level_vip_thumb: 'VIP - 25 TON',
        level_pro_thumb: 'Про - 50 TON',
        thumbnail_description_placeholder: 'Напишите описание дизайна миниатюры...',
        submit_thumbnail_order: 'Отправить заказ на дизайн миниатюры',
        // در بخش ru (روسی):
        page_title_ton: 'Кошелек',
        wallet_title: 'Кошелек TON',
        badge_disconnected: 'Отключен',
        connect_wallet_text: 'Подключите ваш кошелек',
        connect_wallet_sub: 'Для просмотра баланса и транзакций',
        connect_btn: '🔗 Подключить кошелек',
        mainnet: 'Основная сеть (Mainnet)',
        disconnect_btn: '🔌 Отключить',
        actions_title: 'Действия',
        badge_fast: 'Быстро',
        send_btn: '📤 Отправить',
        receive_btn: '📥 Получить',
        action_hint: 'Подключите кошелек для активации',
        transactions_title: 'Последние транзакции',
        tx_send: '📤 Отправлено ...',
        tx_receive: '📥 Получено от ...',
        tx_staking: '🔄 Стейкинг',
        tx_date_1: '2 минуты назад',
        tx_date_2: '1 час назад',
        tx_date_3: '3 часа назад',
        tx_confirm: 'Подтверждено',
        tx_pending: 'В ожидании',
        refresh_btn: '🔄 Обновить транзакции',
        status_label: 'Статус:',
        status_disconnected: '🔴 Отключен',
        version_label: 'Версия интерфейса:',
        
        // در بخش ru (روسی):
        page_title_user: 'Информация пользователя',
        user_avatar: 'Пользователь',
        user_name: 'Иван Иванов',
        user_email: '📧 Email:',
        user_member: '📅 Участник с:',
        stat_purchases: 'Покупки',
        stat_pending: 'В ожидании',
        stat_downloaded: 'Загружено',
        purchased_products: '📦 Купленные товары',
        support_title: 'Связаться с поддержкой',
        support_desc: 'По вопросам, проблемам или дополнительной помощи свяжитесь с администратором',
        contact_admin_btn: '📨 Связаться с администратором в Telegram',
        support_hours: '🕐 Поддержка: 24/7',
        response_time: '⚡ Время ответа: менее 1 часа',
        // در بخش ru (روسی):
        page_title_vip: 'VIP пакеты',
        vip_title: '🎉 VIP специальные пакеты',
        vip_subtitle: 'Рождественский фестиваль - Удивительные скидки',
        time_left: '⏳ Осталось времени:',
        countdown_text: '5 дней 14 часов 30 минут',
        custom_package_title: '✨ Создать пользовательский пакет',
        custom_package_desc: 'Если пакеты выше не соответствуют вашим потребностям, вы можете создать свой собственный пакет.',
        custom_package_btn: 'Создать пользовательский пакет',
        vip_description_placeholder: 'Напишите свои конкретные потребности...',
        submit_vip_order: 'Отправить VIP заказ',
        package_builder_title: 'Создайте свой пакет',
        package_builder_subtitle: 'Выберите предпочтительный тип дизайна',
        package_sticker: 'Пакет стикеров',
        package_sticker_desc: 'Анимированные большие стикеры для чата',
        package_emoji: 'Пакет эмодзи',
        package_emoji_desc: 'Маленькие эмодзи внутри сообщений',
        package_name_placeholder: 'Введите название вашего пакета...',
        package_confirm: 'Подтвердить ✓',
        package_select_error: 'Пожалуйста, выберите тип пакета!',
        package_name_error: 'Пожалуйста, введите название пакета!',
        package_success: '✅ Пакет успешно создан!',    
    },
    
    zh: {
        // ===== صفحه اصلی (index.html) =====
        page_title: '主页',
        user_label: '亲爱的用户',
        user_info: '用户信息',
        user_orders: '用户订单',
        gifts_rewards: '礼品和奖励',
        logout: '退出',
        design_order: '设计订单',
        design_desc: '专业图形设计，标志等...',
        auto_order: '自动订单',
        auto_desc: '快速自动订单处理',
        portfolio: '作品集',
        home: '首页',
        gifts: '礼品',
        
        // ===== صفحه سفارش اتوماتیک (Automatic-order.html) =====
        page_title_auto: '自动订单',
        filter_all: '全部',
        filter_special: '特别',
        filter_gift: '礼品',
        filter_flag: '旗帜',
        filter_other: '其他',
        product1_name: '产品名称',
        product2_name: '产品名称',
        product3_name: '产品名称',
        add_to_cart: '🛒',
        add_to_cart_modal: '加入购物车',
        cancel: '取消',
        product_name: '产品名称',
        
        // ===== صفحه سفارش طراحی (Design-order.html) - نسخه اول =====
        page_title_design: '设计订单',
        design_settings: '横幅设计设置',
        banner_platform: '横幅平台：',
        platform_instagram: 'Instagram',
        platform_telegram: 'Telegram',
        platform_youtube: 'YouTube',
        platform_advertising: '广告',
        text_type: '文本类型：',
        text_persian: '波斯语',
        text_english: 'English',
        text_russian: 'Русский',
        text_chinese: '中文',
        text_mixed: '混合',
        banner_size: '横幅尺寸：',
        size_small: '小',
        size_medium: '中',
        size_large: '大',
        size_custom: '自定义',
        color_scheme: '配色方案：',
        color_warm: '暖色',
        color_cool: '冷色',
        color_neutral: '中性',
        color_glamorous: '华丽',
        color_custom: '自定义',
        order_level: '订单级别：',
        level_normal: '普通 - 12 TON',
        level_vip: 'VIP - 30 TON',
        level_pro: '专业 - 55 TON',
        upload_image: '上传图片或图标（可选）：',
        upload_click: '点击上传或拖拽文件',
        additional_info: '补充说明：',
        description_placeholder: '请写下您的横幅设计说明...',
        telegram_id: '请输入您的 Telegram ID：',
        telegram_placeholder: '例如：@username 或 ID 号码',
        submit_order: '提交横幅设计订单',
        
        // ===== صفحه طراحی (Design-order.html) - نسخه جدید با باکس‌ها =====
        page_title_design_new: '设计订单',
        products_title: '产品',
        products_subtitle: '查看我们的专业服务',
        service_thumbnail: '缩略图设计',
        service_logo: '标志设计',
        service_post: '帖子设计',
        service_banner: '横幅设计',
        service_emoji: '表情符号设计',
        service_vip: 'VIP',
        
        // ===== صفحه هدایا (bonus.html) =====
        page_title_bonus: '礼品',
        silver_box: '银盒',
        gold_box: '金盒',
        diamond_box: '钻石盒',
        legendary_box: '传奇盒',
        
        // ===== صفحه نقره‌ای (silver.html) =====
        page_title_silver: '银盒',
        spin_wheel: '幸运轮盘',
        spin_button: '转动轮盘',
        winner_label: '🏆 您赢了：',
        waiting_message: '等待您的点击！',
        attempts: '🎯 尝试次数：',
        last_winner: '🏆 最后赢家：',
        reset: '🔄 重置',
        contact_admin: '📨 联系管理员',
        enter_telegram_id: '输入您的 Telegram ID',
        telegram_hint: '输入您的ID以领取奖品',
        send_id: '发送ID',
        contact_admin_title: '联系管理员',
        message_admin: '给管理员发消息',
        admin_hint: '给管理员发消息以领取奖品',
        congrats: '恭喜！',
        you_won: '您赢了！',
        modal_instruction1: '给管理员发消息以领取奖品',
        modal_instruction2: '并输入您的ID',
        
        // ===== صفحه ایموجی (Emoji.html) =====
        page_title_emoji: '表情符号设计',
        emoji_settings: '表情符号设计设置',
        emoji_style: '表情符号风格：',
        style_cartoon: '卡通',
        style_realistic: '写实',
        style_minimal: '极简',
        style_3d: '3D',
        style_neon: '霓虹',
        style_watermark: '水印',
        style_animated: '动画',
        color_happy: '快乐',
        color_dark: '暗色',
        color_colorful: '多彩',
        color_natural: '自然',
        emoji_count: '表情符号数量：',
        count_1: '1',
        count_2: '2',
        count_3: '3',
        count_5: '5',
        count_more: '更多',
        level_normal_emoji: '普通 - 5 TON',
        level_vip_emoji: 'VIP - 15 TON',
        level_pro_emoji: '专业 - 30 TON',
        emoji_description_placeholder: '请写下您的表情符号设计说明...',
        submit_emoji_order: '提交表情符号设计订单',
        // در بخش zh (چینی):
        page_title_logo: '标志设计',
        logo_settings: '标志设计设置',
        logo_style: '标志风格：',
        style_iconic: '图标式',
        style_typography: '字体式',
        style_minimal: '极简',
        style_3d_logo: '3D',
        style_mascot: '吉祥物',
        style_mixed: '混合',
        style_luxury: '奢华',
        color_mono: '单色',
        color_multi: '多彩',
        color_gradient: '渐变',
        logo_size: '标志尺寸：',
        level_normal_logo: '普通 - 15 TON',
        level_vip_logo: 'VIP - 35 TON',
        level_pro_logo: '专业 - 60 TON',
        logo_description_placeholder: '请写下您的标志设计说明...',
        submit_logo_order: '提交标志设计订单',
        // در بخش zh (چینی):
        page_title_post: '帖子设计',
        post_settings: '帖子设计设置',
        post_type: '帖子类型：',
        post_story: '故事',
        post_cover: '封面',
        post_instagram: 'Instagram',
        post_advertising: '广告',
        color_attractive: '吸引人',
        image_count: '图片数量：',
        level_normal_post: '普通 - 8 TON',
        level_vip_post: 'VIP - 20 TON',
        level_pro_post: '专业 - 40 TON',
        post_description_placeholder: '请写下您的帖子设计说明...',
        submit_post_order: '提交帖子设计订单',
        // در بخش zh (چینی):
        page_title_cart: '购物车',
        cart_title: '🛒 购物车',
        cart_subtitle: '查看和管理您选择的产品',
        total_label: '总计：',
        checkout_btn: '结账',
        // در بخش zh (چینی):
        page_title_thumbnail: '缩略图设计',
        thumbnail_settings: '缩略图设置',
        thumbnail_style: '缩略图风格：',
        style_vlog: 'Vlog',
        style_fact: '事实',
        style_gaming: '游戏',
        style_manhwa: '漫画',
        style_horror: '恐怖',
        thumbnail_size: '缩略图尺寸：',
        size_720p: '1280x720',
        size_1080p: '1920x1080',
        size_square: '720x720',
        level_normal_thumb: '普通 - 10 TON',
        level_vip_thumb: 'VIP - 25 TON',
        level_pro_thumb: '专业 - 50 TON',
        thumbnail_description_placeholder: '请写下您的缩略图设计说明...',
        submit_thumbnail_order: '提交缩略图订单',
        // در بخش zh (چینی):
        page_title_ton: '钱包',
        wallet_title: 'TON 钱包',
        badge_disconnected: '已断开',
        connect_wallet_text: '连接您的钱包',
        connect_wallet_sub: '查看余额和交易记录',
        connect_btn: '🔗 连接钱包',
        mainnet: '主网 (Mainnet)',
        disconnect_btn: '🔌 断开连接',
        actions_title: '操作',
        badge_fast: '快速',
        send_btn: '📤 发送',
        receive_btn: '📥 接收',
        action_hint: '连接钱包以激活',
        transactions_title: '最近交易',
        tx_send: '📤 发送到 ...',
        tx_receive: '📥 从 ... 接收',
        tx_staking: '🔄 质押',
        tx_date_1: '2分钟前',
        tx_date_2: '1小时前',
        tx_date_3: '3小时前',
        tx_confirm: '已确认',
        tx_pending: '等待中',
        refresh_btn: '🔄 刷新交易',
        status_label: '状态：',
        status_disconnected: '🔴 已断开',
        version_label: '界面版本：',
        // در بخش zh (چینی):
        page_title_user: '用户信息',
        user_avatar: '用户',
        user_name: '张三',
        user_email: '📧 邮箱：',
        user_member: '📅 加入时间：',
        stat_purchases: '购买',
        stat_pending: '待处理',
        stat_downloaded: '已下载',
        purchased_products: '📦 已购买产品',
        support_title: '联系支持',
        support_desc: '如有问题、疑问或需要更多帮助，请联系管理员',
        contact_admin_btn: '📨 在 Telegram 上联系管理员',
        support_hours: '🕐 支持：24/7',
        response_time: '⚡ 响应时间：不到1小时',
        // در بخش zh (چینی):
        page_title_vip: 'VIP 套餐',
        vip_title: '🎉 VIP 特别套餐',
        vip_subtitle: '圣诞嘉年华 - 惊人折扣',
        time_left: '⏳ 剩余时间：',
        countdown_text: '5天 14小时 30分钟',
        custom_package_title: '✨ 创建自定义套餐',
        custom_package_desc: '如果以上套餐不能满足您的需求，您可以创建自己的套餐。',
        custom_package_btn: '创建自定义套餐',
        vip_description_placeholder: '写下您的具体需求...',
        submit_vip_order: '提交 VIP 订单',
        package_builder_title: '构建您的套餐',
        package_builder_subtitle: '选择您喜欢的设计类型',
        package_sticker: '贴纸包',
        package_sticker_desc: '用于聊天的动画大贴纸',
        package_emoji: '表情符号包',
        package_emoji_desc: '消息中的小表情符号',
        package_name_placeholder: '输入您的套餐名称...',
        package_confirm: '确认 ✓',
        package_select_error: '请选择套餐类型！',
        package_name_error: '请输入套餐名称！',
        package_success: '✅ 套餐创建成功！',
            }
};

// ========== توابع مدیریت زبان ==========

// بارگذاری ترجمه هنگام لود صفحه
document.addEventListener('DOMContentLoaded', function() {
    // بررسی زبان ذخیره شده در مرورگر
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && ['en', 'fa', 'ru', 'zh'].includes(savedLang)) {
        currentLanguage = savedLang;
    } else {
        currentLanguage = 'en'; // زبان پیش‌فرض انگلیسی
    }
    
    // اعمال زبان
    applyLanguage(currentLanguage);
    
    // تنظیم منوی زبان بر اساس زبان فعلی
    updateLanguageDisplay(currentLanguage);
});

// تابع اصلی تغییر زبان
function changeLanguage(lang, flag, name) {
    if (!translations[lang]) {
        console.error('❌ زبان مورد نظر موجود نیست:', lang);
        return;
    }
    
    currentLanguage = lang;
    applyLanguage(lang);
    updateLanguageDisplay(lang, flag, name);
    localStorage.setItem('preferred-language', lang);
    
    // بستن منوی کشویی بعد از انتخاب
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// تابع به‌روزرسانی نمایش زبان در دکمه
function updateLanguageDisplay(lang, flag, name) {
    const currentLangSpan = document.getElementById('currentLanguage');
    if (currentLangSpan) {
        if (flag && name) {
            currentLangSpan.textContent = `${flag} ${name}`;
        } else {
            const langItems = document.querySelectorAll('.language-item');
            langItems.forEach(item => {
                if (item.dataset.lang === lang) {
                    const itemFlag = item.querySelector('.lang-flag')?.textContent || '';
                    const itemName = item.querySelector('.lang-name')?.textContent || lang;
                    currentLangSpan.textContent = `${itemFlag} ${itemName}`;
                }
            });
        }
    }
}

// تابع اعمال ترجمه به تمام المان‌ها
function applyLanguage(lang) {
    const langData = translations[lang];
    if (!langData) return;

    // 1. ترجمه تمام المان‌های دارای data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (langData[key] !== undefined) {
            el.textContent = langData[key];
        }
    });

    // 2. تغییر عنوان صفحه (title)
    const possibleTitles = [
        'page_title', 'page_title_auto', 'page_title_design', 
        'page_title_design_new', 'page_title_bonus', 'page_title_silver',
        'page_title_emoji'
    ];
    let pageTitle = null;
    for (let key of possibleTitles) {
        if (langData[key]) {
            pageTitle = langData[key];
            break;
        }
    }
    if (pageTitle) {
        document.title = pageTitle;
    }

    // 3. مدیریت جهت صفحه برای زبان فارسی (RTL)
    const htmlElement = document.documentElement;
    if (lang === 'fa') {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'fa');
    } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', lang);
    }

    // 4. اضافه کردن کلاس به body برای تغییر فونت
    document.body.classList.remove('lang-fa', 'lang-en', 'lang-ru', 'lang-zh');
    document.body.classList.add('lang-' + lang);
}

// ========== مدیریت منوی کشویی زبان ==========
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });
    }
});

// ========== مدیریت منوی کشویی پروفایل ==========
document.addEventListener('DOMContentLoaded', function() {
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }
});

// ========== تابع کمکی برای استفاده در جاوااسکریپت‌های دیگه ==========
function getTranslation(key) {
    return translations[currentLanguage]?.[key] || key;
}

console.log('✅ سیستم ترجمه با موفقیت بارگذاری شد');
console.log('🌍 زبان فعلی:', currentLanguage);

























function applyLanguage(lang) {
    const langData = translations[lang];
    if (!langData) return;

    // 1. ترجمه تمام المان‌های دارای data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (langData[key] !== undefined) {
            el.textContent = langData[key];
        }
    });

    // 2. ترجمه placeholder ها
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (langData[key] !== undefined) {
            el.placeholder = langData[key];
        }
    });

    // 3. تغییر عنوان صفحه (title)
    const possibleTitles = [
        'page_title', 'page_title_auto', 'page_title_design', 
        'page_title_design_new', 'page_title_bonus', 'page_title_silver',
        'page_title_emoji'
    ];
    let pageTitle = null;
    for (let key of possibleTitles) {
        if (langData[key]) {
            pageTitle = langData[key];
            break;
        }
    }
    if (pageTitle) {
        document.title = pageTitle;
    }

    // 4. مدیریت جهت صفحه برای زبان فارسی (RTL)
    const htmlElement = document.documentElement;
    if (lang === 'fa') {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'fa');
    } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', lang);
    }

    // 5. اضافه کردن کلاس به body برای تغییر فونت
    document.body.classList.remove('lang-fa', 'lang-en', 'lang-ru', 'lang-zh');
    document.body.classList.add('lang-' + lang);
}