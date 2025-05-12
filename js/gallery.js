/**
 * Gallery JavaScript file for Vidya Bharati Academy website
 * Handles gallery filtering and lightbox functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize gallery
  initializeGallery();
  setupLightbox();
});

/**
 * Initialize gallery filtering functionality
 */
function initializeGallery() {
  const galleryContainer = document.querySelector('.gallery-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (!galleryContainer || filterButtons.length === 0) return;
  
  // Setup click handlers for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter gallery items
      const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
      
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          // Show matching items with animation
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide non-matching items with animation
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * Setup lightbox for gallery images
 */
function setupLightbox() {
  const galleryLinks = document.querySelectorAll('.gallery-link');
  
  if (galleryLinks.length === 0) return;
  
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'gallery-lightbox';
  lightbox.className = 'gallery-lightbox';
  
  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  
  const lightboxImage = document.createElement('img');
  lightboxImage.className = 'lightbox-image';
  
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'lightbox-caption';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'lightbox-close';
  closeButton.innerHTML = '&times;';
  
  const prevButton = document.createElement('button');
  prevButton.className = 'lightbox-nav lightbox-prev';
  prevButton.innerHTML = '&#10094;';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'lightbox-nav lightbox-next';
  nextButton.innerHTML = '&#10095;';
  
  // Assemble lightbox structure
  lightboxContent.appendChild(lightboxImage);
  lightboxContent.appendChild(lightboxCaption);
  lightbox.appendChild(closeButton);
  lightbox.appendChild(prevButton);
  lightbox.appendChild(nextButton);
  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);
  
  let currentIndex = 0;
  
  // Setup click handlers for gallery items
  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });
  
  // Open lightbox with selected image
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'flex';
    setTimeout(() => {
      lightbox.style.opacity = '1';
    }, 10);
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
  
  // Update lightbox image and caption
  function updateLightboxImage() {
    const currentLink = galleryLinks[currentIndex];
    const imageSrc = currentLink.getAttribute('href');
    const caption = currentLink.querySelector('.gallery-info h5').textContent;
    const subcaption = currentLink.querySelector('.gallery-info p').textContent;
    
    // Add loading animation
    lightboxImage.style.opacity = '0';
    
    // Update image and caption
    lightboxImage.src = imageSrc;
    lightboxCaption.innerHTML = `<h4>${caption}</h4><p>${subcaption}</p>`;
    
    // Show image when loaded
    lightboxImage.onload = () => {
      lightboxImage.style.opacity = '1';
    };
  }
  
  // Navigation functions
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryLinks.length) % galleryLinks.length;
    updateLightboxImage();
  }
  
  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryLinks.length;
    updateLightboxImage();
  }
  
  // Setup lightbox event listeners
  closeButton.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', showPrevImage);
  nextButton.addEventListener('click', showNextImage);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });
  
  // Add swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const threshold = 50;
    
    if (touchEndX - touchStartX > threshold) {
      // Swipe right, show previous
      showPrevImage();
    } else if (touchStartX - touchEndX > threshold) {
      // Swipe left, show next
      showNextImage();
    }
  }
}

/**
 * Add masonry layout to gallery if needed
 * (for more dynamic gallery layouts)
 */
function setupMasonryLayout() {
  const galleryContainer = document.querySelector('.gallery-container');
  if (!galleryContainer) return;
  
  // Simple masonry layout using CSS Grid with auto-placement
  galleryContainer.style.display = 'grid';
  galleryContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
  galleryContainer.style.gridAutoRows = '250px';
  galleryContainer.style.gridGap = '15px';
  
  // For more control, specific items can be positioned explicitly
  const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
  
  // Apply random grid spans to create visual interest (in a real project, this would be intentional)
  galleryItems.forEach((item, index) => {
    if (index % 3 === 0) {
      item.style.gridRowEnd = 'span 2';
    }
  });
}

// Add CSS for lightbox
function addLightboxStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .gallery-lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: none;
      opacity: 0;
      z-index: 9999;
      transition: opacity 0.3s ease;
      justify-content: center;
      align-items: center;
    }
    
    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 80vh;
      text-align: center;
    }
    
    .lightbox-image {
      max-width: 100%;
      max-height: 75vh;
      transition: opacity 0.3s ease;
      border-radius: 4px;
    }
    
    .lightbox-caption {
      color: white;
      padding: 15px 0;
      text-align: center;
    }
    
    .lightbox-caption h4 {
      color: white;
      margin-bottom: 5px;
    }
    
    .lightbox-caption p {
      margin: 0;
      opacity: 0.8;
    }
    
    .lightbox-close {
      position: absolute;
      top: 20px;
      right: 30px;
      font-size: 40px;
      color: white;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 1000;
    }
    
    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 30px;
      color: white;
      background: rgba(0, 0, 0, 0.3);
      border: none;
      padding: 15px 15px;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.3s ease;
    }
    
    .lightbox-nav:hover {
      background: rgba(0, 0, 0, 0.6);
    }
    
    .lightbox-prev {
      left: 20px;
    }
    
    .lightbox-next {
      right: 20px;
    }
    
    @media (max-width: 768px) {
      .lightbox-prev, .lightbox-next {
        padding: 10px 12px;
        font-size: 24px;
      }
      
      .lightbox-close {
        top: 10px;
        right: 10px;
        font-size: 30px;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Add lightbox styles when DOM is ready
document.addEventListener('DOMContentLoaded', addLightboxStyles);