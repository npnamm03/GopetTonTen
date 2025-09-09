// JavaScript for Bảo Vệ Việt Thăng Long Website

const navToggle = document.getElementById('nav-toggle');
const mainMenu = document.getElementById('main-menu');

navToggle.addEventListener('click', function () {
    mainMenu.classList.toggle('active');

    // Optional: Change the icon from a hamburger to an X and back
    const icon = navToggle.querySelector('i');
    if (mainMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Optional: Close the menu when a link is clicked
const navLinks = document.querySelectorAll('#main-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
            navToggle.querySelector('i').classList.remove('fa-times');
            navToggle.querySelector('i').classList.add('fa-bars');
        }
    });
});

// Count-up animation for metrics
const metricsSection = document.getElementById('metrics');

if (metricsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.metric-item h3');

                counters.forEach(counter => {
                    if (counter.dataset.animated) return;
                    counter.dataset.animated = 'true';

                    const target = parseInt(counter.innerText.replace(/[+,\.]/g, ''), 10);
                    const suffix = counter.innerText.includes('+') ? '+' : '';

                    let count = 0;
                    const duration = 3000; // 2 seconds
                    const increment = target / (duration / 16); // ~60fps

                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count).toLocaleString();
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target.toLocaleString() + suffix;
                        }
                    };

                    requestAnimationFrame(updateCount);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(metricsSection);
}


// --- Horizontal Scroll Buttons Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const scrollWrappers = document.querySelectorAll('.horizontal-scroll-wrapper');

    scrollWrappers.forEach(wrapper => {
        const scrollContent = wrapper.querySelector('.horizontal-scroll');
        const prevBtn = wrapper.querySelector('.scroll-btn.prev');
        const nextBtn = wrapper.querySelector('.scroll-btn.next');

        if (!scrollContent || !prevBtn || !nextBtn) return;

        const updateButtonState = () => {
            // Use a small tolerance to handle potential floating point inaccuracies
            const scrollLeft = Math.round(scrollContent.scrollLeft);
            const scrollWidth = Math.round(scrollContent.scrollWidth);
            const clientWidth = Math.round(scrollContent.clientWidth);

            const atStart = scrollLeft < 1;
            const atEnd = scrollWidth - scrollLeft - clientWidth < 1;

            prevBtn.disabled = atStart;
            nextBtn.disabled = atEnd;
        };

        nextBtn.addEventListener('click', () => {
            const scrollAmount = scrollContent.clientWidth * 0.8;
            scrollContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const scrollAmount = scrollContent.clientWidth * 0.8;
            scrollContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        // Update buttons when user scrolls manually
        scrollContent.addEventListener('scroll', updateButtonState, { passive: true });

        // Initial check and update on resize
        // Use a small delay to ensure layout is fully calculated
        const debouncedUpdate = () => {
            clearTimeout(wrapper.resizeTimer);
            wrapper.resizeTimer = setTimeout(updateButtonState, 150);
        };

        window.addEventListener('resize', debouncedUpdate);
        // Also check on load
        debouncedUpdate();
    });
}); 