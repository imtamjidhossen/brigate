const mobileMenuBar = document.querySelector(".mobileMenu")
const menuSubMenu = document.querySelectorAll(".dropdown")
const menu = document.querySelector(".menu")
const MenuBar = document.querySelector(".MenuBar")

// Add chevron icons to dropdowns
menuSubMenu.forEach(function(node) {
    const link = node.querySelector("a")
    // Check if chevron already exists
    if (!link.querySelector('i.fa-chevron-down')) {
        link.innerHTML += '<i class="fas fa-chevron-down"></i>'
    }
})

// Mobile menu toggle
mobileMenuBar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    menu.classList.toggle("ShowMenu")
})

// Desktop dropdown menu
menuSubMenu.forEach(function(node) {
    node.addEventListener("click", function(e) {
        // Only toggle on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            this.querySelector(".submenu").classList.toggle("ShowSubmenu");
        }
    })
})

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.MenuBarWraper') && menu.classList.contains('ShowMenu')) {
        menu.classList.remove('ShowMenu')
    }
})

// Counter Animation Function
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Trigger counter animation when section is in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const counterSection = document.querySelector('#whychoseus');
if (counterSection) {
    observer.observe(counterSection);
}

// Slider Navigation
const navDots = document.querySelectorAll('.nav-dot');
const slides = [
    'assets/Img/slide-2.jpg',
    'assets/Img/slide-1.jpg' // Add another slide image
];

let currentSlide = 0;

navDots.forEach(dot => {
    dot.addEventListener('click', function(e) {
        e.preventDefault();
        currentSlide = parseInt(this.getAttribute('data-slide'));
        updateSlider();
    });
});

function updateSlider() {
    const slider = document.querySelector('#Homeslider');
    if (slider && slides[currentSlide]) {
        slider.style.backgroundImage = `url(${slides[currentSlide]})`;
    }
    
    navDots.forEach(dot => dot.classList.remove('active'));
    if (navDots[currentSlide]) {
        navDots[currentSlide].classList.add('active');
    }
}

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}, 5000);

// Newsletter Form Validation
const newssubmit = document.querySelector('.newssubmit');
const emailInput = document.querySelector('input[type="email"]');

if (newssubmit && emailInput) {
    newssubmit.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing!', 'success');
        emailInput.value = '';
    });
}

// Notification Function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                menu.classList.remove('ShowMenu');
            }
        }
    });
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
