/* =========================================================
   PHO OLD TOWN — Interactions
   ========================================================= */

// ── Nav: scroll state ──────────────────────────────────────
const nav = document.getElementById('nav');
function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Nav: mobile burger ─────────────────────────────────────
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', e => {
  if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ── Smooth active nav links on scroll ─────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Intersection Observer: animate on scroll ───────────────
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Pause all card animations until in view
document.querySelectorAll('.menu__card, .reviews__card').forEach(el => {
  el.style.animationPlayState = 'paused';
  animObserver.observe(el);
});

// ── Parallax hero on scroll ────────────────────────────────
const heroImg = document.querySelector('.hero__img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
    }
  }, { passive: true });
}
