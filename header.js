/**
 * NEXUS HARDWARE - PREMIUM NAV SYSTEM
 * Restyled with Logo, Slogan, Red Numeric Badges, Hamburger Menu & Bottom Navigation
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
            --h-accent: #ef4444;
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
            font-size: 0.7rem;
            padding: 6px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header-main {
            height: 70px;
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
        }

        /* Hamburger Menu Styles */
        .hamburger-menu {
            display: none;
            cursor: pointer;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }

        .hamburger-menu:hover {
            background: #f1f5f9;
        }

        .hamburger-icon {
            font-size: 1.5rem;
            color: var(--h-dark);
        }

        .hamburger-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .hamburger-overlay.active {
            display: block;
            opacity: 1;
        }

        .hamburger-drawer {
            position: fixed;
            top: 0;
            left: -320px;
            width: 300px;
            height: 100%;
            background: white;
            z-index: 10002;
            box-shadow: 2px 0 20px rgba(0,0,0,0.1);
            transition: left 0.3s ease;
            overflow-y: auto;
            padding: 20px 0;
        }

        .hamburger-drawer.active {
            left: 0;
        }

        .drawer-header {
            padding: 0 20px 20px;
            border-bottom: 1px solid var(--h-border);
            margin-bottom: 20px;
        }

        .drawer-user-info {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 20px;
            background: #f8fafc;
            border-radius: 12px;
            margin: 0 15px 20px;
        }

        .drawer-user-avatar {
            width: 50px;
            height: 50px;
            background: var(--h-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
        }

        .drawer-user-details h4 {
            margin: 0;
            font-size: 1rem;
            color: var(--h-dark);
        }

        .drawer-user-details p {
            margin: 5px 0 0;
            font-size: 0.8rem;
            color: #64748b;
        }

        .drawer-section {
            margin-bottom: 25px;
        }

        .drawer-section-title {
            padding: 0 20px;
            margin-bottom: 10px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 0.5px;
        }

        .drawer-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px 20px;
            color: var(--h-dark);
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.2s;
            position: relative;
        }

        .drawer-item i {
            width: 24px;
            color: var(--h-primary);
            font-size: 1.2rem;
        }

        .drawer-item:hover {
            background: #f1f5f9;
        }

        .drawer-item .badge-count {
            position: relative;
            top: auto;
            right: auto;
            margin-left: auto;
            display: inline-flex;
        }

        .drawer-divider {
            height: 8px;
            background: #f1f5f9;
            margin: 20px 0;
        }

        /* Mobile Bottom Navigation */
        .bottom-nav {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            padding: 6px 12px;
            z-index: 9999;
            border-top: 1px solid var(--h-border);
            justify-content: space-around;
            align-items: center;
        }

        .bottom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #64748b;
            font-size: 0.65rem;
            gap: 2px;
            padding: 4px 8px;
            border-radius: 8px;
            transition: 0.2s;
            position: relative;
        }

        .bottom-nav-item i {
            font-size: 1.3rem;
        }

        .bottom-nav-item.active {
            color: var(--h-primary);
        }

        .bottom-nav-item .badge-count {
            top: 0;
            right: 2px;
        }

        /* Mobile Search Bar */
        .mobile-search {
            display: none;
            padding: 8px 16px;
            background: white;
            border-bottom: 1px solid var(--h-border);
        }

        .mobile-search-input {
            width: 100%;
            padding: 8px 16px;
            border: 1px solid var(--h-border);
            border-radius: 25px;
            font-size: 0.9rem;
            background: #f8fafc;
        }

        .mobile-search-input:focus {
            outline: none;
            border-color: var(--h-primary);
            background: white;
        }

        /* Hide desktop elements on mobile/tablet */
        @media (max-width: 1024px) {
            .header-top-bar {
                padding: 4px 20px;
                font-size: 0.65rem;
            }

            .header-top-bar > div:first-child,
            .header-top-bar > div:last-child {
                display: none;
            }

            .header-main {
                height: 60px;
                padding: 0 16px;
            }

            .brand-text-group .slogan-text {
                display: none;
            }

            .header-logo-img {
                height: 35px;
            }

            .logo-text {
                font-size: 1.1rem;
            }

            .nav-links {
                display: none !important;
            }

            .hamburger-menu {
                display: flex;
            }

            .user-hub {
                display: none !important;
            }

            .action-icon {
                width: 35px;
                height: 35px;
                font-size: 1.1rem;
            }

            .bottom-nav {
                display: flex;
            }

            .mobile-search {
                display: block;
            }

            body {
                padding-bottom: 65px;
                padding-top: 100px;
            }
        }

        /* Tablet specific adjustments */
        @media (min-width: 768px) and (max-width: 1024px) {
            .bottom-nav-item {
                font-size: 0.7rem;
            }

            .bottom-nav-item i {
                font-size: 1.4rem;
            }

            .drawer-item {
                padding: 14px 20px;
            }
        }

        /* Small mobile adjustments */
        @media (max-width: 480px) {
            .logo-text {
                font-size: 1rem;
            }

            .header-logo-img {
                height: 30px;
            }

            .header-actions {
                gap: 2px;
            }

            .action-icon {
                width: 32px;
                height: 32px;
                font-size: 1rem;
            }

            .bottom-nav-item {
                font-size: 0.6rem;
            }

            .bottom-nav-item i {
                font-size: 1.2rem;
            }

            .hamburger-drawer {
                width: 280px;
            }
        }

        /* Desktop styles */
        @media (min-width: 1025px) {
            .bottom-nav {
                display: none !important;
            }

            .mobile-search {
                display: none !important;
            }

            .hamburger-menu {
                display: none !important;
            }

            body {
                padding-bottom: 0;
                padding-top: 105px;
            }
        }

        /* Logo & Slogan Styles */
        .brand-container {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
        }
        .header-logo-img {
            height: 45px;
            width: auto;
        }
        .brand-text-group {
            display: flex;
            flex-direction: column;
        }
        .logo-text {
            font-size: 1.3rem;
            font-weight: 800;
            color: var(--h-dark);
            line-height: 1;
            letter-spacing: -0.5px;
            margin: 0;
        }
        .logo-text span { color: var(--h-primary); }
        .slogan-text {
            font-size: 0.65rem;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 2px;
        }

        .nav-links { display: flex; gap: 25px; }
        .nav-link {
            text-decoration: none;
            color: var(--h-dark);
            font-size: 0.9rem;
            font-weight: 600;
            transition: 0.2s;
        }
        .nav-link:hover, .nav-link.active { color: var(--h-primary); }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .action-icon {
            color: var(--h-dark);
            font-size: 1.2rem;
            text-decoration: none;
            width: 40px;
            height: 40px;
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
            top: 2px; right: 2px;
            background: var(--h-accent);
            color: white;
            font-size: 0.6rem;
            font-weight: 800;
            min-width: 16px;
            height: 16px;
            padding: 0 3px;
            border-radius: 10px;
            display: none;
            align-items: center;
            justify-content: center;
            border: 2px solid #fff;
        }

        .user-hub {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px;
            background: #f1f5f9;
            border-radius: 50px;
            cursor: pointer;
            position: relative;
            margin-left: 8px;
            transition: 0.2s;
        }
        .user-hub:hover { background: #e2e8f0; }
        .user-hub span { font-size: 0.8rem; font-weight: 700; color: var(--h-dark); }

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
            padding: 10px 18px;
            text-decoration: none;
            color: var(--h-dark);
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
        }
        .h-drop-item:hover { background: #f8fafc; color: var(--h-primary); }
    `;
    document.head.appendChild(style);

    // --- 2. RENDER LOGIC ---
    function initHeader() {
        const userName = localStorage.getItem('nexusUserFullname') || "Account";
        const userEmail = localStorage.getItem('nexusUserEmail') || "guest@nexus.com";
        const isLoggedIn = !!cognitoUser;
        const currentPath = window.location.pathname;
        const userInitial = userName.charAt(0).toUpperCase();

        const html = `
            <div class="header-top-bar">
                <div><i class="fas fa-truck-fast"></i> Precision Hardware. Proven Reliability.</div>
                <div style="display: flex; gap: 20px;">
                    <a href="support.html" style="color:white; text-decoration:none;">Support</a>
                    <a href="tracking.html" style="color:white; text-decoration:none;">Order Tracking</a>
                </div>
            </div>

            <div class="header-main">
                <!-- Hamburger Menu (Mobile) -->
                <div class="hamburger-menu" id="hamburgerTrigger">
                    <i class="fas fa-bars hamburger-icon"></i>
                </div>

                <a href="index.html" class="brand-container">
                    <img src="logo.png" alt="Nexus Logo" class="header-logo-img">
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
                        <i class="fa-solid fa-circle-user" style="font-size: 1.4rem; color: var(--h-primary);"></i>
                        <span>${isLoggedIn ? userName.split(' ')[0] : 'Log In'}</span>
                        <i class="fa-solid fa-chevron-down" style="font-size: 0.65rem; opacity: 0.6;"></i>

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

            <!-- Mobile Search Bar -->
            <div class="mobile-search">
                <input type="text" class="mobile-search-input" placeholder="Search products, services...">
            </div>

            <!-- Bottom Navigation (Mobile) -->
            <nav class="bottom-nav">
                <a href="index.html" class="bottom-nav-item ${currentPath.includes('index') || currentPath === '/' ? 'active' : ''}">
                    <i class="fa-solid fa-home"></i>
                    <span>Home</span>
                </a>
                <a href="shop.html" class="bottom-nav-item ${currentPath.includes('shop') ? 'active' : ''}">
                    <i class="fa-solid fa-store"></i>
                    <span>Shop</span>
                </a>
                <a href="services.html" class="bottom-nav-item ${currentPath.includes('services') ? 'active' : ''}">
                    <i class="fa-solid fa-tools"></i>
                    <span>Services</span>
                </a>
                <a href="cart.html" class="bottom-nav-item">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span>Cart</span>
                    <span id="cart-count-bottom" class="badge-count">0</span>
                </a>
                <a href="profile.html" class="bottom-nav-item">
                    <i class="fa-solid fa-user"></i>
                    <span>Account</span>
                </a>
            </nav>

            <!-- Hamburger Overlay & Drawer -->
            <div class="hamburger-overlay" id="hamburgerOverlay"></div>
            <div class="hamburger-drawer" id="hamburgerDrawer">
                <div class="drawer-header">
                    <img src="logo.png" alt="Nexus Logo" style="height: 40px;">
                </div>

                <div class="drawer-user-info">
                    <div class="drawer-user-avatar">${userInitial}</div>
                    <div class="drawer-user-details">
                        <h4>${isLoggedIn ? userName : 'Guest User'}</h4>
                        <p>${isLoggedIn ? userEmail : 'Sign in for better experience'}</p>
                    </div>
                </div>

                <div class="drawer-section">
                    <div class="drawer-section-title">Main Menu</div>
                    <a href="index.html" class="drawer-item">
                        <i class="fa-solid fa-home"></i>
                        Home
                    </a>
                    <a href="shop.html" class="drawer-item">
                        <i class="fa-solid fa-store"></i>
                        Shop
                    </a>
                    <a href="services.html" class="drawer-item">
                        <i class="fa-solid fa-tools"></i>
                        Services
                    </a>
                    <a href="deals.html" class="drawer-item">
                        <i class="fa-solid fa-fire"></i>
                        Hot Deals
                    </a>
                </div>

                <div class="drawer-divider"></div>

                <div class="drawer-section">
                    <div class="drawer-section-title">Categories</div>
                    <a href="category.html?cat=power-tools" class="drawer-item">
                        <i class="fa-solid fa-bolt"></i>
                        Power Tools
                    </a>
                    <a href="category.html?cat=hand-tools" class="drawer-item">
                        <i class="fa-solid fa-wrench"></i>
                        Hand Tools
                    </a>
                    <a href="category.html?cat=hardware" class="drawer-item">
                        <i class="fa-solid fa-gear"></i>
                        Hardware
                    </a>
                    <a href="category.html?cat=plumbing" class="drawer-item">
                        <i class="fa-solid fa-water"></i>
                        Plumbing
                    </a>
                    <a href="category.html?cat=electrical" class="drawer-item">
                        <i class="fa-solid fa-bolt"></i>
                        Electrical
                    </a>
                </div>

                <div class="drawer-divider"></div>

                <div class="drawer-section">
                    <div class="drawer-section-title">Your Stuff</div>
                    <a href="wishlist.html" class="drawer-item">
                        <i class="fa-regular fa-heart"></i>
                        Wishlist
                        <span id="wish-count-drawer" class="badge-count">0</span>
                    </a>
                    <a href="cart.html" class="drawer-item">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Cart
                        <span id="cart-count-drawer" class="badge-count">0</span>
                    </a>
                    <a href="orders.html" class="drawer-item">
                        <i class="fa-solid fa-truck"></i>
                        Orders
                    </a>
                    <a href="bookings.html" class="drawer-item">
                        <i class="fa-solid fa-calendar-check"></i>
                        Service Bookings
                    </a>
                </div>

                <div class="drawer-divider"></div>

                <div class="drawer-section">
                    <div class="drawer-section-title">Support</div>
                    <a href="support.html" class="drawer-item">
                        <i class="fa-solid fa-headset"></i>
                        Help Center
                    </a>
                    <a href="tracking.html" class="drawer-item">
                        <i class="fa-solid fa-location-dot"></i>
                        Track Order
                    </a>
                    <a href="contact.html" class="drawer-item">
                        <i class="fa-solid fa-envelope"></i>
                        Contact Us
                    </a>
                    <a href="faq.html" class="drawer-item">
                        <i class="fa-solid fa-circle-question"></i>
                        FAQ
                    </a>
                </div>

                <div class="drawer-divider"></div>

                <div class="drawer-section">
                    ${isLoggedIn ? `
                        <a href="#" onclick="handleLogout()" class="drawer-item" style="color: #ef4444;">
                            <i class="fa-solid fa-power-off"></i>
                            Sign Out
                        </a>
                    ` : `
                        <a href="login.html" class="drawer-item">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            Log In
                        </a>
                        <a href="registration.html" class="drawer-item">
                            <i class="fa-solid fa-user-plus"></i>
                            Create Account
                        </a>
                    `}
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

        // Hamburger Menu Toggle
        const hamburgerTrigger = document.getElementById('hamburgerTrigger');
        const hamburgerDrawer = document.getElementById('hamburgerDrawer');
        const hamburgerOverlay = document.getElementById('hamburgerOverlay');

        if (hamburgerTrigger && hamburgerDrawer && hamburgerOverlay) {
            const openMenu = () => {
                hamburgerDrawer.classList.add('active');
                hamburgerOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            };

            const closeMenu = () => {
                hamburgerDrawer.classList.remove('active');
                hamburgerOverlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            hamburgerTrigger.onclick = openMenu;
            hamburgerOverlay.onclick = closeMenu;

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && hamburgerDrawer.classList.contains('active')) {
                    closeMenu();
                }
            });
        }

        syncHeaderBadges();
    }

    function syncHeaderBadges() {
        const cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
        const wish = JSON.parse(localStorage.getItem('nexus_wishlist')) || [];
        
        // Desktop badges
        const cartBadge = document.getElementById('cart-count');
        const wishBadge = document.getElementById('wish-count');
        
        // Mobile bottom badges
        const cartBottomBadge = document.getElementById('cart-count-bottom');
        
        // Drawer badges
        const cartDrawerBadge = document.getElementById('cart-count-drawer');
        const wishDrawerBadge = document.getElementById('wish-count-drawer');

        if(cartBadge) {
            cartBadge.innerText = cart.length;
            cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
        }
        if(wishBadge) {
            wishBadge.innerText = wish.length;
            wishBadge.style.display = wish.length > 0 ? 'flex' : 'none';
        }
        
        // Update mobile badges
        if(cartBottomBadge) {
            cartBottomBadge.innerText = cart.length;
            cartBottomBadge.style.display = cart.length > 0 ? 'flex' : 'none';
        }
        
        // Update drawer badges
        if(cartDrawerBadge) {
            cartDrawerBadge.innerText = cart.length;
            cartDrawerBadge.style.display = cart.length > 0 ? 'flex' : 'none';
        }
        if(wishDrawerBadge) {
            wishDrawerBadge.innerText = wish.length;
            wishDrawerBadge.style.display = wish.length > 0 ? 'flex' : 'none';
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