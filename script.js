// ============================================
// Navbar Hide/Show on Scroll
// ============================================
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
    } else {
        // At the top
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Lightbox Functionality
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Get all clickable images
const imageWrappers = document.querySelectorAll('.image-wrapper');
let currentImageIndex = 0;
let allImages = [];

// Create array of all images with their data
imageWrappers.forEach((wrapper, index) => {
    const img = wrapper.querySelector('img');
    const address = wrapper.getAttribute('data-address');

    allImages.push({
        src: img.src,
        alt: img.alt,
        caption: address || img.alt
    });

    // Add click event to open lightbox
    wrapper.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Update lightbox image
function updateLightboxImage() {
    const currentImage = allImages[currentImageIndex];
    lightboxImg.src = currentImage.src;
    lightboxImg.alt = currentImage.alt;
    lightboxCaption.textContent = currentImage.caption;
}

// Navigate to previous image
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    updateLightboxImage();
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    updateLightboxImage();
}

// Event Listeners for Lightbox
lightboxClose.addEventListener('click', closeLightbox);

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    previousImage();
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        previousImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // For now, just show an alert
    // In production, you would send this to a server or email service
    alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);

    // Reset form
    contactForm.reset();
});

// ============================================
// Scroll Indicator Animation
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (window.pageYOffset > heroBottom * 0.3) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ============================================
// Active Navigation Link Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = '#212529'; // eerie-black
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
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

// Observe property rows for fade-in effect
document.querySelectorAll('.property-row').forEach(row => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(30px)';
    row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(row);
});

// Observe service and pricing cards
document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// Preload hero image for better performance
// ============================================
window.addEventListener('load', () => {
    const heroImg = document.querySelector('.hero-image img');
    if (heroImg) {
        heroImg.style.opacity = '0';
        heroImg.style.transition = 'opacity 1s ease';

        setTimeout(() => {
            heroImg.style.opacity = '1';
        }, 100);
    }
});
