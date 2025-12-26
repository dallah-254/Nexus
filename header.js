/**
 * NEXUSFLOW UNIFIED HEADER v11.0 - FINAL STABLE BUILD
 * Logic: Synchronized with Index Page category routing.
 * Features: Wishlist, Cart, Identity Hub, and Precision Search.
 */

(function() {
    // --- 1. AWS COGNITO CONFIGURATION ---
    const poolData = { 
        UserPoolId: NEXUS_CONFIG.auth.UserPoolId, 
        ClientId: NEXUS_CONFIG.auth.ClientId 
    };
    
    if (typeof AmazonCognitoIdentity === 'undefined') {
        console.error("NexusFlow Error: AmazonCognitoIdentity SDK not found.");
        return;
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    // --- 2. CONFIGURATION & ROUTING ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    const showCategoriesOn = ['index.html', 'shop.html', 'product-details.html', 'category.html'];
    const hideSearchOn = ['login.html', 'registration.html', 'verify.html', 'cart.html'];
    
    const shouldHideSearch = hideSearchOn.includes(currentPath);
    const shouldShowCategories = showCategoriesOn.includes(currentPath);

    // --- 3. INTEGRATED STYLES ---
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;600;800&display=swap');
        
        :root {
            --n-cyan: #00f3ff;
            --n-bg: #0a0a0a;
            --n-border: rgba(0, 243, 255, 0.15);
            --n-text-dim: rgba(255, 255, 255, 0.5);
            --nav-height: 70px;
            --cat-height: 48px;
            --element-height: 38px;
        }

        .nexus-header-container {
            position: fixed;
            top: 0; left: 0; width: 100%; z-index: 10000;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(15px);
            border-bottom: 1px solid var(--n-border);
        }

        .nexus-navbar { height: var(--nav-height); display: flex; align-items: center; font-family: 'Inter', sans-serif; }
        .nav-container { width: 100%; max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 25px; }

        .logo {
            font-family: 'JetBrains Mono', monospace; font-weight: 800; color: var(--n-cyan);
            text-decoration: none; font-size: 1.2rem; letter-spacing: -1px; margin-right: 30px;
        }
        .logo span { color: #fff; }

        .nav-tabs { display: flex; gap: 25px; list-style: none; margin: 0; padding: 0; flex-grow: 1; }
        .tab-link {
            text-decoration: none; color: var(--n-text-dim); font-size: 0.7rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 1px; transition: 0.2s;
        }
        .tab-link:hover, .tab-link.active { color: var(--n-cyan); }

        .category-bar {
            height: var(--cat-height); background: rgba(0, 243, 255, 0.03);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            display: ${shouldShowCategories ? 'flex' : 'none'}; align-items: center;
        }

        .cat-container {
            max-width: 1400px; margin: 0 auto; width: 100%; display: flex;
            gap: 25px; padding: 0 25px; overflow-x: auto; scrollbar-width: none;
        }
        .cat-container::-webkit-scrollbar { display: none; }

        .cat-item {
            color: var(--n-text-dim); text-decoration: none; font-size: 0.62rem;
            font-family: 'JetBrains Mono', monospace; white-space: nowrap;
            text-transform: uppercase; transition: 0.2s;
        }
        .cat-item:hover { color: var(--n-cyan); }

        .search-area { flex: 0 1 320px; margin: 0 20px; height: var(--element-height); ${shouldHideSearch ? 'visibility: hidden;' : ''} }
        .search-bar {
            display: flex; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--n-border);
            border-radius: 4px; padding: 0 12px; align-items: center; height: 100%;
        }
        .search-bar input { background: transparent; border: none; color: #fff; width: 100%; outline: none; font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; height: 100%; }

        .nav-right { display: flex; align-items: center; gap: 20px; height: var(--element-height); }
        .icon-cluster { display: flex; align-items: center; gap: 20px; border-left: 1px solid rgba(255, 255, 255, 0.1); padding-left: 20px; height: 100%; }
        
        .action-icon { position: relative; color: rgba(255, 255, 255, 0.7); text-decoration: none; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .action-icon:hover { color: var(--n-cyan); }

        .badge-ui {
            position: absolute; top: -5px; right: -8px; background: var(--n-cyan); color: #000;
            font-size: 0.55rem; font-weight: 900; width: 14px; height: 14px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
        }

        .profile-node {
            position: relative; cursor: pointer; display: flex; align-items: center; gap: 8px;
            height: var(--element-height); padding: 0 10px; border-radius: 4px; background: rgba(255, 255, 255, 0.02);
            border: 1px solid transparent; transition: 0.2s;
        }
        .profile-node:hover { border-color: var(--n-border); background: rgba(255, 255, 255, 0.05); }

        .user-identity { font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; color: var(--n-cyan); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

        .nexus-dropdown {
            position: absolute; top: calc(100% + 10px); right: 0; background: #0d0d0d;
            border: 1px solid var(--n-border); min-width: 180px; display: none; z-index: 10001;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        }
        .nexus-dropdown.active { display: block; }
        .drop-link { display: block; padding: 12px 18px; color: #ccc; text-decoration: none; font-size: 0.7rem; text-transform: uppercase; transition: 0.2s; }
        .drop-link:hover { background: var(--n-cyan); color: #000; }
        
        @media (max-width: 1024px) { .nav-tabs, .search-area { display: none; } }
    `;
    document.head.appendChild(style);

    // --- 4. RENDER LOGIC ---
    async function initHeader() {
        let displayName = "GUEST_USER";
        let categoriesHTML = '';

        // Category Fetch - Logic Matched to Index View All
        if (shouldShowCategories) {
            try {
                const response = await fetch(`${NEXUS_CONFIG.api.baseUrl}/categories`);
                const categories = await response.json();
                
                // Matches Index Page Logic: Lowercase displayName as category ID
                categoriesHTML = categories.map(cat => 
                    `<a href="category.html?cat=${cat.displayName.toLowerCase()}" class="cat-item">/ ${cat.displayName}</a>`
                ).join('');
            } catch (err) {
                console.error("Discovery Error:", err);
                categoriesHTML = '<span class="cat-item">CORE_OFFLINE</span>';
            }
        }

        // Customer Identity Hub
        if (cognitoUser) {
            await new Promise((resolve) => {
                cognitoUser.getSession((err, session) => {
                    if (!err && session.isValid()) {
                        cognitoUser.getUserAttributes((err, attributes) => {
                            if (!err && attributes) {
                                const name = attributes.find(a => a.Name === 'name');
                                const nickname = attributes.find(a => a.Name === 'nickname');
                                const email = attributes.find(a => a.Name === 'email');
                                
                                if (name) displayName = name.Value;
                                else if (nickname) displayName = nickname.Value;
                                else if (email) displayName = email.Value.split('@')[0];
                            }
                            resolve();
                        });
                    } else { resolve(); }
                });
            });
        }

        const headerHTML = `
        <div class="nexus-header-container">
            <nav class="nexus-navbar">
                <div class="nav-container">
                    <a href="index.html" class="logo">NEXUS<span>FLOW</span></a>
                    
                    <ul class="nav-tabs">
                        <li><a href="shop.html" class="tab-link ${currentPath === 'shop.html' ? 'active' : ''}">Shop</a></li>
                        <li><a href="services.html" class="tab-link ${currentPath === 'services.html' ? 'active' : ''}">Services</a></li>
                        <li><a href="deals.html" class="tab-link ${currentPath === 'deals.html' ? 'active' : ''}">Deals</a></li>
                    </ul>

                    <div class="search-area">
                        <div class="search-bar">
                            <input type="text" id="headerSearchInput" placeholder="SCAN_DATABASE..." onkeypress="if(event.key==='Enter') headerExecSearch()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="color: var(--n-cyan); cursor: pointer;" onclick="headerExecSearch()">
                                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>

                    <div class="nav-right">
                        <div class="icon-cluster">
                            <a href="wishlist.html" class="action-icon" title="Wishlist">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                <span class="badge-ui" id="header-wish-badge" style="display:none">0</span>
                            </a>
                            <a href="cart.html" class="action-icon" title="Cart">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                <span class="badge-ui" id="header-cart-badge">0</span>
                            </a>
                            <div class="profile-node" id="profileTriggerNode">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <span class="user-identity">${displayName.toUpperCase()}</span>
                                <div class="nexus-dropdown" id="headerDropdownMenu">
                                    <a href="profile.html" class="drop-link">Identity Hub</a>
                                    <a href="orders.html" class="drop-link">Order Logs</a>
                                    <a href="#" onclick="sessionTerminate()" class="drop-link" style="color:#ff4d4d">Disconnect</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="category-bar">
                <div class="cat-container">
                    ${categoriesHTML || '<span class="cat-item">BOOTING_CATEGORIES...</span>'}
                </div>
            </div>
        </div>
        `;

        const target = document.getElementById('nexus-header-wrapper');
        if (target) target.innerHTML = headerHTML;

        // UI Event Listeners
        const trig = document.getElementById('profileTriggerNode');
        const menu = document.getElementById('headerDropdownMenu');
        if (trig) {
            trig.onclick = (e) => { e.stopPropagation(); menu.classList.toggle('active'); };
        }
        document.onclick = () => menu?.classList.remove('active');

        updateBadges();
    }

    function updateBadges() {
        const cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
        const wish = JSON.parse(localStorage.getItem('nexus_wishlist')) || [];
        const cb = document.getElementById('header-cart-badge');
        const wb = document.getElementById('header-wish-badge');
        if (cb) cb.innerText = cart.length;
        if (wb) {
            wb.innerText = wish.length;
            wb.style.display = wish.length > 0 ? 'flex' : 'none';
        }
    }

    window.headerExecSearch = () => {
        const q = document.getElementById('headerSearchInput').value;
        if(q.trim()) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
    };

    window.sessionTerminate = () => {
        if (cognitoUser) { cognitoUser.signOut(); }
        localStorage.clear();
        window.location.href = 'login.html';
    };

    window.updateHeaderBadges = updateBadges;
    initHeader();
})();