/**
 * Animations Module
 * Handles intersection observer animations and lazy loading
 */

class Animations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupLazyLoading();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all animated elements when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.animate-fadeInUp, .animate-slideInLeft, .animate-slideInRight');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.8s ease-out';
                observer.observe(el);
            });
        });
    }

    setupLazyLoading() {
        document.addEventListener('DOMContentLoaded', () => {
            // Lazy loading para imagens
            const images = document.querySelectorAll('img[loading="lazy"]');

            if ('loading' in HTMLImageElement.prototype) {
                // Browser suporta lazy loading nativo
                images.forEach(img => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                });
            } else {
                // Fallback para browsers sem suporte
                this.setupLazyLoadingFallback(images);
            }
        });
    }

    setupLazyLoadingFallback(images) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Method to trigger specific animations
    triggerAnimation(element, animationType) {
        if (!element) return;

        element.classList.add(`animate-${animationType}`);

        // Remove animation class after completion
        element.addEventListener('animationend', () => {
            element.classList.remove(`animate-${animationType}`);
        }, { once: true });
    }

    // Method to add entrance animations to elements
    addEntranceAnimation(selector, animationType = 'fadeInUp', delay = 0) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                this.triggerAnimation(el, animationType);
            }, delay + (index * 100));
        });
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animations;
}