/*
* Portfolio Website - Contact Form
* Created: 2025
*/

// DOM Elements
const contactForm = document.getElementById('contact-form');
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

// Form Validation
const validateForm = () => {
  let isValid = true;
  
  // Reset all error states
  document.querySelectorAll('.error-message').forEach(error => error.remove());
  document.querySelectorAll('.form-group.error').forEach(group => group.classList.remove('error'));
  
  // Validate each input
  formInputs.forEach(input => {
    const value = input.value.trim();
    const formGroup = input.parentElement;
    
    // Check if empty
    if (value === '') {
      showError(input, 'This field is required');
      isValid = false;
      return;
    }
    
    // Validate email
    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(input, 'Please enter a valid email address');
        isValid = false;
      }
    }
  });
  
  return isValid;
};

// Show error message
const showError = (input, message) => {
  const formGroup = input.parentElement;
  formGroup.classList.add('error');
  
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  
  formGroup.appendChild(errorMessage);
};

// Show success message
const showSuccessMessage = () => {
  // Remove form
  contactForm.innerHTML = '';
  
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  
  successMessage.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <h3>Message Sent!</h3>
    <p>Thank you for your message. I'll get back to you as soon as possible.</p>
  `;
  
  contactForm.appendChild(successMessage);
  
  // Add animation class
  successMessage.classList.add('fade-in');
};

// Form submission with simulated sending
const submitForm = (e) => {
  e.preventDefault();
  
  // Validate form
  if (!validateForm()) return;
  
  // Get form data
  const formData = new FormData(contactForm);
  const formValues = Object.fromEntries(formData.entries());
  
  // Show loading state
  const submitButton = contactForm.querySelector('.submit-btn');
  const originalText = submitButton.innerHTML;
  
  submitButton.innerHTML = `
    <span>Sending...</span>
    <div class="loader-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  submitButton.disabled = true;
  
  // Simulate sending (in a real app, you would send this to a server)
  setTimeout(() => {
    console.log('Form submitted with values:', formValues);
    showSuccessMessage();
    
    // In a real application, you would use fetch or axios to send the data
    /*
    fetch('your-endpoint', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      showSuccessMessage();
    })
    .catch(error => {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      showError(contactForm.querySelector('#email'), 'Something went wrong. Please try again.');
    });
    */
  }, 2000);
};

// Form input animations
const setupFormAnimations = () => {
  formInputs.forEach(input => {
    // Check if input already has a value (e.g., after page reload)
    if (input.value.trim() !== '') {
      input.parentElement.classList.add('active');
    }
    
    // Focus event
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('active');
    });
    
    // Blur event
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.parentElement.classList.remove('active');
      }
    });
  });
};

// Floating label effect
const initFloatingLabels = () => {
  formInputs.forEach(input => {
    const label = input.nextElementSibling;
    
    // Set active class on input focus
    input.addEventListener('focus', () => {
      label.classList.add('active');
    });
    
    // Remove active class if input is empty
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        label.classList.remove('active');
      }
    });
    
    // Check if input has value on page load
    if (input.value.trim() !== '') {
      label.classList.add('active');
    }
  });
};

// Form event listeners
if (contactForm) {
  contactForm.addEventListener('submit', submitForm);
  
  // Auto-resize textarea
  const textarea = contactForm.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = (textarea.scrollHeight) + 'px';
    });
  }
  
  // Setup form animations
  setupFormAnimations();
  initFloatingLabels();
}

// Add input validation feedback
formInputs.forEach(input => {
  input.addEventListener('input', () => {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    // Remove error message if user starts typing
    if (errorMessage) {
      errorMessage.remove();
      formGroup.classList.remove('error');
    }
    
    // Email validation on-the-fly
    if (input.type === 'email' && input.value.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(input.value.trim())) {
        formGroup.classList.add('warning');
      } else {
        formGroup.classList.remove('warning');
        formGroup.classList.add('valid');
      }
    }
  });
});