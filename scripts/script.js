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
            showNotification(success ? 'Thank you for your consultation request!' : 'There was an error submitting your request. Please try again later.', success ? 'success' : 'error');
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
    // Allow multiple notifications to stack
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
        margin-top: ${getNotificationOffset()}px;
    `;
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
        updateNotificationOffsets();
    });
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
                updateNotificationOffsets();
            }, 300);
        }
    }, 5000);
    // Add to page
    document.body.appendChild(notification);
    updateNotificationOffsets();
}
// Helper to stack notifications downward
function getNotificationOffset() {
    const notifications = document.querySelectorAll('.notification');
    let offset = 0;
    notifications.forEach(n => {
        offset += n.offsetHeight + 1; // Reduce spacing to 1px
    });
    return offset;
}
function updateNotificationOffsets() {
    const notifications = document.querySelectorAll('.notification');
    let offset = 0;
    notifications.forEach(n => {
        n.style.top = (20 + offset) + 'px';
        offset += n.offsetHeight + 1; // Reduce spacing to 1px
    });
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
    let respBody = '';
    try { respBody = await response.text(); } catch (e) {}
    console.log('sendToDiscordAPI response:', response.status, respBody);
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
    showNotification(
      success
        ? `✅ Testimonial submitted successfully! (Submission ID: ${submitId})\nThank you for sharing your experience. Your testimonial will be reviewed and may appear on the site soon.`
        : `❌ Testimonial submission failed. (Submission ID: ${submitId})\nThere was an error sending your testimonial. Please try again later or contact support.`,
      success ? 'success' : 'error'
    );
    if (success) form.reset();
  });
}

// Updated consultation form submission to collect all fields
const consultationForm = document.getElementById('consultation-form');
if (consultationForm && !consultationForm._handlerAttached) {
  consultationForm._handlerAttached = true;
  const handlerId = Math.floor(Math.random() * 1000000);
  console.log('Attaching consultation form handler, id:', handlerId);
  consultationForm.addEventListener('submit', async function(e) {
    console.log('Consultation form submit event, handlerId:', handlerId);
    e.preventDefault();
    const form = e.target;
    const submitId = Math.floor(Math.random() * 1000000);
    console.log('Consultation form submitted', form, 'handlerId:', handlerId, 'submitId:', submitId);
    const formData = {
      name: form.elements['name']?.value,
      email: form.elements['email']?.value,
      discord: form.elements['discord']?.value,
      community: form.elements['community']?.value,
      memberCount: form.elements['member-count']?.value,
      services: Array.from(form.querySelectorAll('input[name="services[]"]:checked')).map(cb => cb.value),
      goals: form.elements['goals']?.value,
      challenges: form.elements['challenges']?.value,
      timeline: form.elements['timeline']?.value,
      budget: form.elements['budget']?.value,
      preferredTime: form.elements['preferred-time']?.value,
      additionalInfo: form.elements['additional-info']?.value,
    };
    const success = await sendToDiscordAPI(formData);
    showNotification(
      success
        ? `✅ Consultation request sent! (Submission ID: ${submitId})\nThank you for booking a consultation. You will receive a follow-up within 24 hours.`
        : `❌ Consultation request failed. (Submission ID: ${submitId})\nThere was an error sending your request. Please try again later or contact support.`,
      success ? 'success' : 'error'
    );
    if (success) form.reset();
  });
}

// Add test buttons below each form (only on localhost or Vercel preview)
function injectTestButtons() {
  if (!(window.location.hostname.includes('vercel.app') || window.location.hostname === 'localhost')) return;

  // Testimonial form test button
  const testimonialForm = document.getElementById('testimonial-form');
  if (testimonialForm && !document.getElementById('testimonial-test-btn')) {
    const testBtn = document.createElement('button');
    testBtn.type = 'button';
    testBtn.id = 'testimonial-test-btn';
    testBtn.textContent = 'Fill with Test Data';
    testBtn.className = 'cta-button';
    testBtn.style.marginTop = '16px';
    testBtn.onclick = () => {
      testimonialForm.elements['name'].value = 'Test User';
      testimonialForm.elements['community'].value = 'baldapes-lab';
      testimonialForm.elements['role'].value = 'member';
      testimonialForm.elements['email'].value = 'test@example.com';
      testimonialForm.elements['rating'].value = '5';
      testimonialForm.elements['testimonial'].value = 'This is a test testimonial!';
      testimonialForm.querySelectorAll('input[name="features[]"]').forEach(cb => cb.checked = false);
      testimonialForm.querySelector('input[name="features[]"][value="organization"]').checked = true;
      testimonialForm.querySelector('input[name="features[]"][value="bots"]').checked = true;
      testimonialForm.querySelector('input[name="permission"][value="yes"]').checked = true;
      testimonialForm.querySelector('input[name="anonymous"][value="public"]').checked = true;
      if (typeof updateRatingDisplay === 'function') {
        updateRatingDisplay(testimonialForm.querySelector('input[name="rating"]:checked'));
      }
    };
    testimonialForm.appendChild(testBtn);
  }

  // Consultation form test button
  const consultationForm = document.getElementById('consultation-form');
  if (consultationForm && !document.getElementById('consultation-test-btn')) {
    const testBtn = document.createElement('button');
    testBtn.type = 'button';
    testBtn.id = 'consultation-test-btn';
    testBtn.textContent = 'Fill with Test Data';
    testBtn.className = 'cta-button';
    testBtn.style.marginTop = '16px';
    testBtn.onclick = () => {
      consultationForm.elements['name'].value = 'Test Consultation';
      consultationForm.elements['email'].value = 'consult@example.com';
      consultationForm.elements['discord'].value = 'testuser#1234';
      consultationForm.elements['community'].value = 'Test Community';
      consultationForm.elements['member-count'].value = '1-50';
      consultationForm.querySelectorAll('input[name="services[]"]').forEach(cb => cb.checked = false);
      consultationForm.querySelector('input[name="services[]"][value="quick-setup"]').checked = true;
      consultationForm.querySelector('input[name="services[]"][value="premium-setup"]').checked = true;
      consultationForm.elements['goals'].value = 'Grow the community and improve engagement.';
      consultationForm.elements['challenges'].value = 'Low activity and unclear rules.';
      consultationForm.elements['timeline'].value = 'asap';
      consultationForm.elements['budget'].value = '50-100';
      consultationForm.elements['preferred-time'].value = 'morning';
      consultationForm.elements['additional-info'].value = 'No additional info.';
    };
    consultationForm.appendChild(testBtn);
  }
}

window.addEventListener('DOMContentLoaded', injectTestButtons); 