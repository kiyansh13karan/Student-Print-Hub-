// Enhanced JavaScript for Modern UI/UX Animations

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the application
    initializeApp();

    // Add scroll animations
    setupScrollAnimations();

    // Add particle effect
    createParticleEffect();

    // Add scroll progress bar
    setupScrollProgress();

    // Add floating animations
    setupFloatingAnimations();

    // Add modern scroll animations
    setupModernScrollAnimations();
});

// Initialize application
function initializeApp() {
    // Set up form validation if on order page
    if (document.getElementById('orderForm')) {
        setupOrderForm();
    }

    // Set up mobile navigation
    setupMobileNav();

    // Add navbar scroll effect
    setupNavbarScroll();

    // Add typing animation
    setupTypingAnimation();

    // Add click animations to buttons
    setupButtonAnimations();

    // Initialize Quote Calculator
    if (document.getElementById('quoteModal')) {
        setupQuoteCalculator();
        // Add click listeners to radio cards for better UX
        document.querySelectorAll('.radio-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                card.querySelector('input').checked = true;
                calculateQuote();
            });
        });
    }
}

// Modern scroll animations with Intersection Observer
function setupModernScrollAnimations() {
    // Add animate-on-scroll class to elements
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .feature-item, .contact-card, .hero-content, .section-header'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced button click animations
function setupButtonAnimations() {
    const buttons = document.querySelectorAll(
        '.btn-primary, .btn-secondary, .btn-whatsapp, .nav-order-btn'
    );

    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-effect 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add scrolled class for styling
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .template-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Enhanced particle effect for hero section
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Enhanced typing animation
function setupTypingAnimation() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('typing');

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            // Remove typing cursor after completion
            setTimeout(() => {
                heroTitle.classList.remove('typing');
            }, 1000);
        }
    };

    setTimeout(typeWriter, 1000);
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp, .nav-order-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced social media hover effects
function setupSocialMediaEffects() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.animation = 'bounce 0.6s ease-in-out';
            this.classList.add('glow');
        });

        link.addEventListener('mouseleave', function () {
            this.style.animation = '';
            this.classList.remove('glow');
        });
    });
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    /* Modern Ripple Effect */
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Smooth scroll progress bar */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    }
    
    /* Enhanced floating animation */
    .floating {
        animation: float 3s ease-in-out infinite;
    }
