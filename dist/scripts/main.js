/**
 * Main Application Script
 * Initializes all modules and handles global functionality
 */

class InvestimusApp {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            // Initialize Navigation module
            if (typeof Navigation !== 'undefined') {
                this.modules.navigation = new Navigation();
                console.log('✓ Navigation module initialized');
            }

            // Initialize Forms module
            if (typeof Forms !== 'undefined') {
                this.modules.forms = new Forms();
                console.log('✓ Forms module initialized');
            }

            // Initialize Animations module
            if (typeof Animations !== 'undefined') {
                this.modules.animations = new Animations();
                console.log('✓ Animations module initialized');
            }

            // Initialize additional features
            this.initializeAdditionalFeatures();

            console.log('🚀 Investimus App initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing app:', error);
        }
    }

    initializeAdditionalFeatures() {
        // Add any additional global features here
        this.setupGoogleAnalytics();
        this.setupPerformanceMonitoring();
        this.setupAccessibilityFeatures();
    }

    setupGoogleAnalytics() {
        // Placeholder for Google Analytics setup
        // gtag('config', 'GA_TRACKING_ID');
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // LCP (Largest Contentful Paint)
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('LCP:', entry.startTime);
                }
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // FID (First Input Delay)
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            }).observe({ entryTypes: ['first-input'] });
        }
    }

    setupAccessibilityFeatures() {
        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Skip to main content link
        this.addSkipLink();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50';
        skipLink.textContent = 'Pular para o conteúdo principal';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Public API methods
    getModule(moduleName) {
        return this.modules[moduleName];
    }

    reloadModule(moduleName) {
        if (this.modules[moduleName]) {
            delete this.modules[moduleName];
            this.initializeModules();
        }
    }
}

// Initialize the application
const investimusApp = new InvestimusApp();

// Make app globally available for debugging
window.InvestimusApp = investimusApp;