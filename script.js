// 1. Мобильное меню
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// 2. Переключатель темы (запоминается в браузере)
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme');
if (saved) root.dataset.theme = saved;
const setIcon = () => themeBtn.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';
setIcon();
themeBtn.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
  setIcon();
});

// 3. Плавная прокрутка + закрытие меню после выбора пункта
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
  });
});

// 4. Форма с проверкой
const form = document.getElementById('form');
const rules = {
  name:  v => v.trim().length >= 2 || 'Введите имя (не короче 2 букв).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Введите корректный адрес почты.',
  msg:   v => v.trim().length >= 10 || 'Напишите хотя бы 10 символов.'
};
function check(field) {
  const result = rules[field.name](field.value);
  const box = form.querySelector(`[data-for="${field.name}"]`);
  box.textContent = result === true ? '' : result;
  field.classList.toggle('invalid', result !== true);
  return result === true;
}
form.querySelectorAll('input,textarea').forEach(f => f.addEventListener('blur', () => check(f)));
form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = [...form.querySelectorAll('input,textarea')].map(check).every(Boolean);
  document.getElementById('ok').hidden = !ok;
  if (ok) form.reset();
});
