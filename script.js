// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Counter Animation
const counter = document.querySelector('.counter-number');
const targetNumber = 4300; // Replace with actual number
let currentNumber = 0;

const animateCounter = () => {
    const duration = 2;
    const increment = targetNumber / (duration * 60); // 60 FPS

    const updateCounter = () => {
        currentNumber += increment;
        if (currentNumber < targetNumber) {
            counter.textContent = Math.floor(currentNumber);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = targetNumber;
        }
    };

    updateCounter();
};

// Scroll Animations
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Goal Cards Animation
const goalCards = document.querySelectorAll('.goal-card');

goalCards.forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Smooth Scroll for Navigation
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

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('شكراً لرسالتك! سنتواصل معك قريباً.');
        this.reset();
    });
}

// Initialize counter when it comes into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (counter) {
    counterObserver.observe(counter);
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 