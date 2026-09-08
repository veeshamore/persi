const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  navigation.classList.toggle('is-open', opening);
  document.body.classList.toggle('menu-open', opening);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const filterButtons = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const target = button.dataset.filter;
    projects.forEach((project) => {
      const matches = target === 'all' || project.dataset.category.split(' ').includes(target);
      project.classList.toggle('is-hidden', !matches);
    });
  });
});

const form = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  fields.forEach((field) => field.classList.remove('is-invalid'));
  const invalid = fields.filter((field) => !field.checkValidity());

  if (invalid.length) {
    invalid.forEach((field) => field.classList.add('is-invalid'));
    formMessage.textContent = 'Please complete each field with a valid email address.';
    invalid[0].focus();
    return;
  }

  formMessage.textContent = 'Thanks. Your project note is ready to send.';
  form.querySelector('button').textContent = 'Note received';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

