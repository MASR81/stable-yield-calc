document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.tool-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Yield Calculator Logic ---
    const calculateBtn = document.getElementById('calculate-btn');
    const investmentInput = document.getElementById('investment');
    const apyInput = document.getElementById('apy');
    const yearsSlider = document.getElementById('years');
    const yearsDisplay = document.getElementById('years-display');

    // Update slider label
    yearsSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        yearsDisplay.textContent = val == 1 ? `${val} Year` : `${val} Years`;
    });

    calculateBtn.addEventListener('click', () => {
        const principal = parseFloat(investmentInput.value) || 0;
        let rate = parseFloat(apyInput.value) || 0;
        const years = parseInt(yearsSlider.value) || 1;

        if (principal <= 0) return;

        // Apply "What-If" Scenario (Fed Rate Cut)
        const isFedCut = document.getElementById('fed-cut').checked;
        if (isFedCut) rate = Math.max(0, rate - 0.5);

        // Compound interest calculation
        const r = rate / 100;
        const total = principal * Math.pow((1 + r), years);
        const profit = total - principal;

        // Animate numbers
        animateValue("total-balance", 0, total, 1000, true);
        animateValue("yearly-yield", 0, profit / years, 1000, true);
        animateValue("monthly-yield", 0, profit / (years * 12), 1000, true);
        animateValue("daily-yield", 0, profit / (years * 365), 1000, true);

        // Monetization & Engagement Logic
        setTimeout(() => {
            // High Value Lead Gen (Advisor) if principal > $50,000
            if (principal >= 50000) {
                document.getElementById('yield-ad-container').classList.add('hidden');
                document.getElementById('lead-gen-container').classList.remove('hidden');
            } else {
                // Standard Affiliate (Bank/Exchange)
                document.getElementById('lead-gen-container').classList.add('hidden');
                document.getElementById('affiliate-rate').textContent = (rate + 0.5).toFixed(1) + '%';
                const adSlot = document.getElementById('yield-ad-container');
                adSlot.classList.remove('hidden');
            }

            // Show Email Alert slot
            document.getElementById('email-alert-container').classList.remove('hidden');
        }, 1200);
    });

    // --- Mock Email Subscription Logic ---
    const subscribeBtn = document.getElementById('subscribe-btn');
    const subscribeMsg = document.getElementById('subscribe-msg');
    const emailInput = document.getElementById('alert-email');

    subscribeBtn.addEventListener('click', () => {
        if (emailInput.value.includes('@')) {
            subscribeBtn.textContent = 'Subscribing...';
            setTimeout(() => {
                subscribeBtn.classList.add('hidden');
                emailInput.classList.add('hidden');
                subscribeMsg.classList.remove('hidden');
            }, 800);
        }
    });

    // --- Compliance Checker Logic ---
    const searchBtn = document.getElementById('search-btn');
    const assetSearch = document.getElementById('asset-search');
    const complianceResults = document.getElementById('compliance-results');

    // Mock database
    const mockDb = {
        'usdc': { name: 'USD Coin', icon: '🔵', risk: 'low', mica: 'Approved / E-Money Institute', sec: 'No Action (Currently)', audit: 'Monthly by BDO' },
        'usdt': { name: 'Tether', icon: '🟢', risk: 'med', mica: 'Partially Compliant', sec: 'Under Scrutiny', audit: 'Quarterly (BDO Italia)' },
        'bnb': { name: 'Binance Coin', icon: '🟡', risk: 'high', mica: 'Not Approved', sec: 'Active Litigation', audit: 'Internal' }
    };

    searchBtn.addEventListener('click', () => {
        const query = assetSearch.value.toLowerCase().trim();
        if (!query) return;

        // Simulate API call
        searchBtn.textContent = 'Checking...';
        searchBtn.style.opacity = '0.7';

        setTimeout(() => {
            const assetData = mockDb[query] || {
                name: query.toUpperCase() + ' Token', icon: '🪙', risk: 'high', mica: 'Unknown / Unregulated', sec: 'High Warning', audit: 'None Detected'
            };

            // Populate UI
            document.getElementById('c-icon').textContent = assetData.icon;
            document.getElementById('c-name').textContent = assetData.name;
            document.getElementById('c-mica').textContent = assetData.mica;
            document.getElementById('c-sec').textContent = assetData.sec;
            document.getElementById('c-audit').textContent = assetData.audit;

            const badge = document.getElementById('c-risk-badge');
            // Remove old classes
            badge.className = 'risk-badge';

            // Clear prior ad states
            document.getElementById('legal-ad-container').classList.add('hidden');
            document.getElementById('tax-ad-container').classList.add('hidden');

            if (assetData.risk === 'low') {
                badge.classList.add('risk-low');
                badge.textContent = 'Low Risk';
                // Show Tax Software for low-risk yield farming
                document.getElementById('tax-ad-container').classList.remove('hidden');
            } else if (assetData.risk === 'med') {
                badge.classList.add('risk-med');
                badge.textContent = 'Medium Risk';
                // Show Tax Software for medium-risk
                document.getElementById('tax-ad-container').classList.remove('hidden');
            } else {
                badge.classList.add('risk-high');
                badge.textContent = 'High Regulatory Risk';
                // Show Legal Ad for high risk items
                document.getElementById('legal-ad-container').classList.remove('hidden');
            }

            complianceResults.classList.remove('hidden');

            searchBtn.textContent = 'Check Compliance';
            searchBtn.style.opacity = '1';
        }, 800);
    });
});

// Helper for number animation
function animateValue(id, start, end, duration, isCurrency = false) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = progress * (end - start) + start;

        if (isCurrency) {
            obj.innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(current);
        } else {
            obj.innerHTML = current.toFixed(2);
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
