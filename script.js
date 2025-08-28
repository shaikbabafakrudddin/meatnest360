// Global variables
let cart = [];
let currentUser = null;

// Menu data
const menuItems = [
    {
        id: 1,
        name: "Grilled Chicken Breast",
        category: "grilled",
        price: 18.99,
        description: "Tender grilled chicken breast with herbs and spices",
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        name: "Crispy Fried Chicken",
        category: "fried",
        price: 16.99,
        description: "Golden crispy fried chicken with secret spice blend",
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        name: "Buffalo Wings",
        category: "wings",
        price: 14.99,
        description: "Spicy buffalo wings with blue cheese dip",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        name: "Chicken Caesar Salad",
        category: "grilled",
        price: 13.99,
        description: "Fresh romaine lettuce with grilled chicken and Caesar dressing",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        name: "BBQ Chicken Wings",
        category: "wings",
        price: 15.99,
        description: "Smoky BBQ wings with tangy barbecue sauce",
        image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        name: "Chicken Strips",
        category: "fried",
        price: 12.99,
        description: "Crispy chicken strips with honey mustard sauce",
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 7,
        name: "Loaded Fries",
        category: "sides",
        price: 8.99,
        description: "Crispy fries loaded with cheese, bacon, and green onions",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 8,
        name: "Coleslaw",
        category: "sides",
        price: 4.99,
        description: "Fresh and creamy coleslaw with cabbage and carrots",
        image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 9,
        name: "Honey Glazed Chicken",
        category: "grilled",
        price: 19.99,
        description: "Grilled chicken with sweet honey glaze and herbs",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 10,
        name: "Spicy Chicken Sandwich",
        category: "fried",
        price: 11.99,
        description: "Crispy chicken sandwich with spicy mayo and pickles",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 11,
        name: "Garlic Parmesan Wings",
        category: "wings",
        price: 16.99,
        description: "Wings tossed in garlic parmesan sauce with herbs",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 12,
        name: "Mac and Cheese",
        category: "sides",
        price: 6.99,
        description: "Creamy mac and cheese with three cheese blend",
        image: "https://images.unsplash.com/photo-1543826173-1ad5750bf828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
];

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    renderMenu('all');
    setupScrollAnimations();
});

// Initialize app
function initializeApp() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('chickennest_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }

    // Load user from localStorage
    const savedUser = localStorage.getItem('chickennest_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
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

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', handleContactForm);

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter');
    newsletterForm.addEventListener('submit', handleNewsletterSignup);

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const authModal = document.getElementById('authModal');
        const cartModal = document.getElementById('cartModal');
        
        if (event.target === authModal) {
            closeAuthModal();
        }
        if (event.target === cartModal) {
            closeCart();
        }
    });
}

// Navigation functions
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({
        behavior: 'smooth'
    });
}

// Menu functions
function renderMenu(category) {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    
    menuGrid.innerHTML = '';
    
    filteredItems.forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        menuGrid.appendChild(menuItemElement);
    });

    // Add animation to menu items
    setTimeout(() => {
        document.querySelectorAll('.menu-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 50);
}

function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.style.opacity = '0';
    menuItem.style.transform = 'translateY(20px)';
    menuItem.style.transition = 'all 0.3s ease';
    
    menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-item-footer">
                <span class="price">$${item.price.toFixed(2)}</span>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return menuItem;
}

function filterMenu(category) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Render filtered menu
    renderMenu(category);
}

// Cart functions
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showAddToCartAnimation();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    saveCartToStorage();
    renderCartItems();
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartUI();
        saveCartToStorage();
        renderCartItems();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Animate cart icon when items are added
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'block';
    renderCartItems();
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items to get started!</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <span class="price">$${itemTotal.toFixed(2)}</span>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    if (!currentUser) {
        closeCart();
        openAuthModal('login');
        return;
    }
    
    // Simulate checkout process
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.innerHTML;
    
    checkoutBtn.innerHTML = '<div class="loading"></div> Processing...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        cart = [];
        updateCartUI();
        saveCartToStorage();
        closeCart();
        
        showSuccessMessage('Order placed successfully! We\'ll deliver your delicious meal soon.');
        
        checkoutBtn.innerHTML = originalText;
        checkoutBtn.disabled = false;
    }, 2000);
}

function saveCartToStorage() {
    localStorage.setItem('chickennest_cart', JSON.stringify(cart));
}

function showAddToCartAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    cartIcon.style.color = '#ff4757';
    
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
        cartIcon.style.color = '';
    }, 300);
}

// Authentication functions
function openAuthModal(type) {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    authModal.style.display = 'block';
    
    if (type === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    authModal.style.display = 'none';
}

function switchToLogin() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
}

function switchToSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
}

function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="loading"></div> Signing in...';
    submitBtn.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        currentUser = {
            name: 'John Doe',
            email: email
        };
        
        localStorage.setItem('chickennest_user', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();
        showSuccessMessage('Welcome back! You\'re now signed in.');
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();
    }, 1500);
}

function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="loading"></div> Creating account...';
    submitBtn.disabled = true;
    
    // Simulate signup process
    setTimeout(() => {
        currentUser = {
            name: name,
            email: email,
            phone: phone
        };
        
        localStorage.setItem('chickennest_user', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();
        showSuccessMessage('Account created successfully! Welcome to ChickenNest.');
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();
    }, 1500);
}

