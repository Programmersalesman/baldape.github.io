// ==========================================================================
// BaldApe Services - Form Handling & Interactivity
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Handle consultation form submission
    const consultationForm = document.querySelector('.consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Consultation form submitted');
            const formData = {
                name: this.elements['name']?.value,
                email: this.elements['email']?.value,
                discord: this.elements['discord']?.value,
                community: this.elements['community']?.value,
                memberCount: this.elements['member-count']?.value,
                services: Array.from(this.querySelectorAll('input[name="services[]"]:checked')).map(cb => cb.value),
                goals: this.elements['goals']?.value,
                challenges: this.elements['challenges']?.value,
                timeline: this.elements['timeline']?.value,
                budget: this.elements['budget']?.value,
                preferredTime: this.elements['preferred-time']?.value,
                additionalInfo: this.elements['additional-info']?.value,
            };
            const success = await sendToDiscordAPI(formData);
            alert(success ? 'Thank you for your consultation request!' : 'There was an error submitting your request. Please try again later.');
            if (success) this.reset();
        });
    }

    // Handle rating input interactions
    const ratingInputs = document.querySelectorAll('.rating-input input[type="radio"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateRatingDisplay(this);
        });
    });



    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to server cards
    const serverCards = document.querySelectorAll('.server-card');
    serverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ===== FORM HANDLING FUNCTIONS =====

// ===== DISCORD WEBHOOK INTEGRATION =====
// Remove old sendToDiscord and handleTestimonialSubmission functions

// Update the visible rating value when a star is clicked
function updateRatingDisplay(selectedInput) {
    const ratingContainer = selectedInput.closest('.rating-input');
    const labels = ratingContainer.querySelectorAll('label');
    const rating = parseInt(selectedInput.value);
    labels.forEach((label, index) => {
        if (index < rating) {
            label.style.color = '#ffd700';
        } else {
            label.style.color = 'inherit';
        }
    });
    // Update the visible rating value
    const ratingValue = document.getElementById('rating-value');
    if (ratingValue) {
        ratingValue.textContent = `Selected Rating: ${rating}`;
    }
}

// ===== NOTIFICATION SYSTEM =====

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add to page
    document.body.appendChild(notification);
}

// ===== ANIMATION STYLES =====

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        line-height: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-message {
        flex: 1;
    }
`;
document.head.appendChild(style);

// ===== UTILITY FUNCTIONS =====

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sanitizeInput(input) {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
} 

// Helper function to send form data to Vercel API
async function sendToDiscordAPI(formData) {
  try {
    const response = await fetch('/api/send-to-discord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Updated testimonial form submission to collect all fields
const testimonialForm = document.getElementById('testimonial-form');
if (testimonialForm && !testimonialForm._handlerAttached) {
  testimonialForm._handlerAttached = true;
  const handlerId = Math.floor(Math.random() * 1000000);
  console.log('Attaching testimonial form handler, id:', handlerId);
  testimonialForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const submitId = Math.floor(Math.random() * 1000000);
    console.log('Testimonial form submitted', form, 'handlerId:', handlerId, 'submitId:', submitId);
    const formData = {
      name: form.elements['name']?.value,
      community: form.elements['community']?.value,
      role: form.elements['role']?.value,
      email: form.elements['email']?.value,
      rating: form.elements['rating']?.value,
      testimonial: form.elements['testimonial']?.value,
      features: Array.from(form.querySelectorAll('input[name="features[]"]:checked')).map(cb => cb.value),
      permission: form.elements['permission']?.value,
      anonymous: form.elements['anonymous']?.value,
    };
    const success = await sendToDiscordAPI(formData);
    alert(success ? 'Thank you for your testimonial!' : 'There was an error submitting your testimonial. Please try again later.');
    if (success) form.reset();
  });
}

// Updated contact form submission to collect all fields
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = {
      name: this.elements['name']?.value,
      email: this.elements['email']?.value,
      message: this.elements['message']?.value,
    };
    const success = await sendToDiscordAPI(formData);
    alert(success ? 'Thank you for contacting us!' : 'There was an error submitting your message. Please try again later.');
    if (success) this.reset();
  });
} 

// Add test buttons for sending dummy data to both forms
function addTestButtons() {
  const testContainer = document.createElement('div');
  testContainer.style.position = 'fixed';
  testContainer.style.bottom = '20px';
  testContainer.style.right = '20px';
  testContainer.style.zIndex = '9999';
  testContainer.style.display = 'flex';
  testContainer.style.flexDirection = 'column';
  testContainer.style.gap = '8px';

  // Testimonial button
  const testimonialBtn = document.createElement('button');
  testimonialBtn.textContent = 'Test Testimonial Form';
  testimonialBtn.style.padding = '8px 16px';
  testimonialBtn.style.background = '#5865F2';
  testimonialBtn.style.color = 'white';
  testimonialBtn.style.border = 'none';
  testimonialBtn.style.borderRadius = '4px';
  testimonialBtn.style.cursor = 'pointer';
  testimonialBtn.onclick = async () => {
    const dummyTestimonial = {
      name: 'Test User',
      community: "BaldApe's Lab",
      role: 'member',
      email: 'test@example.com',
      rating: '5',
      testimonial: 'This is a test testimonial!',
      features: ['organization', 'bots'],
      permission: 'yes',
      anonymous: 'public',
    };
    const success = await sendToDiscordAPI(dummyTestimonial);
    alert(success ? 'Testimonial sent!' : 'Testimonial failed!');
  };

  // Contact button
  const contactBtn = document.createElement('button');
  contactBtn.textContent = 'Test Contact Form';
  contactBtn.style.padding = '8px 16px';
  contactBtn.style.background = '#43B581';
  contactBtn.style.color = 'white';
  contactBtn.style.border = 'none';
  contactBtn.style.borderRadius = '4px';
  contactBtn.style.cursor = 'pointer';
  contactBtn.onclick = async () => {
    const dummyContact = {
      name: 'Contact Tester',
      email: 'contact@example.com',
      message: 'This is a test contact message.'
    };
    const success = await sendToDiscordAPI(dummyContact);
    alert(success ? 'Contact message sent!' : 'Contact message failed!');
  };

  testContainer.appendChild(testimonialBtn);
  testContainer.appendChild(contactBtn);
  document.body.appendChild(testContainer);
}

// Only show test buttons if running on Vercel preview or localhost
if (window.location.hostname.includes('vercel.app') || window.location.hostname === 'localhost') {
  window.addEventListener('DOMContentLoaded', addTestButtons);
} 