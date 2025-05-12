/**
 * Main JavaScript file for Vidya Bharati Academy website
 * Handles core functionalities and initializations
 */

// DOM elements
const navbar = document.getElementById('mainNav');
const backToTopButton = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS with settings
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    disable: 'mobile'
  });

  // Setup other functionality
  setupNavbarScrollEffect();
  setupScrollToTopButton();
  setupSmoothScrolling();
  setupContactForm();
});

/**
 * Change navbar appearance on scroll
 */
function setupNavbarScrollEffect() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Initial check in case page is loaded scrolled down
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  }
}

/**
 * Back to top button functionality
 */
function setupScrollToTopButton() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      // Close mobile menu if open
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }

      // Scroll to target
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact form handling
 */
function setupContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;

    formInputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }

      if (input.type === 'email' && input.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
          isValid = false;
          input.classList.add('is-invalid');
        }
      }
    });

    if (isValid) {
      // Display success message (in a real project, this would send data to a server)
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
      
      // Simulate sending (would be replaced with actual API call)
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Return button to original state
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        }, 2000);
      }, 1500);
    }
  });

  // Reset validation on input
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
    });
  });
}

/**
 * Create and initialize scroll progress indicator
 */
function createScrollProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

// Create scroll progress indicator
createScrollProgressIndicator();