/* ============================================
   mnf — main.js
   ============================================ */

// --- SCROLL REVEAL ---
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children of the same parent slightly
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
          : [];
        const delay = siblings.indexOf(entry.target) * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


// --- STICKY NAV ---
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });


// --- MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

const openMenu = () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
};

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));


// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = contactForm.querySelector('#name').value.trim();
  const email   = contactForm.querySelector('#email').value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Simple validation
  if (!name) {
    showFormFeedback('Bitte geben Sie Ihren Namen ein.', 'error');
    return;
  }
  if (!email || !emailRx.test(email)) {
    showFormFeedback('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
    return;
  }

  // Simulate submission (replace with fetch() to your backend/form service)
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Wird gesendet…';
  btn.disabled = true;

  setTimeout(() => {
    showFormFeedback('Vielen Dank — wir melden uns innerhalb eines Werktages.', 'success');
    contactForm.reset();
    btn.textContent = 'Anfrage senden →';
    btn.disabled = false;
  }, 1400);
});

function showFormFeedback(message, type) {
  // Remove existing
  const existing = contactForm.querySelector('.form-feedback');
  if (existing) existing.remove();

  const el = document.createElement('p');
  el.className = 'form-feedback';
  el.textContent = message;
  el.style.cssText = `
    font-size: 0.88rem;
    padding: 13px 16px;
    border-radius: 4px;
    text-align: center;
    ${type === 'success'
      ? 'background: rgba(200,169,106,0.12); color: #c8a96a; border: 1px solid rgba(200,169,106,0.3);'
      : 'background: rgba(220,60,60,0.1); color: #e07070; border: 1px solid rgba(220,60,60,0.25);'
    }
  `;

  contactForm.appendChild(el);

  // Auto-remove after 6 seconds
  setTimeout(() => el.remove(), 6000);
}


// --- SMOOTH ANCHOR OFFSET (account for fixed nav) ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});
