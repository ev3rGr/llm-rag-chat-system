// Minimal Login Form JavaScript
class MinimalLoginForm {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.emailInput = document.getElementById('email');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.confirmpasswordInput = document.getElementById('confirmpassword');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.register-btn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupPasswordToggle();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.usernameInput.addEventListener('blur', () => this.validateUsername());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.usernameInput.addEventListener('input', () => this.clearError('username'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
        this.confirmpasswordInput.addEventListener('input', () => this.clearError('confirmpassword'));
    }
    
    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', () => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            this.confirmpasswordInput.type = type;
            
            const icon = this.passwordToggle.querySelector('.toggle-icon');
            icon.classList.toggle('show-password', type === 'text');
        });
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('email', 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('email');
        return true;
    }

    validateUsername() {
        const username = this.usernameInput.value.trim();
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
        
        if (!username) {
            this.showError('username', 'Username is required');
            return false;
        }
        
        if (!usernameRegex.test(username)) {
            this.showError('username', 'Please enter a valid username');
            return false;
        }
        
        this.clearError('username');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError('password', 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            this.showError('password', 'Password must be at least 6 characters');
            return false;
        }
        
        this.clearError('password');
        return true;
    }

    validateConfirmPassword() {
        const password = this.passwordInput.value
        const confirmpassword = this.confirmpasswordInput.value

        if (!confirmpassword) {
            this.showError('confirmpassword', 'Enter password confirmation')
            return false
        }

        if (password != confirmpassword) {
            this.showError('confirmpassword', 'Password does not match')
            return false
        }

        this.clearError('confirmpassword')
        return true
    }
    
    showError(field, message) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    clearError(field) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 200);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const isUsernameValid = this.validateUsername()
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        const isConfirmPasswordValid = this.validateConfirmPassword()
        
        if (!isPasswordValid || !isEmailValid || !isConfirmPasswordValid || !isUsernameValid) {
            return;
        }
        
        this.setLoading(true);

        console.log(this.emailInput.value)
        console.log(this.usernameInput.value)
        console.log(this.passwordInput.value)
        console.log(this.confirmpasswordInput.value)
        return 
        
        // try {
        //     // API call
        //     const response = await fetch("/api/token/", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             username: this.emailInput.value,
        //             password: this.passwordInput.value
        //         })
        //     });

        //     const data = await response.json();

        //     if (response.ok) {

        //         localStorage.setItem("access", data.access);
        //         localStorage.setItem("refresh", data.refresh);

        //         this.showSuccess();

        //     } else {

        //         this.showError("password", "Invalid credentials");
        //     }
            
        //     // Show success state
        //     this.showSuccess();
        // } catch (error) {
        //     this.showError('password', 'Login failed. Please try again.');
        // } finally {
        //     this.setLoading(false);
        // }
    }
    
    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
    }
    
    showSuccess() {
        // this.form.style.display = 'none';
        // this.successMessage.classList.add('show');
        window.location.href = '/accounts/login';
        // // Simulate redirect after 2 seconds
        // setTimeout(() => {
        //     console.log('Redirecting to dashboard...');
        //     window.location.href = '/dashboard';
        // }, 2000);
    }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MinimalLoginForm();
});