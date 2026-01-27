/**
 * PROJECT CAROUSEL CONTROLLER
 * This script manages the horizontal movement of the project slides under PARTS OVERVIEW.
 */

// 1. SELECTING ELEMENTS: We grab the parts of the page we need to interact with.
// The 'track' is the long horizontal div containing all project slides.
const track = document.querySelector('.carousel-track');
// 'slides' is an array of every individual project div found inside that track.
const slides = Array.from(track.children);

// These are the left and right navigation buttons.
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// 2. STATE MANAGEMENT: This variable tracks which slide is currently on screen.
// We start at 0 (the first project, "SuperSimple").
let currentIndex = 0;

/**
 * MOVE LOGIC: This function handles the actual visual shift.
 * It uses CSS 'transform' to slide the entire track left or right.
 */
const updateCarousel = () => {
    // We move the track by -100% for every index. 
    // Example: Slide 2 (index 1) moves the track -100% to the left, 
    // bringing the second slide into the viewing window.
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
};

/**
 * EVENT LISTENERS: These detect user actions (clicks/keypresses) 
 * and tell the carousel what to do.
 */

// When 'Next' is clicked:
nextBtn.addEventListener('click', () => {
    // Increment the index by 1. 
    // The '%' (modulo) operator acts as a safety loop: 
    // if we are on the last slide, it resets the index back to 0.
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

// When 'Previous' is clicked:
prevBtn.addEventListener('click', () => {
    // Decrement the index by 1.
    // We add 'slides.length' before the modulo to ensure the number 
    // stays positive when jumping from the first slide back to the last.
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Hero Portrait Image Rotator
let currentPhotoIndex = 0;
const photos = document.querySelectorAll('.hero-slide');

function rotatePhotos() {
    // Hide current photo
    photos[currentPhotoIndex].classList.replace('opacity-100', 'opacity-0');
    
    // Increment index
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    
    // Show next photo
    photos[currentPhotoIndex].classList.replace('opacity-0', 'opacity-100');
}

// Run every 10 seconds (10000ms)
setInterval(rotatePhotos, 10000);

/**
 * ACCESSIBILITY & UX: Adding keyboard support so users can 
 * navigate with their arrow keys.
 */
document.addEventListener('keydown', (e) => {
    // If the user hits the right arrow key, trigger a "click" on the next button.
    if (e.key === 'ArrowRight') nextBtn.click();
    // If the user hits the left arrow key, trigger a "click" on the prev button.
    if (e.key === 'ArrowLeft') prevBtn.click();
});

/**
 * BROWSER RESIZE FIX: 
 * If the user rotates their phone or resizes their browser window,
 * we re-run updateCarousel to ensure the slide is perfectly centered.
 */

window.addEventListener('resize', updateCarousel);
