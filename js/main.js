/*
* Portfolio Website - Main JavaScript
* Created: 2025
*/

// DOM Elements
const body = document.body;
const loadingScreen = document.querySelector('.loading-screen');
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('section');
const typed = document.querySelector('.typed');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Theme Toggle
const toggleTheme = () => {
  body.classList.toggle('dark-theme');
  localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
};

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
}

// Mobile Menu Toggle
const toggleMenu = () => {
  menuToggle.classList.toggle('menu-open');
  mainNav.classList.toggle('open');
  body.classList.toggle('no-scroll');
};

// Smooth Scroll
const smoothScroll = (target) => {
  const element = document.querySelector(target);
  if (!element) return;
  
  const headerHeight = document.querySelector('header').offsetHeight;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// Header scroll effect
const headerScrollEffect = () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

// Back to top visibility
const backToTopVisibility = () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
};

// Activate nav link based on scroll position
const activateNavLink = () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

// Enhanced cursor effects
const updateCursor = (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Main cursor
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
  
  // Follower cursor with smooth animation
  cursorFollower.style.left = `${x}px`;
  cursorFollower.style.top = `${y}px`;

  // Check if hovering over interactive elements
  const target = e.target;
  const isClickable = target.tagName.toLowerCase() === 'a' || 
                     target.tagName.toLowerCase() === 'button' ||
                     target.classList.contains('project-card') ||
                     target.closest('.project-card') ||
                     target.classList.contains('social-link') ||
                     target.closest('.social-link');

  if (isClickable) {
    cursor.classList.add('cursor-hover');
    cursorFollower.classList.add('cursor-hover');
  } else {
    cursor.classList.remove('cursor-hover');
    cursorFollower.classList.remove('cursor-hover');
  }
};

// Magnetic effect for buttons and links
const magneticEffect = (element, e) => {
  const bound = element.getBoundingClientRect();
  const mouseX = e.clientX - bound.left;
  const mouseY = e.clientY - bound.top;
  const centerX = bound.width / 2;
  const centerY = bound.height / 2;
  
  const moveX = (mouseX - centerX) * 0.2;
  const moveY = (mouseY - centerY) * 0.2;
  
  element.style.transform = `translate(${moveX}px, ${moveY}px)`;
};

// Reset magnetic effect
const resetMagneticEffect = (element) => {
  element.style.transform = 'translate(0px, 0px)';
};

// Parallax effect for background shapes
const parallaxEffect = (e) => {
  const shapes = document.querySelectorAll('.shape');
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  shapes.forEach((shape, index) => {
    const moveX = (mouseX / windowWidth - 0.5) * (index + 1) * 10;
    const moveY = (mouseY / windowHeight - 0.5) * (index + 1) * 10;
    
    shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
};

// Scroll animation for elements
const scrollAnimation = () => {
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  
  elementsToAnimate.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animate');
    }
  });
  
  // Animate skill bars when they come into view
  const skills = document.querySelectorAll('.skill-level');
  
  skills.forEach(skill => {
    const skillPosition = skill.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (skillPosition < windowHeight - 50 && !skill.classList.contains('animate')) {
      const level = skill.getAttribute('data-level');
      skill.style.width = level;
      skill.classList.add('animate');
    }
  });
};

// Initialize typed.js effect
const initTypedEffect = () => {
  if (typed) {
    const options = {
      strings: ['Student Developer', 'Web Designer', 'UI/UX Enthusiast', 'Problem Solver'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    };
    
    // Use type.js if available or create simple typing effect
    if (typeof Typed !== 'undefined') {
      new Typed('.typed', options);
    } else {
      // Simple custom typing effect
      const strings = options.strings;
      let currentStringIndex = 0;
      let currentCharIndex = 0;
      let isDeleting = false;
      let typingSpeed = options.typeSpeed;
      
      const type = () => {
        const currentText = strings[currentStringIndex];
        
        if (isDeleting) {
          typed.textContent = currentText.substring(0, currentCharIndex - 1);
          currentCharIndex--;
          typingSpeed = options.backSpeed;
        } else {
          typed.textContent = currentText.substring(0, currentCharIndex + 1);
          currentCharIndex++;
          typingSpeed = options.typeSpeed;
        }
        
        if (!isDeleting && currentCharIndex === currentText.length) {
          isDeleting = true;
          typingSpeed = options.backDelay;
        } else if (isDeleting && currentCharIndex === 0) {
          isDeleting = false;
          currentStringIndex = (currentStringIndex + 1) % strings.length;
        }
        
        setTimeout(type, typingSpeed);
      };
      
      type();
    }
  }
};

// Add magnetic effect to interactive elements
const initMagneticEffect = () => {
  const magneticElements = document.querySelectorAll('.btn, .social-link, .project-card');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => magneticEffect(element, e));
    element.addEventListener('mouseleave', () => resetMagneticEffect(element));
  });
};

// Handle Page Load
window.addEventListener('load', () => {
  // Hide loading screen
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      
      // Add animation classes to elements
      document.querySelectorAll('.hero-content h1, .hero-content h2, .hero-content p').forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.animationDelay = `${(index + 1) * 0.2}s`;
      });
      
      document.querySelectorAll('.cta-buttons .btn').forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.animationDelay = `${(index + 3) * 0.2}s`;
      });
      
      // Initialize scroll animations
      scrollAnimation();
    }, 300);
  }, 1500);
  
  // Initialize typed effect
  initTypedEffect();
  
  // Initialize magnetic effect
  initMagneticEffect();
  
  // Set all sections to animate on scroll
  sections.forEach(section => {
    if (!section.classList.contains('hero-section')) {
      section.classList.add('animate-on-scroll');
    }
  });
  
  // Make project cards animate on scroll
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('animate-on-scroll');
  });
});

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
menuToggle.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    
    // Close mobile menu if open
    if (mainNav.classList.contains('open')) {
      toggleMenu();
    }
    
    // Scroll to target section
    smoothScroll(target);
  });
});

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mouse move for parallax and cursor effects
document.addEventListener('mousemove', (e) => {
  parallaxEffect(e);
  updateCursor(e);
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorFollower.style.opacity = '0';
});

// Show cursor when entering window
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorFollower.style.opacity = '1';
});

// Scroll Event Listener
window.addEventListener('scroll', () => {
  headerScrollEffect();
  backToTopVisibility();
  activateNavLink();
  scrollAnimation();
});

// Add animate-on-scroll class to elements
document.querySelectorAll('.section-header, .about-text p, .skills-container, .contact-info, .contact-form-container').forEach(el => {
  el.classList.add('animate-on-scroll');
});

// Reveal text effect
document.querySelectorAll('.reveal-text').forEach(el => {
  el.setAttribute('data-text', el.textContent);
});

// Initialize elements requiring animation
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav link
  activateNavLink();
  
  // Initial scroll animations check
  scrollAnimation();
});