/**
 * ibzie.dev — Client-side interactions
 */

(function () {
  'use strict';

  // Remove no-js class to enable JS-dependent styles
  document.documentElement.classList.remove('no-js');

  // === Active nav link detection ===
  function setActiveNav() {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';

    // Normalize: treat root path as index.html
    if (page === '' || path === '/') {
      page = 'index.html';
    }

    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === page) {
        link.classList.add('active');
      }
    });
  }

  // === Mobile nav toggle ===
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    var overlay = document.querySelector('.nav-overlay');

    if (!toggle || !navLinks) return;

    function openNav() {
      navLinks.classList.add('open');
      toggle.classList.add('open');
      if (overlay) overlay.classList.add('visible');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      if (overlay) overlay.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeNav();
        toggle.focus();
      }
    });

    // Close on resize (if desktop breakpoint reached)
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
        closeNav();
      }
    });
  }

  // === Scroll-triggered reveal animations ===
  function initRevealAnimations() {
    var reveals = document.querySelectorAll('.reveal');

    if (!reveals.length || !('IntersectionObserver' in window)) {
      // No JS fallback: show all elements
      reveals.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // === Init ===
  setActiveNav();
  initMobileNav();
  initRevealAnimations();
})();
