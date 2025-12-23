/**
 * NEXUSFLOW UNIFIED HEADER v3.5 - FULL PRODUCTION CODE
 * Precision Alignment Edition: Fixed heights, Wishlist, and Dynamic Name.
 */

(function() {
    // --- 1. CONFIGURATION ---
    const hideSearchOn = [
        'book.html', 'booking-success.html', 'cart.html', 'login.html',
        'order-success.html', 'product-details.html', 'profile.html',
        'registration.html', 'search.html', 'service-details.html', 'verify.html'
    ];
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const shouldHideSearch = hideSearchOn.includes(currentPath);
    const isProfilePage = currentPath === 'profile.html';

    // --- 2. INTEGRATED STYLES ---
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;600;800&display=swap');
        
        :root {
            --n-cyan: #00f3ff;
            --n-bg: #0a0a0a;
            --n-border: rgba(0, 243, 255, 0.15);
            --n-text-dim: rgba(255, 255, 255, 0.6);
            --nav-height: 70px;
            --element-height: 38px; /* Fixed height for search and icons for alignment */
        }

        .nexus-navbar {
            background: #0a0a0a;
            border-bottom: 1px solid var(--n-border);
            position: sticky;
            top: 0;
            z-index: 10000;
            height: var(--nav-height);
            display: flex;
            align-items: center;
            font-family: 'Inter', sans-serif;
        }

        .nav-container {
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px;
        }

        .logo {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 800;
            font-size: 1.25rem;
            color: var(--n-cyan);
            text-decoration: none;
            display: flex;
            align-items: center;
            height: var(--element-height);
        }

        .logo span { color: #ffffff; }

        /* Perfectly Aligned Search Area */
        .search-area {
            flex: 0 1 300px; 
            margin: 0 20px;
            height: var(--element-height); /* Forced height match */
            ${shouldHideSearch ? 'visibility: hidden; pointer-events: none;' : ''}
        }

        .search-bar {
            display: flex;
            background: rgba(255,255,255,0.03);
            border: 1px solid var(--n-border);
            border-radius: 4px;
            padding: 0 12px;
            align-items: center;
            height: 100%; /* Spans full element height */
        }

        .search-bar input {
            background: transparent;
            border: none;
            color: #fff;
            width: 100%;
            outline: none;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            height: 100%;
        }

        .search-bar svg { color: var(--n-cyan); cursor: pointer; }

        /* Right Actions */
        .nav-right {
            display: flex;
            align-items: center;
            gap: 20px;
            height: var(--element-height);
        }

        .nav-link {
            color: var(--n-text-dim);
            text-decoration: none;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: var(--element-height);
        }

        .icon-cluster {
            display: flex;
            align-items: center;
            gap: 15px;
            border-left: 1px solid rgba(255,255,255,0.1);
            padding-left: 20px;
            height: 100%;
        }

        .action-icon {
            position: relative;
            color: var(--n-text-dim);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--element-height);
        }

        .badge-ui {
            position: absolute;
            top: 2px;
            right: -8px;
            background: var(--n-cyan);
            color: #000;
            font-size: 0.6rem;
            font-weight: 900;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Profile Block (Vertical Stack) */
        .profile-node {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            min-width: 80px;
            height: var(--element-height);
            position: relative;
        }

        .profile-icon { color: var(--n-cyan); line-height: 1; }

        .user-identity {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.55rem;
            color: var(--n-cyan);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 700;
            margin-top: -2px;
        }

        /* Dropdown Menu */
        .nexus-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: #0d0d0d;
            border: 1px solid var(--n-border);
            border-radius: 4px;
            min-width: 180px;
            display: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            z-index: 10001;
        }

        .nexus-dropdown.active { display: block; }

        .drop-link {
            display: block;
            padding: 12px 18px;
            color: #fff;
            text-decoration: none;
            font-size: 0.75rem;
        }

        .drop-link:hover { background: rgba(0,243,255,0.08); color: var(--n-cyan); }
    `;
    document.head.appendChild(style);

    // --- 3. IDENTITY LOGIC ---
    function resolveUserName() {
        const fullName = localStorage.getItem('nexusUserFullname');
        const email = localStorage.getItem('nexusEmail');
        
        if (fullName && fullName !== "undefined" && fullName !== "null") {
            return fullName.split(' ')[0]; // Returns First Name
        }
        if (email && email.includes('@')) {
            return email.split('@')[0]; // Returns email prefix
        }
        return "GUEST";
    }

    // --- 4. RENDER HTML ---
    const headerHTML = `
    <nav class="nexus-navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">NEXUS<span>FLOW</span></a>

            <div class="search-area">
                <div class="search-bar">
                    <input type="text" id="headerSearchInput" placeholder="SCAN_DATABASE...">
                    <svg onclick="headerExecSearch()" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
            </div>

            <div class="nav-right">
                <a href="shop.html" class="nav-link">Shop</a>
                <a href="services.html" class="nav-link">Services</a>

                <div class="icon-cluster">
                    <a href="wishlist.html" class="action-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </a>

                    <a href="cart.html" class="action-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <span class="badge-ui" id="header-cart-badge">0</span>
                    </a>

                    <div class="profile-node" id="profileTriggerNode">
                        <div class="profile-icon">
                            ${isProfilePage ? 
                                `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>` : 
                                `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
                            }
                        </div>
                        <span class="user-identity">${resolveUserName().toUpperCase()}</span>
                        
                        <div class="nexus-dropdown" id="headerDropdownMenu">
                            <a href="profile.html" class="drop-link">User Dashboard</a>
                            <a href="orders.html" class="drop-link">Orders</a>
                            <a href="#" onclick="sessionTerminate()" class="drop-link" style="color:#ff4d4d">Disconnect</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;

    // --- 5. INITIALIZE ---
    const target = document.getElementById('nexus-header-wrapper');
    if (target) target.innerHTML = headerHTML;

    const trig = document.getElementById('profileTriggerNode');
    const menu = document.getElementById('headerDropdownMenu');
    if (trig) {
        trig.onclick = (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        };
    }
    document.onclick = () => menu.classList.remove('active');

    window.headerExecSearch = () => {
        const query = document.getElementById('headerSearchInput').value;
        if(query.trim()) window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    };

    window.sessionTerminate = () => {
        localStorage.clear();
        window.location.href = 'login.html';
    };

    // Update Cart Badge
    const cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    const badge = document.getElementById('header-cart-badge');
    if (badge) {
        badge.innerText = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }

})();