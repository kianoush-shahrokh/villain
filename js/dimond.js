(function() {
    'use strict';

    // ===== DOM ELEMENTS =====
    const spinBtn = document.getElementById('spinBtn');
    const resultContent = document.getElementById('resultContent');
    const attemptCount = document.getElementById('attemptCount');
    const lastWinner = document.getElementById('lastWinner');
    const resetBtn = document.getElementById('resetBtn');
    const allItems = document.querySelectorAll('.prize-item');
    
    // مودال
    const modal = document.getElementById('congratsModal');
    const modalPrize = document.getElementById('modalPrize');

    // ===== STATE =====
    let attempts = 0;
    let isSpinning = false;

    // ===== DATA =====
    const discountPrizes = [
        { icon: '💎', text: '40%', value: '40%' },
        { icon: '💎', text: '60%', value: '60%' },
    ];

    const productPrizes = [
        { icon: '', text: '17', value: '17' },
        { icon: '', text: '18', value: '18' },
        { icon: '', text: '19', value: '19' },
        { icon: '', text: '20', value: '20' },
        { icon: '', text: '21', value: '21' },
        { icon: '', text: '22', value: '22' },
        { icon: '', text: '23', value: '23' },
        { icon: '', text: '24', value: '24' },
        { icon: '', text: '25', value: '25' },
        { icon: '', text: '26', value: '26' },
        { icon: '', text: '27', value: '27' },
        { icon: '', text: '28', value: '28' },
        { icon: '', text: '29', value: '29' },
        { icon: '', text: '30', value: '30' },
        { icon: '', text: '31', value: '31' },
        { icon: '', text: '32', value: '32' },
        
    ];

    // ===== HELPERS =====
    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function clearWinnerStyles() {
        allItems.forEach(el => el.classList.remove('winner', 'scan'));
    }

    function showResult(icon, text) {
        resultContent.innerHTML = `
            <span class="result-icon">${icon}</span>
            <span class="result-text">${text}</span>
        `;
    }

    function highlightWinner(winnerElement) {
        clearWinnerStyles();
        if (winnerElement) winnerElement.classList.add('winner');
    }

    // ===== MODAL =====
    function showModal(prizeText) {
        modalPrize.textContent = prizeText;
        modal.classList.add('active');
        
        // بستن مودال بعد از 4 ثانیه
        setTimeout(() => {
            modal.classList.remove('active');
        }, 4000);
    }

    // بستن مودال با کلیک روی پس‌زمینه
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });

    // ===== SPIN LOGIC =====
    function spin() {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;
        spinBtn.classList.add('loading');

        clearWinnerStyles();
        resultContent.innerHTML = `
            <span class="result-icon">🌀</span>
            <span class="result-text" style="opacity:0.6;">در حال چرخش...</span>
        `;

        // اسکن آیتم‌ها
        const itemsArray = Array.from(allItems);
        let scanIndex = 0;
        const scanInterval = setInterval(() => {
            itemsArray.forEach(el => el.classList.remove('scan'));
            if (itemsArray[scanIndex]) itemsArray[scanIndex].classList.add('scan');
            scanIndex = (scanIndex + 1) % itemsArray.length;
        }, 1);

        // انتخاب برنده
        setTimeout(() => {
            clearInterval(scanInterval);
            itemsArray.forEach(el => el.classList.remove('scan'));

            const rand = Math.random();
            let selectedPrize, type;

            if (rand < 0.75) {
                type = 'discount';
                selectedPrize = getRandomItem(discountPrizes);
            } else {
                type = 'product';
                selectedPrize = getRandomItem(productPrizes);
            }

            let winnerElement = null;
            allItems.forEach(el => {
                if (el.dataset.type === type && el.dataset.value === selectedPrize.value) {
                    winnerElement = el;
                }
            });

            showResult(selectedPrize.icon, selectedPrize.text);
            highlightWinner(winnerElement);

            attempts++;
            attemptCount.textContent = attempts;
            lastWinner.textContent = selectedPrize.text;

            // نمایش مودال تبریک
            showModal(selectedPrize.text);

            isSpinning = false;
            spinBtn.disabled = false;
            spinBtn.classList.remove('loading');
        }, 1200);
    }

    // ===== RESET =====
    function resetGame() {
        if (isSpinning) return;
        attempts = 0;
        attemptCount.textContent = '۰';
        lastWinner.textContent = '-';
        clearWinnerStyles();
        resultContent.innerHTML = `
            <span class="result-icon">🎯</span>
            <span class="result-text">منتظر کلیک شما هستیم!</span>
        `;
        modal.classList.remove('active');
    }

    // ===== EVENT LISTENERS =====
    spinBtn.addEventListener('click', spin);
    resetBtn.addEventListener('click', resetGame);

})();