document.addEventListener('DOMContentLoaded', function() {
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function updateNavbar() {
    if (window.scrollY > 50) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  navToggle.addEventListener('click', function() { navLinks.classList.toggle('active'); });
  document.querySelectorAll('.nav-link').forEach(function(l) {
    l.addEventListener('click', function() { navLinks.classList.remove('active'); });
  });
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target)) navLinks.classList.remove('active');
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.card, .servicio-row, .section-header').forEach(function(el) {
    el.classList.add('animate-in');
    observer.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        var navHeight = navbar.offsetHeight;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - navHeight, behavior: 'smooth' });
      }
    });
  });

  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY;
      if (scrollY < window.innerHeight) heroBg.style.transform = 'translateY(' + (scrollY * 0.4) + 'px)';
    }, { passive: true });
  }
});
