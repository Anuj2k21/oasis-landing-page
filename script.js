// Countdown Timer
function startCountdown() {
    // Set launch date to 20 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 20);
    const targetTime = launchDate.getTime();
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
}

// Create Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        
        // Random colors for particles
        const colors = [
            'rgba(0, 212, 255, 0.6)',
            'rgba(123, 47, 247, 0.6)',
            'rgba(241, 7, 163, 0.6)',
            'rgba(255, 255, 255, 0.4)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px currentColor';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create Stars
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Add loading state to button
    const submitBtn = this.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate sending (replace with actual API call)
    setTimeout(() => {
        // Success animation
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #00d084 0%, #00d4ff 100%)';
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 208, 132, 0.95);
            color: white;
            padding: 30px 50px;
            border-radius: 15px;
            font-size: 1.2rem;
            z-index: 9999;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            animation: scaleIn 0.3s ease-out;
        `;
        successMsg.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 3rem; display: block; margin-bottom: 15px;"></i>
            <strong>Thank you, ${name}!</strong><br>
            We've received your message from ${company}.<br>
            We'll contact you soon at ${email}
        `;
        document.body.appendChild(successMsg);
        
        // Reset form and button after delay
        setTimeout(() => {
            successMsg.remove();
            this.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(135deg, #00d4ff 0%, #7b2ff7 100%)';
        }, 3000);
    }, 1500);
});

// Add input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Rocket scroll animation
let rocketLaunched = false;
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const rockets = document.querySelectorAll('.rocket-container');
    
    // Launch rockets when user scrolls down 200px
    if (scrollPosition > 200 && !rocketLaunched) {
        rocketLaunched = true;
        rockets.forEach(rocket => {
            rocket.classList.add('fly');
        });
        
        // Reset rockets after animation
        setTimeout(() => {
            rocketLaunched = false;
            rockets.forEach(rocket => {
                rocket.classList.remove('fly');
            });
        }, 3000);
    }
});

// Initialize on page load
window.addEventListener('load', function() {
    startCountdown();
    createParticles();
    createStars();
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .contact-form-section').forEach(el => {
        observer.observe(el);
    });
});

// Add parallax effect on mouse move
let lensFlare = null;

document.addEventListener('mousemove', function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    // Parallax for feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        const speed = (index + 1) * 0.5;
        const rect = card.getBoundingClientRect();
        const cardX = (e.clientX - rect.left - rect.width / 2) / 20;
        const cardY = (e.clientY - rect.top - rect.height / 2) / 20;
        card.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px) rotateY(${cardX}deg) rotateX(${-cardY}deg)`;
    });
    
    // Lens flare effect
    if (!lensFlare) {
        lensFlare = document.createElement('div');
        lensFlare.className = 'lens-flare';
        document.body.appendChild(lensFlare);
    }
    
    lensFlare.style.left = e.clientX - 150 + 'px';
    lensFlare.style.top = e.clientY - 150 + 'px';
});

// Create shooting stars
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 50 + '%';
    star.style.top = Math.random() * 50 + '%';
    star.style.animationDelay = '0s';
    star.style.animationDuration = (Math.random() * 2 + 1) + 's';
    
    document.querySelector('.animated-bg').appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 3000);
}

// Create shooting stars periodically
setInterval(createShootingStar, 3000);

// Add ripple effect to button
document.querySelector('.submit-btn').addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});
