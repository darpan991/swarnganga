// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
   if (window.scrollY > 100) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
});

// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

function openMobileNav() {
   mobileNav.classList.add('active');
   mobileOverlay.classList.add('active');
   document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
   mobileNav.classList.remove('active');
   mobileOverlay.classList.remove('active');
   document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMobileNav);
mobileNavClose.addEventListener('click', closeMobileNav);
mobileOverlay.addEventListener('click', closeMobileNav);

mobileNavLinks.forEach(link => {
   link.addEventListener('click', closeMobileNav);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href === '#') {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });
         return;
      }
      const target = document.querySelector(href);
      if (target) {
         const headerHeight = header.offsetHeight;
         const targetPosition = target.offsetTop - headerHeight;
         window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
         });
      }
   });
});

// Hero image slideshow
const slides = document.querySelectorAll('.hero-slide');
const heroTitle = document.getElementById('heroTitle');
const heroPrice = document.getElementById('heroPrice');
const heroTagline = document.getElementById('heroTagline');
const heroHeading = document.getElementById('heroHeading');
const heroDescription = document.getElementById('heroDescription');
let currentSlide = 0;

function changeSlide() {
   slides[currentSlide].classList.remove('active');
   currentSlide = (currentSlide + 1) % slides.length;

   // Fade out image-overlay text
   heroTitle.style.opacity = '0';
   heroPrice.style.opacity = '0';

   // Fade out left-side hero content
   if (heroTagline) heroTagline.style.opacity = '0';
   if (heroHeading) heroHeading.style.opacity = '0';
   if (heroDescription) heroDescription.style.opacity = '0';

   setTimeout(() => {
      const slide = slides[currentSlide];

      heroTitle.textContent = slide.dataset.title;
      heroPrice.textContent = slide.dataset.price;
      heroTitle.style.opacity = '1';
      heroPrice.style.opacity = '1';

      if (heroTagline && slide.dataset.tagline) {
         heroTagline.textContent = slide.dataset.tagline;
         heroTagline.style.opacity = '1';
      }
      if (heroHeading && slide.dataset.heading) {
         heroHeading.innerHTML = slide.dataset.heading;
         heroHeading.style.opacity = '1';
      }
      if (heroDescription && slide.dataset.desc) {
         heroDescription.textContent = slide.dataset.desc;
         heroDescription.style.opacity = '1';
      }
   }, 500);

   slides[currentSlide].classList.add('active');
}

setInterval(changeSlide, 4000);

// Form submission -> send straight to WhatsApp
const form = document.getElementById('appointmentForm');
form.addEventListener('submit', function (e) {
   e.preventDefault();
   const name = document.getElementById('name').value.trim();
   const email = document.getElementById('email').value.trim();
   const phone = document.getElementById('phone').value.trim();
   const message = document.getElementById('message').value.trim();

   const waNumber = "919675121215";
   let text = "Hello Swarnganga Jewellers, I would like to enquire.%0A%0A";
   text += "Name: " + encodeURIComponent(name) + "%0A";
   if (phone) text += "Phone: " + encodeURIComponent(phone) + "%0A";
   if (email) text += "Email: " + encodeURIComponent(email) + "%0A";
   if (message) text += "Message: " + encodeURIComponent(message);

   const waLink = "https://wa.me/" + waNumber + "?text=" + text;
   window.open(waLink, "_blank");
   form.reset();
});

// Intersection Observer for scroll animations
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.style.opacity = '1';
         entry.target.style.transform = 'translateY(0)';
      }
   });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section:not(.hero)').forEach(section => {
   section.style.opacity = '0';
   section.style.transform = 'translateY(30px)';
   section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
   observer.observe(section);
});
// ===== Festive Offer Popup (appears periodically) =====
(function () {
   const overlay = document.getElementById('sgPopupOverlay');
   const closeBtn = document.getElementById('sgPopupClose');
   if (!overlay || !closeBtn) return;

   let dismissedThisSession = false;

   function showPopup() {
      if (dismissedThisSession) return;
      overlay.classList.add('show');
   }
   function hidePopup() {
      overlay.classList.remove('show');
   }

   closeBtn.addEventListener('click', function () {
      dismissedThisSession = true;
      hidePopup();
   });
   overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
         dismissedThisSession = true;
         hidePopup();
      }
   });

   // First appearance after 12s, then every 45s if not dismissed
   setTimeout(showPopup, 12000);
   setInterval(function () {
      if (!overlay.classList.contains('show')) {
         showPopup();
      }
   }, 45000);
})();
