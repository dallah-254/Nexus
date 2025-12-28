/**
 * NEXUS HARDWARE - GLOBAL FOOTER SYSTEM
 * Injected automatically into #nexus-footer-wrapper
 */

(function() {
    // --- 1. FOOTER STYLES ---
    const style = document.createElement('style');
    style.textContent = `
        #nexus-footer-wrapper {
            background: #0f172a; /* Navy Dark */
            color: #f1f5f9;
            padding: 60px 0 30px 0;
            margin-top: 80px;
            font-family: 'Inter', sans-serif;
        }

        .footer-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 40px;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
            gap: 40px;
        }

        .footer-logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: #fff;
            text-decoration: none;
            margin-bottom: 20px;
            display: block;
        }
        .footer-logo span { color: #2563eb; }

        .footer-about {
            color: #94a3b8;
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .footer-heading {
            color: #fff;
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .footer-links li {
            margin-bottom: 12px;
        }

        .footer-links a {
            color: #94a3b8;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.2s;
        }

        .footer-links a:hover {
            color: #2563eb;
        }

        /* Newsletter Section */
        .footer-newsletter p {
            font-size: 0.85rem;
            color: #94a3b8;
            margin-bottom: 15px;
        }

        .newsletter-form {
            display: flex;
            gap: 10px;
        }

        .newsletter-form input {
            background: #1e293b;
            border: 1px solid #334155;
            padding: 10px 15px;
            border-radius: 6px;
            color: white;
            flex: 1;
            font-size: 0.85rem;
        }

        .newsletter-btn {
            background: #2563eb;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s;
        }
        .newsletter-btn:hover { background: #1d4ed8; }

        /* Social Icons */
        .social-icons {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        .social-icons a {
            width: 35px;
            height: 35px;
            background: #1e293b;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            color: white;
            text-decoration: none;
            transition: 0.3s;
        }
        .social-icons a:hover { background: #2563eb; transform: translateY(-3px); }

        /* Bottom Bar */
        .footer-bottom {
            max-width: 1400px;
            margin: 40px auto 0 auto;
            padding: 30px 40px 0 40px;
            border-top: 1px solid #1e293b;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8rem;
            color: #64748b;
        }

        .payment-icons {
            display: flex;
            gap: 15px;
            font-size: 1.5rem;
            opacity: 0.6;
        }

        @media (max-width: 1024px) {
            .footer-container { grid-template-columns: 1fr 1fr 1fr; }
            .footer-newsletter { grid-column: span 3; }
        }

        @media (max-width: 768px) {
            .footer-container { grid-template-columns: 1fr; text-align: center; }
            .newsletter-form { flex-direction: column; }
            .footer-newsletter { grid-column: span 1; }
            .social-icons { justify-content: center; }
            .footer-bottom { flex-direction: column; gap: 20px; }
        }
    `;
    document.head.appendChild(style);

    // --- 2. RENDER LOGIC ---
    function initFooter() {
        const html = `
            <div class="footer-container">
                <div class="footer-info">
                    <a href="index.html" class="footer-logo">Nexus<span>Hardware</span></a>
                    <p class="footer-about">
                        Leading provider of enterprise-grade hardware solutions and expert technical repair services. Synchronizing technology with reliability since 2024.
                    </p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Shop</h4>
                    <ul class="footer-links">
                        <li><a href="shop.html">All Products</a></li>
                        <li><a href="shop.html?cat=Components">Components</a></li>
                        <li><a href="shop.html?cat=Networking">Networking</a></li>
                        <li><a href="shop.html?cat=Storage">Storage</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="footer-heading">Services</h4>
                    <ul class="footer-links">
                        <li><a href="services.html">Repair Hub</a></li>
                        <li><a href="services.html?cat=Diagnostic">Diagnostics</a></li>
                        <li><a href="services.html?cat=Custom">Custom Builds</a></li>
                        <li><a href="tracking.html">Order Tracking</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="footer-heading">Company</h4>
                    <ul class="footer-links">
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="support.html">Contact Support</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                <div class="footer-newsletter">
                    <h4 class="footer-heading">Newsletter</h4>
                    <p>Subscribe to receive technical updates and inventory arrivals.</p>
                    <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed!')">
                        <input type="email" placeholder="Email Address" required>
                        <button type="submit" class="newsletter-btn">Join</button>
                    </form>
                </div>
            </div>

            <div class="footer-bottom">
                <div>&copy; 2025 Nexus Flow Solutions. All Rights Reserved.</div>
                <div class="payment-icons">
                    <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-stripe"></i>
                    <i class="fab fa-cc-apple-pay"></i>
                </div>
            </div>
        `;

        const wrapper = document.getElementById('nexus-footer-wrapper');
        if (wrapper) wrapper.innerHTML = html;
    }

    document.addEventListener('DOMContentLoaded', initFooter);
})();