/**
 * WARREN SPIER WEBSITE CONTROLLER
 * This script runs once the page is fully loaded.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PROJECT CAROUSEL CONTROLLER ---
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // We get the slides inside the function to ensure we count all 4
    const slides = Array.from(track.children);
    let currentIndex = 0;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });
    }

    // --- 2. HERO PORTRAIT IMAGE ROTATOR ---
    let currentPhotoIndex = 0;
    const photos = document.querySelectorAll('.hero-slide');

    // Only start the timer if the images were found
    if (photos.length > 0) {
        function rotatePhotos() {
            // Hide current photo by swapping Tailwind opacity classes
            photos[currentPhotoIndex].classList.remove('opacity-100');
            photos[currentPhotoIndex].classList.add('opacity-0');
            
            // Move to next photo index
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            
            // Show next photo
            photos[currentPhotoIndex].classList.remove('opacity-0');
            photos[currentPhotoIndex].classList.add('opacity-100');
        }

        // Cycle every 10 seconds
        setInterval(rotatePhotos, 10000);
    }

    // --- 3. KEYBOARD NAVIGATION ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
        if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    });
});
