/**
 * Navigation Module
 * Handles mobile menu toggle and smooth scrolling
 */

class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupNavbarScrollEffect();
    }

    setupMobileMenu() {
        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener("click", () => {
                const isOpen = !mobileMenu.classList.contains("hidden");
                mobileMenu.classList.toggle("hidden");
                mobileMenuButton.setAttribute("aria-expanded", !isOpen);
            });
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById("mobile-menu");
                    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                        mobileMenu.classList.add("hidden");
                    }
                }
            });
        });
    }

    setupNavbarScrollEffect() {
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('shadow-xl');
                } else {
                    navbar.classList.remove('shadow-xl');
                }
            }
        });
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}