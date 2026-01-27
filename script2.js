/**
 * WARREN SPIER WEBSITE CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PROJECT CAROUSEL CONTROLLER ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // --- 2. HERO PORTRAIT IMAGE ROTATOR ---
    let currentPhotoIndex = 0;
    const photos = document.querySelectorAll('.hero-slide');

    // Only run if photos actually exist on the page
    if (photos.length > 0) {
        function rotatePhotos() {
            // Hide current photo
            photos[currentPhotoIndex].classList.replace('opacity-100', 'opacity-0');
            
            // Increment index
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            
            // Show next photo
            photos[currentPhotoIndex].classList.replace('opacity-0', 'opacity-100');
        }

        // Run every 10 seconds
        setInterval(rotatePhotos, 10000);
    }

    // --- 3. ACCESSIBILITY & UTILS ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    });

    window.addEventListener('resize', updateCarousel);
});
