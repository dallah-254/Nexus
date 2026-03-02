/**
 * NEXUS HARDWARE - PREMIUM NAV SYSTEM
 * Restyled with Logo, Slogan, Red Numeric Badges, Hamburger Menu & Bottom Navigation
 * ADDED: Working search functionality with page-aware placeholder - FULLY FUNCTIONAL ON ALL SCREENS
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

        /* Mobile Search Bar - FULLY FUNCTIONAL */
        .mobile-search {
            display: none;
            padding: 8px 16px;
            background: white;
            border-bottom: 1px solid var(--h-border);
        }

        .mobile-search-input {
            width: 100%;
            padding: 10px 16px;
            border: 1px solid var(--h-border);
            border-radius: 25px;
            font-size: 0.9rem;
            background: #f8fafc;
            cursor: text;
            color: var(--h-dark);
        }

        .mobile-search-input:focus {
            outline: none;
            border-color: var(--h-primary);
            background: white;
        }

        .mobile-search-input::placeholder {
            color: #94a3b8;
        }

        /* Desktop Search Bar - FULLY FUNCTIONAL */
        .desktop-search {
            max-width: 300px;
            margin: 0 15px;
            flex: 1;
        }

        .desktop-search-input {
            width: 100%;
            padding: 8px 16px;
            border: 1px solid var(--h-border);
            border-radius: 25px;
            font-size: 0.9rem;
            background: #f8fafc;
            cursor: text;
            color: var(--h-dark);
        }

        .desktop-search-input:focus {
            outline: none;
            border-color: var(--h-primary);
            background: white;
        }

        .desktop-search-input::placeholder {
            color: #94a3b8;
        }

        /* Search Overlay - FULLY FUNCTIONAL */
        .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            z-index: 100000;
            display: none;
            flex-direction: column;
            overflow-y: auto;
        }

        .search-overlay.active {
            display: flex;
        }

        .search-overlay-header {
            padding: 20px;
            border-bottom: 1px solid var(--h-border);
            display: flex;
            align-items: center;
            gap: 20px;
            background: white;
            position: sticky;
            top: 0;
            z-index: 10;
            flex-wrap: wrap;
        }

        .search-overlay-type {
            display: flex;
            gap: 10px;
            background: #f8fafc;
            padding: 4px;
            border-radius: 30px;
            border: 1px solid var(--h-border);
        }

        .search-type-btn {
            padding: 10px 24px;
            border: none;
            border-radius: 30px;
            background: transparent;
            color: #64748b;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .search-type-btn.active {
            background: var(--h-primary);
            color: white;
        }

        .search-overlay-input-wrapper {
            flex: 1;
            position: relative;
            min-width: 250px;
        }

        .search-overlay-input {
            width: 100%;
            padding: 14px 45px;
            font-size: 1rem;
            border: 1px solid var(--h-border);
            border-radius: 30px;
            outline: none;
            color: var(--h-dark);
        }

        .search-overlay-input:focus {
            border-color: var(--h-primary);
        }

        .search-overlay-input::placeholder {
            color: #94a3b8;
        }

        .search-overlay-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
        }

        .search-overlay-close {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #f8fafc;
            border: 1px solid var(--h-border);
            color: var(--h-dark);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }

        .search-overlay-content {
            flex: 1;
            padding: 20px;
            background: #f8fafc;
        }

        .search-suggestions {
            max-width: 800px;
            margin: 0 auto;
        }

        .suggestion-group {
            margin-bottom: 25px;
        }

        .suggestion-group-title {
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            color: var(--h-primary);
            margin-bottom: 15px;
            padding-left: 5px;
        }

        .suggestion-items {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
        }

        .suggestion-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: white;
            border-radius: 12px;
            text-decoration: none;
            color: inherit;
            border: 1px solid var(--h-border);
            transition: all 0.2s;
        }

        .suggestion-item:hover {
            border-color: var(--h-primary);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .suggestion-item-img {
            width: 60px;
            height: 60px;
            object-fit: contain;
            background: #f8fafc;
            border-radius: 8px;
            padding: 5px;
            border: 1px solid var(--h-border);
        }

        .suggestion-item-content {
            flex: 1;
        }

        .suggestion-item-title {
            font-weight: 600;
            margin-bottom: 4px;
            color: var(--h-dark);
            font-size: 0.95rem;
        }

        .suggestion-item-category {
            font-size: 0.75rem;
            color: var(--h-primary);
            margin-bottom: 2px;
        }

        .suggestion-item-price {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--h-dark);
        }

        .search-loading, .search-no-results {
            text-align: center;
            padding: 60px;
            color: #64748b;
        }

        .search-loading i {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* SMALL SCREEN OPTIMIZATIONS - Everything smaller and functional */
        @media (max-width: 1024px) {
            .header-top-bar {
                padding: 4px 20px;
                font-size: 0.6rem;
            }

            .header-top-bar > div:first-child,
            .header-top-bar > div:last-child {
                display: none;
            }

            .header-main {
                height: 56px;
                padding: 0 12px;
            }

            .brand-text-group .slogan-text {
                display: none;
            }

            .header-logo-img {
                height: 30px;
            }

            .logo-text {
                font-size: 1rem;
            }

            .nav-links {
                display: none !important;
            }

            .hamburger-menu {
                display: flex;
                width: 36px;
                height: 36px;
            }

            .hamburger-icon {
                font-size: 1.3rem;
            }

            .user-hub {
                display: none !important;
            }

            .action-icon {
                width: 32px;
                height: 32px;
                font-size: 1rem;
            }

            .bottom-nav {
                display: flex;
                padding: 4px 8px;
            }

            .bottom-nav-item {
                font-size: 0.6rem;
            }

            .bottom-nav-item i {
                font-size: 1.2rem;
            }

            .mobile-search {
                display: block;
                padding: 6px 12px;
            }

            .mobile-search-input {
                padding: 8px 14px;
                font-size: 0.85rem;
            }

            .desktop-search {
                display: none;
            }

            body {
                padding-bottom: 60px;
                padding-top: 95px;
            }

            /* Smaller overlay for mobile */
            .search-overlay-header {
                padding: 12px;
                gap: 10px;
            }

            .search-type-btn {
                padding: 6px 16px;
                font-size: 0.8rem;
            }

            .search-overlay-input {
                padding: 12px 40px;
                font-size: 0.95rem;
            }

            .search-overlay-close {
                width: 38px;
                height: 38px;
                font-size: 1rem;
            }

            .suggestion-items {
                grid-template-columns: 1fr;
            }

            .suggestion-item {
                padding: 12px;
            }

            .suggestion-item-img {
                width: 50px;
                height: 50px;
            }

            .suggestion-item-title {
                font-size: 0.9rem;
            }
        }

        /* Small mobile adjustments */
        @media (max-width: 480px) {
            .header-main {
                height: 52px;
                padding: 0 8px;
            }

            .logo-text {
                font-size: 0.95rem;
            }

            .header-logo-img {
                height: 28px;
            }

            .header-actions {
                gap: 0px;
            }

            .action-icon {
                width: 30px;
                height: 30px;
                font-size: 0.95rem;
            }

            .hamburger-menu {
                width: 32px;
                height: 32px;
            }

            .hamburger-icon {
                font-size: 1.2rem;
            }

            .bottom-nav-item {
                font-size: 0.55rem;
            }

            .bottom-nav-item i {
                font-size: 1.1rem;
            }

            .hamburger-drawer {
                width: 260px;
            }

            .drawer-user-avatar {
                width: 45px;
                height: 45px;
                font-size: 1.3rem;
            }

            .drawer-item {
                padding: 10px 16px;
                font-size: 0.9rem;
            }

            .search-overlay-header {
                flex-direction: column;
                align-items: stretch;
            }

            .search-overlay-type {
                justify-content: center;
            }

            .search-type-btn {
                padding: 6px 12px;
                font-size: 0.75rem;
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
            gap: 8px;
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

    // ==================== SEARCH FUNCTIONALITY ====================
    const API_BASE = 'https://yskkdnff93.execute-api.us-east-1.amazonaws.com/prod';
    let searchTimeout;

    function getSearchType() {
        const path = window.location.pathname;
        if (path.includes('shop') || path.includes('products')) {
            return 'products';
        } else if (path.includes('services')) {
            return 'services';
        } else {
            return 'both';
        }
    }

    function getSearchPlaceholder() {
        const type = getSearchType();
        if (type === 'products') return 'Search products...';
        if (type === 'services') return 'Search services...';
        return 'Search products & services...';
    }

    function initSearch() {
        // Create search overlay HTML if it doesn't exist
        if (!document.getElementById('searchOverlay')) {
            const searchOverlay = document.createElement('div');
            searchOverlay.className = 'search-overlay';
            searchOverlay.id = 'searchOverlay';
            searchOverlay.innerHTML = `
                <div class="search-overlay-header">
                    <div class="search-overlay-type" id="searchTypeButtons">
                        <button class="search-type-btn" data-type="both">All</button>
                        <button class="search-type-btn" data-type="products">Products</button>
                        <button class="search-type-btn" data-type="services">Services</button>
                    </div>
                    <div class="search-overlay-input-wrapper">
                        <i class="fas fa-search search-overlay-icon"></i>
                        <input type="text" class="search-overlay-input" id="searchOverlayInput" placeholder="Search...">
                    </div>
                    <button class="search-overlay-close" id="searchOverlayClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-overlay-content" id="searchOverlayContent">
                    <div class="search-suggestions" id="searchSuggestions"></div>
                </div>
            `;
            document.body.appendChild(searchOverlay);
        }

        const desktopSearch = document.querySelector('.desktop-search-input');
        const mobileSearch = document.querySelector('.mobile-search-input');
        const overlay = document.getElementById('searchOverlay');
        const overlayInput = document.getElementById('searchOverlayInput');
        const overlayClose = document.getElementById('searchOverlayClose');
        const searchSuggestions = document.getElementById('searchSuggestions');
        const typeButtons = document.querySelectorAll('.search-type-btn');

        if (!overlay || !overlayInput) return;

        // Set initial placeholder
        const placeholder = getSearchPlaceholder();
        if (desktopSearch) desktopSearch.placeholder = placeholder;
        if (mobileSearch) mobileSearch.placeholder = placeholder;
        if (overlayInput) overlayInput.placeholder = placeholder;

        // Set initial active type
        const currentType = getSearchType();
        typeButtons.forEach(btn => {
            if (btn.dataset.type === currentType) {
                btn.classList.add('active');
            }
        });

        // Type button click handlers
        typeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                typeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const type = btn.dataset.type;
                if (type === 'products') overlayInput.placeholder = 'Search products...';
                else if (type === 'services') overlayInput.placeholder = 'Search services...';
                else overlayInput.placeholder = 'Search products & services...';
            });
        });

        // Open search function
        function openSearch(e) {
            e.preventDefault();
            overlay.classList.add('active');
            setTimeout(() => {
                overlayInput.focus();
                overlayInput.value = '';
            }, 100);
            searchSuggestions.innerHTML = '<div class="search-no-results"><i class="fas fa-search"></i><p>Type at least 3 characters to search</p></div>';
        }

        // Close search function
        function closeSearch() {
            overlay.classList.remove('active');
        }

        // Attach click events to search inputs
        if (desktopSearch) {
            desktopSearch.addEventListener('click', openSearch);
            desktopSearch.addEventListener('focus', openSearch);
        }
        if (mobileSearch) {
            mobileSearch.addEventListener('click', openSearch);
            mobileSearch.addEventListener('focus', openSearch);
        }
        if (overlayClose) {
            overlayClose.addEventListener('click', closeSearch);
        }

        // Input handler
        overlayInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            const activeType = document.querySelector('.search-type-btn.active')?.dataset.type || 'both';

            if (query.length < 3) {
                searchSuggestions.innerHTML = '<div class="search-no-results"><i class="fas fa-search"></i><p>Type at least 3 characters to search</p></div>';
                return;
            }

            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => fetchSuggestions(query, activeType), 300);
        });

        // Enter key handler
        overlayInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                const activeType = document.querySelector('.search-type-btn.active')?.dataset.type || 'both';
                if (query.length >= 3) {
                    performSearch(query, activeType);
                }
            }
        });

        // Escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeSearch();
            }
        });

        // Close when clicking outside on mobile
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeSearch();
            }
        });
    }

    async function fetchSuggestions(query, type) {
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (!searchSuggestions) return;
        
        searchSuggestions.innerHTML = '<div class="search-loading"><i class="fas fa-spinner"></i><p>Searching...</p></div>';

        try {
            const response = await fetch(`${API_BASE}/suggest?q=${encodeURIComponent(query)}&type=${type}`);
            
            if (!response.ok) throw new Error('Failed');
            
            const data = await response.json();
            const suggestions = data.suggestions || [];

            if (suggestions.length === 0) {
                searchSuggestions.innerHTML = '<div class="search-no-results"><i class="fas fa-box-open"></i><p>No suggestions found</p><small>Press Enter to see all results</small></div>';
                return;
            }

            let html = '<div class="suggestion-group"><div class="suggestion-group-title">Suggestions</div><div class="suggestion-items">';
            
            suggestions.forEach(item => {
                const itemType = item.type || type;
                const detailPage = itemType === 'service' ? 'service-details.html' : 'product-details.html';
                const itemId = item.id || item.productId || item.serviceId;
                const itemName = item.text || item.name || item.serviceName || '';
                const itemPrice = item.price || item.basePrice || 0;
                const itemCategory = item.category || item.serviceCategory || '';
                
                html += `
                    <a href="${detailPage}?id=${itemId}" class="suggestion-item" onclick="document.getElementById('searchOverlay').classList.remove('active')">
                        <img src="${item.imageUrl || 'https://via.placeholder.com/60'}" class="suggestion-item-img" alt="${itemName}" onerror="this.src='https://via.placeholder.com/60'">
                        <div class="suggestion-item-content">
                            <div class="suggestion-item-category">${itemCategory || (itemType === 'service' ? 'Service' : 'Product')}</div>
                            <div class="suggestion-item-title">${itemName}</div>
                            <div class="suggestion-item-price">$${parseFloat(itemPrice).toFixed(2)}</div>
                        </div>
                    </a>
                `;
            });
            
            html += '</div></div>';
            searchSuggestions.innerHTML = html;

        } catch (error) {
            console.error('Suggestion error:', error);
            searchSuggestions.innerHTML = '<div class="search-no-results"><i class="fas fa-exclamation-triangle"></i><p>Unable to get suggestions</p></div>';
        }
    }

    async function performSearch(query, type) {
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (!searchSuggestions) return;
        
        searchSuggestions.innerHTML = '<div class="search-loading"><i class="fas fa-spinner"></i><p>Searching...</p></div>';

        try {
            const response = await fetch(`${API_BASE}/search2?q=${encodeURIComponent(query)}&type=${type}&limit=20`);
            
            if (!response.ok) throw new Error('Failed');
            
            const data = await response.json();
            const results = data.results || [];

            if (results.length === 0) {
                searchSuggestions.innerHTML = '<div class="search-no-results"><i class="fas fa-box-open"></i><p>No results found</p></div>';
                return;
            }

            let html = '<div class="suggestion-group"><div class="suggestion-group-title">Search Results</div><div class="suggestion-items">';
            
            results.forEach(item => {
                const itemType = item.type || type;
                const detailPage = itemType === 'service' ? 'service-details.html' : 'product-details.html';
                const itemId = item.id || item.productId || item.serviceId;
                const itemName = item.name || item.displayName || item.serviceName || '';
                const itemPrice = item.price || item.displayPrice || item.basePrice || 0;
                const itemCategory = item.category || item.displayCategory || item.serviceCategory || '';
                
                html += `
                    <a href="${detailPage}?id=${itemId}" class="suggestion-item" onclick="document.getElementById('searchOverlay').classList.remove('active')">
                        <img src="${item.imageUrl || 'https://via.placeholder.com/60'}" class="suggestion-item-img" alt="${itemName}" onerror="this.src='https://via.placeholder.com/60'">
                        <div class="suggestion-item-content">
                            <div class="suggestion-item-category">${itemCategory || (itemType === 'service' ? 'Service' : 'Product')}</div>
                            <div class="suggestion-item-title">${itemName}</div>
                            <div class="suggestion-item-price">$${parseFloat(itemPrice).toFixed(2)}</div>
                        </div>
                    </a>
                `;
            });
            
            html += '</div></div>';
            searchSuggestions.innerHTML = html;

        } catch (error) {
            console.error('Search error:', error);
            searchSuggestions.innerHTML = '<div class="search-no-results"><i class="fas fa-exclamation-triangle"></i><p>Something went wrong</p></div>';
        }
    }

    // --- 2. RENDER LOGIC ---
    function initHeader() {
        const userName = localStorage.getItem('nexusUserFullname') || "Account";
        const userEmail = localStorage.getItem('nexusUserEmail') || "guest@nexus.com";
        const isLoggedIn = !!cognitoUser;
        const currentPath = window.location.pathname;
        const userInitial = userName.charAt(0).toUpperCase();
        const searchPlaceholder = getSearchPlaceholder();

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

                <!-- Desktop Search Bar - FULLY FUNCTIONAL -->
                <div class="desktop-search">
                    <input type="text" class="desktop-search-input" placeholder="${searchPlaceholder}" readonly>
                </div>

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

            <!-- Mobile Search Bar - FULLY FUNCTIONAL -->
            <div class="mobile-search">
                <input type="text" class="mobile-search-input" placeholder="${searchPlaceholder}" readonly>
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

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && hamburgerDrawer.classList.contains('active')) {
                    closeMenu();
                }
            });
        }

        syncHeaderBadges();
        
        // Initialize search AFTER header is rendered
        setTimeout(() => {
            initSearch();
        }, 100);
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