`;
document.head.appendChild(rippleStyle);

// Scroll progress bar
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Floating animations
function setupFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.hero-card, .image-card');
    floatingElements.forEach(el => {
        el.classList.add('floating');
    });
}

// Setup order form validation and submission
function setupOrderForm() {
    const form = document.getElementById('orderForm');
    const submitBtn = document.getElementById('submitBtn');

    // Add form submission handler
    form.addEventListener('submit', handleFormSubmit);

    // Add real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');

    // Validate all fields
    if (!validateForm(form)) {
        // Add shake animation to form
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => form.style.animation = '', 500);
        return;
    }

    // Show loading state with animation
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" style="width: 20px; height: 20px; margin-right: 10px;"></span>Submitting...';
    loading.style.display = 'block';
    successMessage.style.display = 'none';

    // Add form submission animation
    form.style.transform = 'scale(0.98)';
    form.style.opacity = '0.8';

    try {
        // Create FormData object
        const formData = new FormData(form);

        // Step 1: Submit Order to Backend
        const response = await fetch('http://localhost:3000/api/order', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            // Step 2: Initiate Payment (Razorpay)
            // Calculate Amount based on form data (Backend should ideally do this, but for now we trust frontend or validate in backend)
            // For security, we should let backend calculate, but to stick to plan we send amount or let backend calculate

            // Let's calculate amount here for display/check, but backend should recalculate
            const pages = parseInt(formData.get('pages')) || 0;
            const printType = formData.get('printType');
            const binding = form.querySelector('#binding').checked;
            const urgent = form.querySelector('#urgent').checked;

            let amount = 0;
            const rate = printType === 'bw' ? 2 : 5;
            amount += pages * rate;
            if (binding) amount += 30;
            if (urgent) amount += 20;

            // fallback to at least 1 rupee if 0
            if (amount === 0) amount = 1;

            const orderId = result.orderId; // DB ID

            // Call backend to create Razorpay Order
            const paymentResponse = await fetch('http://localhost:3000/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount })
            });

            const paymentOrder = await paymentResponse.json();

            if (paymentOrder.id) {
                // Open Razorpay Checkout
                const options = {
                    "key": "rzp_test_YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
                    "amount": paymentOrder.amount,
                    "currency": "INR",
                    "name": "Student Print Hub",
                    "description": `Print Order: ${pages} Pages (${printType})`,
                    "image": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    "order_id": paymentOrder.id,
                    "handler": async function (response) {
                        // Step 3: Verify Payment
                        document.getElementById('paymentModal').classList.add('active');

                        try {
                            const verifyResponse = await fetch('http://localhost:3000/api/payment/verify', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                    order_db_id: result.orderId // MongoDB ID
                                })
                            });

                            const verifyResult = await verifyResponse.json();

                            if (verifyResult.success) {
                                showSuccess(result.data.studentName, result.orderId); // Pass Order ID or Name
                            } else {
                                alert('Payment verification failed. Please contact admin.');
                            }
                        } catch (e) {
                            console.error('Verification error:', e);
                        } finally {
                            document.getElementById('paymentModal').classList.remove('active');
                        }
                    },
                    "prefill": {
                        "name": formData.get('studentName'),
                        "email": "",
                        "contact": formData.get('mobileNumber')
                    },
                    "theme": {
                        "color": "#3b82f6"
                    }
                };

                const rzp1 = new Razorpay(options);
                rzp1.open();

                // Keep form in success state but wait for payment
                loading.style.display = 'none';
                submitBtn.innerHTML = 'Complete Payment';

            } else {
                throw new Error('Failed to initiate payment');
            }

        } else {
            throw new Error(result.message || 'Failed to submit order');
        }

    } catch (error) {
        console.error('Error submitting order:', error);

        // Show error with animation
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.display = 'block';
        errorDiv.style.marginBottom = '1rem';
        errorDiv.style.backgroundColor = '#fff5f5';
        errorDiv.style.padding = '15px';
        errorDiv.style.borderRadius = '8px';
        errorDiv.style.borderLeft = '4px solid #f56565';

        // Show the actual error message if possible
        errorDiv.textContent = error.message.includes('fetch')
            ? 'Could not connect to the server. Please ensure the backend is running.'
            : error.message;

        form.insertBefore(errorDiv, form.firstChild);

        setTimeout(() => {
            errorDiv.style.opacity = '0';
            setTimeout(() => errorDiv.remove(), 500);
        }, 6000);

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Order';
        loading.style.display = 'none';
        form.style.transform = 'scale(1)';
        form.style.opacity = '1';
    }
}

function showSuccess(studentName, orderId) {
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('orderForm');
    const submitBtn = document.getElementById('submitBtn');

    // Customize success message
    successMessage.innerHTML = `
        <h3>🎉 Order Placed Successfully!</h3>
        <p>Thank you, <strong>${studentName}</strong>. Your payment was successful.</p>
        <p style="margin-top: 10px; font-weight: bold;">Your Order ID: <span style="background:var(--primary-lighter); padding: 5px 10px; border-radius: 5px;">${orderId}</span></p>
        <p>You can track your order status securely.</p>
        <a href="track-order.html" class="btn-primary" style="margin-top: 20px; display: inline-block;">Track Order</a>
    `;

    successMessage.style.display = 'block';
    successMessage.style.animation = 'slideInDown 0.5s ease-out';

    // Add confetti effect
    createConfetti();

    // Reset form
    form.reset();
    form.style.display = 'none'; // Hide form after success

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

// Create confetti effect
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4ecdc4'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 10000;
            pointer-events: none;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        `;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Validate entire form
function validateForm(form) {
    let isValid = true;

    // Required fields validation
    const requiredFields = [
        'studentName',
        'rollNumber',
        'collegeName',
        'subject',
        'practicalNumber',
        'teacherName',
        'mobileNumber'
    ];

    requiredFields.forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

// Validate individual field
function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldName + 'Error');

    // Clear previous error
    clearError(field);

    // Check if required field is empty
    if (field.required && !value) {
        showError(field, errorElement, 'This field is required');
        return false;
    }

    // Specific validations
    switch (fieldName) {
        case 'studentName':
        case 'teacherName':
            if (value && value.length < 2) {
                showError(field, errorElement, 'Name must be at least 2 characters');
                return false;
            }
            break;

        case 'rollNumber':
            if (value && !/^[A-Za-z0-9]+$/.test(value)) {
                showError(field, errorElement, 'Roll number should contain only letters and numbers');
                return false;
            }
            break;

        case 'mobileNumber':
            if (value && !/^[0-9]{10}$/.test(value)) {
                showError(field, errorElement, 'Please enter a valid 10-digit mobile number');
                return false;
            }
            break;

        case 'fileUpload':
            if (field.files.length > 0) {
                const file = field.files[0];
                const maxSize = 10 * 1024 * 1024; // 10MB
                const allowedTypes = [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'text/plain'
                ];

                if (file.size > maxSize) {
                    showError(field, errorElement, 'File size should be less than 10MB');
                    return false;
                }

                if (!allowedTypes.includes(file.type)) {
                    showError(field, errorElement, 'Please upload PDF, DOC, DOCX, or TXT files only');
                    return false;
                }
            }
            break;
    }

    return true;
}

