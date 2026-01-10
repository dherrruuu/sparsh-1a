const navLinks = document.querySelectorAll('.nav-link');
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Save scroll position on our-products only (for return navigation)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link || !link.href || link.href.startsWith('#')) return;

  const href = link.getAttribute('href');
  const currentPage = window.location.pathname.split('/').pop();

  // Only store when leaving our-products toward a product page
  if (currentPage === 'our-products.html' && href && href.includes('product-')) {
    sessionStorage.setItem('scrollPositionPath', 'our-products.html');
    sessionStorage.setItem('scrollPositionY', window.scrollY.toString());
  }
});

// Restore scroll position when landing on our-products
window.addEventListener('load', () => {
  const currentPage = window.location.pathname.split('/').pop();
  const storedPath = sessionStorage.getItem('scrollPositionPath');
  const storedY = sessionStorage.getItem('scrollPositionY');

  if (currentPage === 'our-products.html' && storedPath === 'our-products.html' && storedY !== null) {
    window.scrollTo(0, parseInt(storedY));
    sessionStorage.removeItem('scrollPositionPath');
    sessionStorage.removeItem('scrollPositionY');
  }
});

// Image modal functionality
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const productImages = document.querySelectorAll('.product-image');
const knowMoreButtons = document.querySelectorAll('.product-info a.solid-btn');

// Open modal when clicking product image
productImages.forEach((img) => {
  img.addEventListener('click', () => {
    modalImage.src = img.src;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

closeModal?.addEventListener('click', () => {
  imageModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

imageModal?.addEventListener('click', (e) => {
  if (e.target === imageModal) {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Keyboard shortcut to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageModal.classList.contains('active')) {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    const note = document.createElement('div');
    note.textContent = 'Thanks. We will reach out within one business day.';
    note.className = 'form-note';
    form.appendChild(note);
    setTimeout(() => note.remove(), 4000);
  });
}
