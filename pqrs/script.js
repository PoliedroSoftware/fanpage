document.addEventListener('DOMContentLoaded', function () {

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ===== MOBILE MENU TOGGLE ===== */
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });

  /* ===== CLOSE MOBILE MENU ON LINK CLICK ===== */
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
    });
  });

  /* ===== CLOSE MENU ON OUTSIDE CLICK ===== */
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });

  /* ===== SCROLL ANIMATIONS ===== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe sections, cards, and feature items
  document.querySelectorAll(
    '.card, .channel-card, .ai-card, .feature-item, .beneficio-card, .plan-card, .trust-card, .section-header'
  ).forEach(function (el) {
    el.classList.add('animate-in');
    observer.observe(el);
  });

  /* ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===== COUNTER ANIMATION FOR BENEFIT NUMBERS ===== */
  const benefitNumbers = document.querySelectorAll('.beneficio-number');
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'countUp 1s ease forwards';
      }
    });
  }, { threshold: 0.5 });

  benefitNumbers.forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ===== HERO PARALLAX EFFECT ===== */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrollY * 0.4) + 'px)';
      }
    }, { passive: true });
  }
});
