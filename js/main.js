/* ─── Nav scroll ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── Mobile burger ─── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Reveal on scroll ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Before / After sliders ─── */
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(container => {
    const afterEl   = container.querySelector('.ba-after');
    const divider   = container.querySelector('.ba-divider');
    let dragging    = false;

    function setPosition(clientX) {
      const rect = container.getBoundingClientRect();
      const pct  = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      divider.style.left          = pct + '%';
      afterEl.style.clipPath      = `inset(0 ${100 - pct}% 0 0)`;
      afterEl.style.transition    = 'none';
    }

    /* Mouse events */
    container.addEventListener('mousedown', e => {
      dragging = true;
      setPosition(e.clientX);
    });
    window.addEventListener('mousemove', e => {
      if (dragging) setPosition(e.clientX);
    });
    window.addEventListener('mouseup', () => { dragging = false; });

    /* Touch events */
    container.addEventListener('touchstart', e => {
      dragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (dragging) {
        e.preventDefault();
        setPosition(e.touches[0].clientX);
      }
    }, { passive: false });
    window.addEventListener('touchend', () => { dragging = false; });
  });
}

initSliders();

/* ─── Contact form ─── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const orig = btn.textContent;
    btn.textContent = 'Message envoyé ✓';
    btn.disabled = true;
    btn.style.background = '#235e55';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
}
