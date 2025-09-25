// Hero Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
const totalSlides = slides.length;

/**
 * Display the slide at the specified index
 * @param {number} index - The index of the slide to show
 */
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

/**
 * Change slide by direction (next/previous)
 * @param {number} direction - 1 for next, -1 for previous
 */
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    // Loop back to first slide if we're past the last
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } 
    // Loop to last slide if we're before the first
    else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
}

/**
 * Jump to a specific slide
 * @param {number} index - The slide number (1-based)
 */
function currentSlide(index) {
    currentSlideIndex = index - 1; // Convert to 0-based index
    showSlide(currentSlideIndex);
}

/**
 * Auto-advance to the next slide
 */
function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

/**
 * Handle touch swipe gestures
 */
function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

/**
 * Initialize slider functionality when DOM is loaded
 */
function initSlider() {
    // Ensure we have slides before initializing
    if (slides.length === 0) {
        console.warn('No slides found for hero slider');
        return;
    }

    // Start auto-sliding every 5 seconds
    let autoSlideInterval = setInterval(autoSlide, 5000);

    // Get slider container
    const sliderContainer = document.querySelector('.hero-slider');
    
    if (sliderContainer) {
        // Pause auto-slide when user hovers over slider
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        // Resume auto-slide when user stops hovering
        sliderContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(autoSlide, 5000);
        });

        // Touch/swipe support for mobile devices
        let startX = 0;
        let endX = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });
    }
}

// Initialize slider when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    // DOM is already loaded
    initSlider();
}