// Show error message
function showError(field, errorElement, message) {
    field.style.borderColor = '#e74c3c';
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear error message
function clearError(field) {
    field.style.borderColor = '#ddd';
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Setup mobile navigation (for future enhancement)
function setupMobileNav() {
    // Add scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });

    // Add ripple effect to buttons
    addRippleEffect();

    // Add social media hover effects
    setupSocialMediaEffects();
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .submit-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Setup social media hover effects
function setupSocialMediaEffects() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.animation = 'bounce 0.6s ease-in-out';
        });

        link.addEventListener('mouseleave', function () {
            this.style.animation = '';
        });

        link.addEventListener('animationend', function () {
            this.style.animation = '';
        });
    });
}

// Utility function to format phone numbers
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    return phoneNumber;
}

// Utility function to validate email (if needed in future)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add smooth scrolling for anchor links
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

// --- Quote Calculator Logic ---

// Setup Quote Modal and Calculation
function setupQuoteCalculator() {
    const modal = document.getElementById('quoteModal');
    const openBtn = document.querySelector('.nav-order-btn');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('quoteForm');

    // Open Modal
    if (openBtn) {
        // Remove any existing listeners to be safe (though cloning is better, we'll just add a specific one)
        openBtn.replaceWith(openBtn.cloneNode(true));
        const newOpenBtn = document.querySelector('.nav-order-btn');

        newOpenBtn.addEventListener('click', (e) => {
            e.preventDefault(); // CRITICAL: Stop navigation to order.html
            modal.classList.add('active');
        });
    }

    // Close Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Real-time Calculation
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', calculateQuote); // For text/number inputs
        input.addEventListener('change', calculateQuote); // For radio/checkbox inputs
    });

    // Handle "Proceed to Order"
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather data
        const pages = document.getElementById('quotePages').value;
        const printType = document.querySelector('input[name="printType"]:checked').value;
        const binding = document.getElementById('quoteBinding').checked;
        const urgent = document.getElementById('quoteUrgent').checked;
        const total = document.getElementById('quoteTotal').textContent;

        // Store in localStorage
        const quoteData = {
            pages,
            printType,
            binding,
            urgent,
            total
        };
        localStorage.setItem('quoteData', JSON.stringify(quoteData));

        // Redirect to Order Page
        window.location.href = 'order.html';
    });
}

// Calculate Total Price
function calculateQuote() {
    const pages = parseInt(document.getElementById('quotePages').value) || 0;
    const printTypeInput = document.querySelector('input[name="printType"]:checked');
    if (!printTypeInput) return;

    const printType = printTypeInput.value;
    const binding = document.getElementById('quoteBinding').checked;
    const urgent = document.getElementById('quoteUrgent').checked;

    let total = 0;

    // Base Price (Pages * Rate)
    const rate = printType === 'bw' ? 2 : 5; // B/W: ₹2, Color: ₹5
    total += pages * rate;

    // Add Binding Cost
    if (binding) total += 30;

    // Add Urgent Cost
    if (urgent) total += 20;

    // Update Display with animation
    const totalElement = document.getElementById('quoteTotal');
    if (totalElement) {
        animateValue(totalElement, parseInt(totalElement.textContent) || 0, total, 300);
    }
}

// Number Animation Utility
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Pre-fill Order Form from Quote Data
function prefillOrderForm() {
    const quoteData = JSON.parse(localStorage.getItem('quoteData'));

    if (quoteData) {
        // Pre-fill fields if they exist
        if (document.getElementById('pages')) document.getElementById('pages').value = quoteData.pages;
        if (document.getElementById('printType')) document.getElementById('printType').value = quoteData.printType;
        if (document.getElementById('binding')) document.getElementById('binding').checked = quoteData.binding;
        if (document.getElementById('urgent')) document.getElementById('urgent').checked = quoteData.urgent;

        // Add a highlight animation if useful (CSS should define @keyframes highlight if needed)
        const filledElements = document.querySelectorAll('#pages, #printType, .checkbox-group');
        filledElements.forEach(el => {
            el.style.transition = 'background-color 0.5s';
            el.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            setTimeout(() => {
                el.style.backgroundColor = '';
            }, 2000);
        });

        // Clear storage after use
        localStorage.removeItem('quoteData');
    }
}

// Call setup functions based on page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quoteModal')) {
        setupQuoteCalculator();
        // Add click listeners to radio cards for better UX
        document.querySelectorAll('.radio-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                card.querySelector('input').checked = true;
                calculateQuote();
            });
        });
    }

    if (document.getElementById('orderForm')) {
        prefillOrderForm();
    }
});