/*
* Portfolio Website - Animations
* Created: 2025
*/

// DOM Elements
const skillLevels = document.querySelectorAll('.skill-level');

// GSAP Animation Fallback Functions
// These functions provide animations even if GSAP isn't available

// Reveal on Scroll
const revealOnScroll = (elements, threshold = 0.1) => {
  if (!elements || elements.length === 0) return;
  
  // Create IntersectionObserver if supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when element enters viewport
          entry.target.classList.add('animate');
          // Stop observing once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });
    
    // Observe all elements
    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    elements.forEach(el => el.classList.add('animate'));
  }
};

// Staggered Animation
const staggerAnimation = (elements, className, delay = 0.1) => {
  if (!elements || elements.length === 0) return;
  
  elements.forEach((el, index) => {
    // Add specified animation class with staggered delay
    setTimeout(() => {
      el.classList.add(className);
    }, index * (delay * 1000));
  });
};

// Animate Skill Bars
const animateSkillBars = () => {
  skillLevels.forEach(skill => {
    const level = skill.getAttribute('data-level');
    
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate the width when in viewport
          skill.style.width = level;
          skill.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(skill);
  });
};

// Particle Background Effect
const setupParticleBackground = () => {
  // Only run on larger screens
  if (window.innerWidth < 768) return;
  
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.className = 'particle-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.3';
  
  // Insert canvas as first child of hero section
  heroSection.insertBefore(canvas, heroSection.firstChild);
  
  // Setup canvas
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  
  // Resize canvas to match container
  const resizeCanvas = () => {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  };
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = '#5D3FD3';
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.size > 0.2) this.size -= 0.05;
      
      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Initialize particles
  const initParticles = () => {
    particlesArray = [];
    const numberOfParticles = Math.min(Math.floor(canvas.width * canvas.height / 20000), 100);
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  };
  
  // Animation loop
  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Connect particles with lines
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(93, 63, 211, ${0.4 - (distance / 150)})`; // Primary color with fade
          ctx.lineWidth = 1;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
      
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    requestAnimationFrame(animateParticles);
  };
  
  // Initial setup
  resizeCanvas();
  initParticles();
  animateParticles();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
};

// Text Scramble Effect
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble-text">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    this.el.innerHTML = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Initialize text scramble effect
const initTextScramble = () => {
  const phrases = [
    'Student Developer',
    'Web Designer',
    'UI/UX Enthusiast',
    'Problem Solver'
  ];
  
  const el = document.querySelector('.scramble-effect');
  if (!el) return;
  
  const fx = new TextScramble(el);
  
  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
  };
  
  next();
};

// Project image hover effect
const initProjectHoverEffects = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const img = card.querySelector('img');
    const overlay = card.querySelector('.project-overlay');
    
    // Tilt effect on mousemove
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      // Apply tilt effect
      if (window.innerWidth > 768) {
        card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(20px)`;
      }
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
    });
  });
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animations
  animateSkillBars();
  setupParticleBackground();
  initProjectHoverEffects();
  
  // Get project cards for animations
  const projectCards = document.querySelectorAll('.project-card');
  
  // Apply staggered animations to project cards
  revealOnScroll(projectCards);
  staggerAnimation(projectCards, 'fade-in-up', 0.1);
  
  // Apply animations to other elements
  revealOnScroll(document.querySelectorAll('.section-header'));
  revealOnScroll(document.querySelectorAll('.about-text p'));
  revealOnScroll(document.querySelectorAll('.contact-info'));
});

// Add loading animation class to document when fully loaded
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Attempt to initialize text scramble if element exists
  const scrambleElement = document.querySelector('.scramble-effect');
  if (scrambleElement) {
    initTextScramble();
  }
});