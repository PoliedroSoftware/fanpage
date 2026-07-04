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

  document.querySelectorAll(
    '.card, .feature-item, .beneficio-card, .plan-card, .trust-card, .section-header, .retail-card'
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

  /* ===== ODOO BARS ANIMATION ===== */
  const odooBars = document.querySelector('.odoo-bars');
  if (odooBars) {
    const barsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          document.querySelectorAll('.odoo-bar').forEach(function (bar, i) {
            const finalHeight = bar.style.height;
            bar.style.height = '0%';
            setTimeout(function () {
              bar.style.transition = 'height 0.6s ease ' + (i * 0.08) + 's';
              bar.style.height = finalHeight;
            }, 100);
          });
          barsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    barsObserver.observe(odooBars);
  }
});
