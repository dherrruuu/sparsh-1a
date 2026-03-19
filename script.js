const navLinks = document.querySelectorAll('.nav-link');
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');

hamburger?.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  }
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

// Mobile scaling fix
function handleMobileScaling() {
  const viewport = document.querySelector('meta[name="viewport"]');
  const isMobile = window.innerWidth <= 640;
  
  if (isMobile) {
    // Prevent zoom on input focus
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    // Fix contact page elements
    const mapSection = document.querySelector('.map-section');
    const contactQuick = document.querySelector('.contact-quick');
    const branchesSection = document.querySelector('.branches-section');
    
    if (mapSection) {
      mapSection.style.maxWidth = '100%';
      mapSection.style.overflowX = 'hidden';
    }
    
    if (contactQuick) {
      contactQuick.style.maxWidth = '100%';
      contactQuick.style.overflowX = 'hidden';
    }
    
    if (branchesSection) {
      branchesSection.style.maxWidth = '100%';
      branchesSection.style.overflowX = 'hidden';
    }
    
    // Ensure all sections don't overflow
    document.querySelectorAll('.section').forEach(section => {
      section.style.maxWidth = '100%';
      section.style.overflowX = 'hidden';
    });
    
    // Fix map iframe responsiveness
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
      const iframe = mapContainer.querySelector('iframe');
      if (iframe) {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
      }
    }
  } else {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
  }
}

// Run on load
window.addEventListener('load', handleMobileScaling);

// Run on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(handleMobileScaling, 250);
});

// Prevent horizontal scroll
document.body.style.overflowX = 'hidden';
document.documentElement.style.overflowX = 'hidden';
