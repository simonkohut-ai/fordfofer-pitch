/**
 * Golo Čapo Motion System
 * Lightweight scroll animations using IntersectionObserver
 * < 5KB, no dependencies, respects prefers-reduced-motion
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If reduced motion, skip animations
  if (prefersReducedMotion) {
    // Instantly reveal all elements
    document.addEventListener('DOMContentLoaded', function() {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => el.classList.add('is-visible'));
    });
    return;
  }

  // IntersectionObserver options
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Animation variants
  const variants = {
    up: { transform: 'translateY(16px)' },
    fade: { transform: 'none' },
    left: { transform: 'translateX(-16px)' },
    right: { transform: 'translateX(16px)' },
    scale: { transform: 'scale(0.95)' }
  };

  // Observer callback
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = parseInt(element.dataset.delay || '0', 10);
        
        setTimeout(() => {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }, delay);
      }
    });
  }

  // Initialize observer
  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Observe all reveal elements when DOM is ready
  function init() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      const variant = el.dataset.reveal || 'up';
      const baseTransform = variants[variant]?.transform || variants.up.transform;
      
      // Set initial transform if not already set by CSS
      if (!el.style.transform) {
        el.style.transform = baseTransform;
      }
      
      observer.observe(el);
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

