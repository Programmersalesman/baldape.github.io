// ==========================================================================
// BaldApe Services - Form Handling & Interactivity
// ==========================================================================

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

// Modal overlay logic for managed servers

document.addEventListener('DOMContentLoaded', function() {
  const serverCards = document.querySelectorAll('.card-clickable');
  const modal = document.getElementById('server-modal');
  const closeBtn = document.querySelector('.server-modal-close');
  const widgetContainer = document.getElementById('server-widget-container');

  // Import serverConfigs from external file for scalability
  // To add a new server, add an entry to scripts/server-configs.js and a corresponding card in portfolio.html
  // Example:
  //   'new-server-key': { id: '...', name: '...', widgetUrl: '...', description: '...' }

  serverCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const serverKey = card.dataset.server;
      const config = window.serverConfigs[serverKey];
      
      // Show modal with fade-in animation
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('show'), 10);
      
      // Show dark glass loading spinner
      widgetContainer.innerHTML = `
        <div class="server-widget-loading">
          <div class="spinner"></div>
          <div>Loading server information...</div>
        </div>
      `;
      
      if (config) {
        // Custom Discord info widget for any managed server
        function renderWidget(data, updatedAt) {
          // Find the card image src for fallback
          let fallbackImg = '';
          const cardImg = document.querySelector(`.server-card[data-server="${serverKey}"] img.portfolio-image`);
          if (cardImg) fallbackImg = cardImg.src;
          const iconUrl = data.icon
            ? `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png`
            : fallbackImg;
          const serverName = data.name || config.name;
          const onlineCount = data.presence_count || 0;
          const invite = data.instant_invite || '#';
          const members = (data.members || []);
          const featured = members.length ? members[Math.floor(Math.random() * members.length)] : null;
          let membersHtml = '';
          members.slice(0, 8).forEach(m => {
            membersHtml += `
              <div style=\"display:flex;align-items:center;gap:0.7rem;margin-bottom:0.5rem;\">
                <img src=\"${m.avatar_url}\" style=\"width:32px;height:32px;border-radius:8px;\">
                <span style=\"color:#fff;\">${m.username}</span>
                <span style=\"color:${m.status==='online' ? '#43b581' : m.status==='idle' ? '#faa61a' : '#f04747'};font-size:1.2em;\">●</span>
              </div>
            `;
          });
          if (members.length > 8) {
            membersHtml += `<div style='color:#aaa;font-size:0.95em;margin-top:0.5rem;'>...and more</div>`;
          }
          let featuredHtml = '';
          if (featured) {
            featuredHtml = `
              <div style=\"display:flex;align-items:center;gap:0.7rem;margin:1.2rem 0 0.5rem 0;padding:0.7rem 1rem;background:#2c2f33;border-radius:10px;box-shadow:0 2px 8px #0002;\">
                <img src=\"${featured.avatar_url}\" style=\"width:40px;height:40px;border-radius:10px;\">
                <div>
                  <div style=\"color:#fff;font-weight:bold;\">${featured.username}</div>
                  <div style=\"color:#aaa;font-size:0.95em;\">Featured Member</div>
                </div>
                <span style=\"color:${featured.status==='online' ? '#43b581' : featured.status==='idle' ? '#faa61a' : '#f04747'};font-size:1.3em;margin-left:auto;\">●</span>
              </div>
            `;
          }
          const description = config.description;
          widgetContainer.innerHTML = `
            <div style='background:#23272a;padding:2.2rem 2rem 1.5rem 2rem;border-radius:18px;box-shadow:none;width:100%;max-width:420px;margin:0 auto;display:flex;flex-direction:column;align-items:center;'>
              <div style='display:flex;align-items:center;gap:1rem;width:100%;'>
                <img src='${iconUrl}' style='width:56px;height:56px;border-radius:14px;border:2px solid #5865F2;background:#2c2f33;' onerror="this.onerror=null;this.src='${fallbackImg}';">
                <div style='flex:1;'>
                  <div style='font-size:1.5em;font-weight:bold;color:#fff;'>${serverName}</div>
                  <div style='font-size:1em;color:#aaa;'>${onlineCount} Members Online</div>
                </div>
              </div>
              <div style='width:100%;margin:1.1rem 0 0.7rem 0;color:#b9bbbe;font-size:1.08em;'>${description}</div>
              <div style='width:100%;margin-bottom:0.5rem;font-size:1.08em;color:#fff;font-weight:600;'>Online Members</div>
              <div style='width:100%;max-height:180px;overflow-y:auto;'>${membersHtml}</div>
              ${featuredHtml}
              <a href='${invite}' target='_blank' rel='noopener' style='display:block;margin:1.2rem auto 0 auto;width:100%;text-align:center;background:#5865F2;color:#fff;font-weight:bold;padding:0.9em 0;border-radius:10px;text-decoration:none;font-size:1.15em;box-shadow:0 2px 8px #0004;'>Join Discord</a>
              <div style='width:100%;display:flex;justify-content:space-between;align-items:center;margin-top:1.2rem;font-size:0.98em;color:#aaa;'>
                <span>Last updated: ${updatedAt}</span>
                <div style='display:flex;align-items:center;gap:0.7em;'>
                  <button id='copy-invite-btn' style='background:none;border:none;cursor:pointer;padding:0;' title='Copy Invite Link'>
                    <svg width='20' height='20' fill='none' stroke='#aaa' stroke-width='2' viewBox='0 0 20 20'><path d='M7 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1'/><path d='M13 7V6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1'/><rect x='3' y='7' width='14' height='6' rx='3'/></svg>
                  </button>
                  <button id='refresh-widget-btn' style='background:none;border:none;color:#aaa;cursor:pointer;font-size:1em;display:flex;align-items:center;gap:0.3em;'>
                    <svg width='18' height='18' fill='none' stroke='#aaa' stroke-width='2'><path d='M3 9a6 6 0 1 1 6 6'/><polyline points='9 3 9 9 15 9'/></svg> Refresh
                  </button>
                </div>
              </div>
              <div style='width:100%;margin-top:0.7em;font-size:0.93em;color:#888;text-align:center;'>Roles and activity data are not available from the Discord widget API.</div>
            </div>
          `;
          // Copy invite link functionality
          const copyBtn = document.getElementById('copy-invite-btn');
          if (copyBtn) {
            copyBtn.onclick = () => {
              navigator.clipboard.writeText(invite);
              copyBtn.innerHTML = '<svg width="20" height="20" fill="none" stroke="#43b581" stroke-width="2" viewBox="0 0 20 20"><path d="M7 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1"/><path d="M13 7V6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1"/><rect x="3" y="7" width="14" height="6" rx="3"/></svg>';
              setTimeout(() => copyBtn.innerHTML = '<svg width="20" height="20" fill="none" stroke="#aaa" stroke-width="2" viewBox="0 0 20 20"><path d="M7 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1"/><path d="M13 7V6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1"/><rect x="3" y="7" width="14" height="6" rx="3"/></svg>', 1200);
            };
          }
          // Refresh button functionality
          const refreshBtn = document.getElementById('refresh-widget-btn');
          if (refreshBtn) {
            refreshBtn.onclick = () => {
              widgetContainer.innerHTML = `
                <div class="server-widget-loading">
                  <div class="spinner"></div>
                  <div>Refreshing...</div>
                </div>
              `;
              fetchAndRender();
            };
          }
        }
        function fetchAndRender() {
          // Force spinner to show for 5 seconds
          // setTimeout(() => {
            fetch(config.widgetUrl)
              .then(resp => resp.json())
              .then(data => {
                const now = new Date();
                const updatedAt = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                renderWidget(data, updatedAt);
              })
              .catch(() => {
                widgetContainer.innerHTML = `
                  <div class="server-widget-loading">
                    <div style="color: #f04747; margin-bottom: 1rem;">⚠️</div>
                    <div>Failed to load server info.</div>
                  </div>
                `;
              });
          // }, 5000); // 5 second delay
        }
        fetchAndRender();
      } else {
        // Placeholder for other servers
        widgetContainer.innerHTML = `
          <div class="server-widget-loading">
            <div style="color: #aaa; margin-bottom: 1rem;">📋</div>
            <div>Discord widget for this server will appear here.</div>
          </div>
        `;
      }
    });
  });

  closeBtn.addEventListener('click', function() {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
    widgetContainer.innerHTML = '';
  });

  // Close modal when clicking outside content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.style.display = 'none', 300);
      widgetContainer.innerHTML = '';
    }
  });
});

