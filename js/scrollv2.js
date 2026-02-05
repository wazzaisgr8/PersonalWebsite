/**
 * BADGE CAROUSEL CONTROLLER
 * Handles the infinite scrolling certification badges in the Specifications section
 * Namespaced to avoid conflicts with the Parts Overview project carousel
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only target the badge carousel specifically
    const badgeWrapper = document.getElementById('badgeCarouselWrapper');
    const badgeTrack = document.getElementById('badgeCarouselTrack');
    
    // Exit early if elements don't exist (prevents errors on pages without badge carousel)
    if (!badgeWrapper || !badgeTrack) {
        console.log('Badge carousel elements not found, skipping initialization');
        return;
    }
    
    // Pause on hover over badge wrapper only
    badgeWrapper.addEventListener('mouseenter', function() {
        badgeTrack.classList.add('paused');
    });

    badgeWrapper.addEventListener('mouseleave', function() {
        badgeTrack.classList.remove('paused');
    });

    // Badge interactions
    const badges = badgeWrapper.querySelectorAll('.badge-card');
    
    badges.forEach(function(badge) {
        // Click to open verification link if provided
        badge.addEventListener('click', function() {
            const badgeName = badge.getAttribute('data-name');
            const verifyUrl = badge.getAttribute('data-verify');
            
            // Remove active from all badges
            badges.forEach(function(b) {
                b.classList.remove('active');
            });
            
            // Add active to clicked badge
            badge.classList.add('active');
            
            console.log('Badge clicked:', badgeName);
            
            // Open verification URL if provided
            if (verifyUrl) {
                window.open(verifyUrl, '_blank');
            }
        });

        // Keyboard accessibility
        badge.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                badge.click();
            }
        });
    });

    // Clear active state when clicking outside badge carousel
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.badge-carousel-wrapper')) {
            badges.forEach(function(b) {
                b.classList.remove('active');
            });
        }
    });

    // Touch handling for mobile
    badgeWrapper.addEventListener('touchstart', function() {
        badgeTrack.classList.add('paused');
    }, {passive: true});

    badgeWrapper.addEventListener('touchend', function() {
        setTimeout(function() {
            badgeTrack.classList.remove('paused');
        }, 2000);
    });

    // Keyboard navigation - only affects badges when focused
    badgeWrapper.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            badges.forEach(function(b) {
                b.classList.remove('active');
            });
        }
    });
});
