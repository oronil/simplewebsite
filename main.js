// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const getStartedBtn = document.getElementById('getStartedBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Toggle Mobile Menu
mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Open Login Modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Open Register Modal
registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'flex';
});

// Get Started Button
getStartedBtn.addEventListener('click', () => {
    registerModal.style.display = 'flex';
});

// Close Modals
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Switch between Login and Register
switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.style.display = 'none';
    loginModal.style.display = 'flex';
});

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Form submission with validation
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Simple validation
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Send data to server
    const formData = new FormData(this);
    fetch('backend/register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Registration successful! You can now login.', 'success');
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
            registerForm.reset();
        } else {
            showMessage(data.message || 'Registration failed. Please try again.', 'error');
        }
    })
    .catch(error => {
        showMessage('An error occurred. Please try again later.', 'error');
        console.error('Error:', error);
    });
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Send data to server
    const formData = new FormData(this);
    fetch('backend/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'dashboard.php';
        } else {
            showMessage(data.message || 'Login failed. Please check your credentials.', 'error');
        }
    })
    .catch(error => {
        showMessage('An error occurred. Please try again later.', 'error');
        console.error('Error:', error);
    });
});

// Helper function to show messages
function showMessage(message, type = 'info') {
    // Check if message container exists, if not create it
    let messageContainer = document.querySelector('.message-container');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        document.body.appendChild(messageContainer);
        
        // Add styles to the message container
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '20px';
        messageContainer.style.right = '20px';
        messageContainer.style.zIndex = '1000';
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    
    // Add styles to the message element
    messageElement.style.padding = '10px 20px';
    messageElement.style.marginBottom = '10px';
    messageElement.style.borderRadius = '4px';
    messageElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    
    // Set background color based on message type
    if (type === 'error') {
        messageElement.style.backgroundColor = '#ef4444';
        messageElement.style.color = 'white';
    } else if (type === 'success') {
        messageElement.style.backgroundColor = '#10b981';
        messageElement.style.color = 'white';
    } else {
        messageElement.style.backgroundColor = '#3b82f6';
        messageElement.style.color = 'white';
    }
    
    // Add to container
    messageContainer.appendChild(messageElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}