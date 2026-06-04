// Scroll Animation Setup
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation if it's a stat card
            if(entry.target.classList.contains('stat-card')) {
                const counter = entry.target.querySelector('.counter');
                if(counter && !counter.classList.contains('counted')) {
                    animateValue(counter, 0, parseInt(counter.getAttribute('data-target')), 2000);
                    counter.classList.add('counted');
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right').forEach(el => {
    observer.observe(el);
});

// Counter Animation Function
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function for smoother counting
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        // Handle the "<3" special case
        const currentVal = Math.floor(easeOutQuart * (end - start) + start);
        if(obj.getAttribute('data-target') === '3') {
             obj.innerHTML = currentVal === end ? '&lt;3' : '&lt;' + currentVal;
        } else {
             obj.innerHTML = currentVal;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
