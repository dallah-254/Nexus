/**
 * NEXUS HARDWARE - PREMIUM NAV SYSTEM
 * Restyled with Logo, Slogan, and Red Numeric Badges
 */

(function() {
    // Inject FontAwesome for icons if not present
    if (!document.getElementById('nexus-fa-link')) {
        const fa = document.createElement('link');
        fa.id = 'nexus-fa-link';
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    const poolData = { 
        UserPoolId: NEXUS_CONFIG.auth.UserPoolId, 
        ClientId: NEXUS_CONFIG.auth.ClientId 
    };
    
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    // --- 1. STYLES ---
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --h-primary: #2563eb;
            --h-dark: #0f172a;
            --h-bg: #ffffff;
            --h-border: #e2e8f0;
            --h-accent: #ef4444; /* Red for badges */
        }

        #nexus-header-wrapper {
            position: fixed;
            top: 0; left: 0; width: 100%;
            z-index: 10000;
            background: var(--h-bg);
            font-family: 'Inter', sans-serif;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .header-top-bar {
            background: var(--h-dark);
            color: white;
            font-size: 0.75rem;
            padding: 10px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header-main {
            height: 90px; /* Increased slightly for logo/slogan */
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
        }

        /* --- LOGO & SLOGAN STYLES --- */
        .brand-container {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
        }
        .header-logo-img {
            height: 50px;
            width: auto;
        }
        .brand-text-group {
            display: flex;
            flex-direction: column;
        }
        .logo-text {
            font-size: 1.4rem;
            font-weight: 800;
            color: var(--h-dark);
            line-height: 1;
            letter-spacing: -0.5px;
            margin: 0;
        }
        .logo-text span { color: var(--h-primary); }
        .slogan-text {
            font-size: 0.7rem;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 4px;
        }

        .nav-links { display: flex; gap: 30px; }
        .nav-link {
            text-decoration: none;
            color: var(--h-dark);
            font-size: 0.95rem;
            font-weight: 600;
            transition: 0.2s;
        }
        .nav-link:hover, .nav-link.active { color: var(--h-primary); }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .action-icon {
            color: var(--h-dark);
            font-size: 1.25rem;
            text-decoration: none;
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            position: relative;
            transition: all 0.2s;
        }
        .action-icon:hover { background: #f1f5f9; color: var(--h-primary); }

        .badge-count {
            position: absolute;
            top: 4px; right: 4px;
            background: var(--h-accent);
            color: white;
            font-size: 0.65rem;
            font-weight: 800;
            min-width: 18px;
            height: 18px;
            padding: 0 4px;
            border-radius: 10px;
            display: none;
            align-items: center;
            justify-content: center;
            border: 2px solid #fff;
        }

        .user-hub {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 16px;
            background: #f1f5f9;
            border-radius: 50px;
            cursor: pointer;
            position: relative;
            margin-left: 10px;
            transition: 0.2s;
        }
        .user-hub:hover { background: #e2e8f0; }
        .user-hub span { font-size: 0.85rem; font-weight: 700; color: var(--h-dark); }

        .h-dropdown {
            position: absolute;
            top: 120%; right: 0;
            width: 220px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            border: 1px solid var(--h-border);
            display: none;
            flex-direction: column;
            padding: 8px 0;
            z-index: 10001;
        }
        .h-dropdown.active { display: flex; }
        .h-drop-item {
            padding: 12px 20px;
            text-decoration: none;
            color: var(--h-dark);
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
        }
        .h-drop-item:hover { background: #f8fafc; color: var(--h-primary); }

        @media (max-width: 992px) { 
            .nav-links, .slogan-text { display: none; } 
        }
    `;
    document.head.appendChild(style);

    // --- 2. RENDER LOGIC ---
    function initHeader() {
        const userName = localStorage.getItem('nexusUserFullname') || "Account";
        const isLoggedIn = !!cognitoUser;
        const currentPath = window.location.pathname;

        const html = `
            <div class="header-top-bar">
                <div><i class="fas fa-truck-fast"></i> Precision Hardware. Proven Reliability.</div>
                <div style="display: flex; gap: 20px;">
                    <a href="support.html" style="color:white; text-decoration:none;">Support</a>
                    <a href="tracking.html" style="color:white; text-decoration:none;">Order Tracking</a>
                </div>
            </div>

            <div class="header-main">
                <a href="index.html" class="brand-container">
                    <img src="image.png" alt="Nexus Logo" class="header-logo-img">
                    <div class="brand-text-group">
                        <h1 class="logo-text">Nexus<span>Hardware</span></h1>
                        <span class="slogan-text">Precision Hardware. Proven Reliability.</span>
                    </div>
                </a>

                <nav class="nav-links">
                    <a href="index.html" class="nav-link ${currentPath.includes('index') || currentPath === '/' ? 'active' : ''}">Home</a>
                    <a href="shop.html" class="nav-link ${currentPath.includes('shop') ? 'active' : ''}">Store</a>
                    <a href="services.html" class="nav-link ${currentPath.includes('services') ? 'active' : ''}">Expert Services</a>
                </nav>

                <div class="header-actions">
                    <a href="wishlist.html" class="action-icon" title="Wishlist">
                        <i class="fa-regular fa-heart"></i>
                        <span id="wish-count" class="badge-count">0</span>
                    </a>

                    <a href="cart.html" class="action-icon" title="Shopping Cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span id="cart-count" class="badge-count">0</span>
                    </a>

                    <div class="user-hub" id="userHubTrigger">
                        <i class="fa-solid fa-circle-user" style="font-size: 1.5rem; color: var(--h-primary);"></i>
                        <span>${isLoggedIn ? userName.split(' ')[0] : 'Log In'}</span>
                        <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem; opacity: 0.6;"></i>

                        <div class="h-dropdown" id="userDropdown">
                            ${isLoggedIn ? `
                                <a href="profile.html" class="h-drop-item"><i class="fa-solid fa-id-card"></i> My Profile</a>
                                <a href="orders.html" class="h-drop-item"><i class="fa-solid fa-receipt"></i> Orders</a>
                                <a href="bookings.html" class="h-drop-item"><i class="fa-solid fa-tools"></i> Repair Hub</a>
                                <div style="height:1px; background:#e2e8f0; margin:5px 0;"></div>
                                <a href="#" onclick="handleLogout()" class="h-drop-item" style="color: #ef4444;"><i class="fa-solid fa-power-off"></i> Sign Out</a>
                            ` : `
                                <a href="login.html" class="h-drop-item"><i class="fa-solid fa-right-to-bracket"></i> Customer Login</a>
                                <a href="registration.html" class="h-drop-item"><i class="fa-solid fa-user-plus"></i> Create Account</a>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.getElementById('nexus-header-wrapper');
        if (wrapper) wrapper.innerHTML = html;

        // Dropdown Toggle
        const trigger = document.getElementById('userHubTrigger');
        const dropdown = document.getElementById('userDropdown');
        if (trigger) {
            trigger.onclick = (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            };
        }
        document.addEventListener('click', () => dropdown?.classList.remove('active'));

        syncHeaderBadges();
    }

    function syncHeaderBadges() {
        const cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
        const wish = JSON.parse(localStorage.getItem('nexus_wishlist')) || [];
        
        const cartBadge = document.getElementById('cart-count');
        const wishBadge = document.getElementById('wish-count');

        if(cartBadge) {
            cartBadge.innerText = cart.length;
            cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
        }
        if(wishBadge) {
            wishBadge.innerText = wish.length;
            wishBadge.style.display = wish.length > 0 ? 'flex' : 'none';
        }
    }

    window.handleLogout = () => {
        if (cognitoUser) {
            cognitoUser.signOut();
            localStorage.clear();
            window.location.href = 'index.html';
        }
    };

    window.updateHeaderBadges = syncHeaderBadges;
    window.addEventListener('cartUpdated', syncHeaderBadges);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeader);
    } else {
        initHeader();
    }
})();