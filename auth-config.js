/**
 * NEXUSFLOW GLOBAL CONFIGURATION & AUTH CORE
 * Bridging AWS Cognito Brain with Nexus-Sample Styles
 */

const NEXUS_CONFIG = {
    // 1. AWS COGNITO IDENTITY (THE BRAIN)
    auth: {
        UserPoolId: 'us-east-1_IK57zG64M',
        ClientId: '668q6c6krjv8b6n81cfc78n9a4',
        Region: 'us-east-1'
    },

    // 2. API GATEWAY ENDPOINTS
    api: {
        baseUrl: 'https://yskkdnff93.execute-api.us-east-1.amazonaws.com/prod',
        endpoints: {
            products: '/products',
            orders: '/orders',
            repairs: '/repairs'
        }
    },

    // 3. UI STYLE CONSTANTS (FOLLOWING SAMPLE.HTML LOGIC)
    ui: {
        colors: {
            primary: '#00f3ff',     // Nexus Cyan
            bg: '#0a0a0a',          // Nexus Dark
            success: '#10b981',     // Green from Sample
            error: '#ff4d4d',       // Red from Sample
            warning: '#f59e0b'      // Amber from Sample
        },
        selectors: {
            headerId: 'nexus-header',
            footerId: 'nexus-footer',
            alertAreaId: 'alert-area'
        }
    }
};

/**
 * SHARED UTILITIES: ALERT SYSTEM (From sample.html)
 * Use: NexusUtils.showAlert("Order Verified", "success");
 */
const NexusUtils = {
    showAlert(message, type = 'info') {
        const alertArea = document.getElementById(NEXUS_CONFIG.ui.selectors.alertAreaId);
        if (!alertArea) {
            // Create alert area if it doesn't exist
            const area = document.createElement('div');
            area.id = NEXUS_CONFIG.ui.selectors.alertAreaId;
            area.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
            document.body.appendChild(area);
        }

        const alert = document.createElement('div');
        // Combined Nexus styles with Sample.html logic
        alert.style.cssText = `
            background: rgba(10, 10, 10, 0.95);
            border-left: 4px solid ${NEXUS_CONFIG.ui.colors[type] || NEXUS_CONFIG.ui.colors.primary};
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            font-family: 'Inter', sans-serif;
            animation: slideIn 0.3s ease forwards;
        `;

        alert.innerHTML = `
            <span>${message}</span>
            <button style="background:none; border:none; color:#888; cursor:pointer; font-size:18px;" 
                    onclick="this.parentElement.remove()">×</button>
        `;

        document.getElementById(NEXUS_CONFIG.ui.selectors.alertAreaId).appendChild(alert);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    },

    // Helper to format currency consistently
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
        }).format(amount);
    }
};

// Protect the configuration from accidental modification
Object.freeze(NEXUS_CONFIG);