// Consultation Modal Logic (services.html)
document.addEventListener('DOMContentLoaded', function() {
    var openBtn = document.getElementById('open-consultation-modal');
    var modal = document.getElementById('consultation-modal');
    var closeBtn = document.getElementById('close-consultation-modal');
    if (openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
        // Close modal when clicking outside modal-content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
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
        z-index: 2001;
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

// Attach handler for consultation modal form (id='consultation-form-modal')
const consultationFormModal = document.getElementById('consultation-form-modal');
const consultationModal = document.getElementById('consultation-modal');
if (consultationFormModal && !consultationFormModal._handlerAttached) {
  consultationFormModal._handlerAttached = true;
  const handlerId = Math.floor(Math.random() * 1000000);
  console.log('Attaching consultation modal form handler, id:', handlerId);
  consultationFormModal.addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitId = Math.floor(Math.random() * 1000000);
    console.log('Consultation modal form submitted', form, 'handlerId:', handlerId, 'submitId:', submitId);
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
    if (success) {
      form.reset();
      if (consultationModal) {
        consultationModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
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

// ===== TEST BUTTONS FOR FORMS =====
document.addEventListener('DOMContentLoaded', function() {
    // Consultation modal test button (works for both index.html and services.html)
    var testConsultBtn = document.getElementById('test-consultation-submit');
    var consultForm = document.getElementById('consultation-form-modal');
    if (testConsultBtn && consultForm) {
        testConsultBtn.addEventListener('click', function() {
            consultForm.name.value = 'Test User';
            consultForm.email.value = 'test@example.com';
            consultForm.discord.value = 'testuser#1234';
            consultForm.community.value = 'Test Community';
            consultForm['member-count'].value = '101-500';
            consultForm['services[]'][0].checked = true;
            consultForm.goals.value = 'Grow the community.';
            consultForm.challenges.value = 'Low engagement.';
            consultForm.timeline.value = '1-2-weeks';
            consultForm.budget.value = '100-200';
            consultForm['preferred-time'].value = 'afternoon';
            consultForm['additional-info'].value = 'No additional info.';
        });
    }
    // Testimonial form test button (only fills, does not submit or clear)
    var testTestimonialBtn = document.getElementById('test-testimonial-submit');
    var testimonialForm = document.getElementById('testimonial-form');
    if (testTestimonialBtn && testimonialForm) {
        testTestimonialBtn.addEventListener('click', function() {
            testimonialForm.name.value = 'Test User';
            testimonialForm.community.value = 'Test Community';
            testimonialForm.role.value = 'Owner';
            testimonialForm.testimonial.value = 'This is a test testimonial.';
            var ratingInput = testimonialForm.querySelector('input[name="rating"][value="5"]');
            if (ratingInput) ratingInput.checked = true;
            testimonialForm['additional-info'].value = 'No additional info.';
        });
    }
}); 