function updateAuthUI() {
    const navMenu = document.querySelector('.nav-menu');
    const loginLink = navMenu.querySelector('a[onclick="openAuthModal(\'login\')"]');
    const signupBtn = navMenu.querySelector('.btn-signup');
    
    if (currentUser) {
        loginLink.textContent = `Hi, ${currentUser.name.split(' ')[0]}`;
        loginLink.onclick = logout;
        signupBtn.style.display = 'none';
    } else {
        loginLink.textContent = 'Login';
        loginLink.onclick = () => openAuthModal('login');
        signupBtn.style.display = 'block';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('chickennest_user');
    updateAuthUI();
    showSuccessMessage('You\'ve been signed out successfully.');
}

// Form handlers
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showSuccessMessage('Thank you for your message! We\'ll get back to you soon.');
        form.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleNewsletterSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="loading"></div>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showSuccessMessage('Thank you for subscribing to our newsletter!');
        form.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

// Utility functions
function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 4000);
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
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.hero-stats .stat, .feature, .contact-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
});

// Preload images for better performance
function preloadImages() {
    menuItems.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

// Call preload function after DOM is loaded
document.addEventListener('DOMContentLoaded', preloadImages);

// Chatbot functionality
let chatbotVisible = false;
let chatHistory = [];
const WEBHOOK_URL = 'https://bablu963.app.n8n.cloud/webhook/3e7192d1-037b-4187-b307-d5d379ede4cd';

// Initialize chatbot
function initializeChatbot() {
    // Load chat history from localStorage
    const savedHistory = localStorage.getItem('chickennest_chat');
    if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
        renderChatHistory();
    }
    
    // Hide notification after first interaction
    const hasInteracted = localStorage.getItem('chickennest_chat_interacted');
    if (hasInteracted) {
        const notification = document.getElementById('chatNotification');
        if (notification) {
            notification.style.display = 'none';
        }
    }
}

// Toggle chatbot visibility
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const notification = document.getElementById('chatNotification');
    
    chatbotVisible = !chatbotVisible;
    
    if (chatbotVisible) {
        chatbotWindow.classList.remove('chatbot-hidden');
        chatbotWindow.classList.add('chatbot-visible');
        
        // Hide notification on first open
        if (notification) {
            notification.style.display = 'none';
            localStorage.setItem('chickennest_chat_interacted', 'true');
        }
        
        // Focus on input field
        setTimeout(() => {
            const inputField = document.getElementById('chatbot-input-field');
            if (inputField) {
                inputField.focus();
            }
        }, 300);
    } else {
        chatbotWindow.classList.remove('chatbot-visible');
        chatbotWindow.classList.add('chatbot-hidden');
    }
}

// Handle Enter key press in chat input
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send message to AI
async function sendMessage() {
    const inputField = document.getElementById('chatbot-input-field');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const message = inputField.value.trim();
    
    if (!message) return;
    
    // Disable input and button
    inputField.disabled = true;
    sendBtn.disabled = true;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    inputField.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Send message to webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                timestamp: new Date().toISOString(),
                user: currentUser ? currentUser.name : 'Guest',
                context: 'ChickenNest Food Delivery'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Hide typing indicator
        hideTypingIndicator();
        
        // Add AI response to chat
        const aiResponse = data.response || data.message || 'Sorry, I couldn\'t process that request. Please try again.';
        addMessageToChat(aiResponse, 'bot');
        
    } catch (error) {
        console.error('Chatbot error:', error);
        hideTypingIndicator();
        
        // Add error message
        const errorMessage = 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.';
        addMessageToChat(errorMessage, 'bot');
    }
    
    // Re-enable input and button
    inputField.disabled = false;
    sendBtn.disabled = false;
    inputField.focus();
}

// Add message to chat UI
function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${sender === 'bot' ? 'fa-robot' : 'fa-user'}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${currentTime}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save to chat history
    chatHistory.push({
        message,
        sender,
        timestamp: new Date().toISOString()
    });
    
    saveChatHistory();
}

// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.getElementById('chatbot-typing');
    typingIndicator.style.display = 'flex';
    
    // Scroll to bottom to show typing indicator
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('chatbot-typing');
    typingIndicator.style.display = 'none';
}

// Render chat history
function renderChatHistory() {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    // Clear existing messages except welcome message
    const welcomeMessage = messagesContainer.querySelector('.bot-message');
    messagesContainer.innerHTML = '';
    
    // Re-add welcome message
    if (welcomeMessage) {
        messagesContainer.appendChild(welcomeMessage);
    }
    
    // Add chat history
    chatHistory.forEach(chat => {
        addMessageToChat(chat.message, chat.sender);
    });
}

// Save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem('chickennest_chat', JSON.stringify(chatHistory));
}

// Clear chat history
function clearChatHistory() {
    chatHistory = [];
    localStorage.removeItem('chickennest_chat');
    
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML = `
        <div class="message bot-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>Hello! I'm your ChickenNest AI assistant. How can I help you today? 🍗</p>
                <span class="message-time">Just now</span>
            </div>
        </div>
    `;
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
    
    // Add quick response suggestions
    setTimeout(() => {
        if (!chatbotVisible && chatHistory.length === 0) {
            // Show a subtle notification for new users
            const notification = document.getElementById('chatNotification');
            if (notification && !localStorage.getItem('chickennest_chat_interacted')) {
                notification.style.display = 'flex';
            }
        }
    }, 3000);
});

// Add some predefined responses for common questions
const quickResponses = {
    'menu': 'You can view our delicious menu by scrolling up or clicking the "Menu" section. We have grilled chicken, fried options, wings, and sides!',
    'hours': 'We\'re open 24/7 for your convenience! Our kitchen never sleeps.',
    'delivery': 'We deliver fresh, hot food in 15-30 minutes. Free delivery on orders over $25!',
    'contact': 'You can reach us at +1 (555) 123-NEST or hello@chickennest.com. We\'re always here to help!'
};

// Enhanced message processing for local responses
function processLocalResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(quickResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return null;
}