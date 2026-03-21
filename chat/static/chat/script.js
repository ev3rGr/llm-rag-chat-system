async function loadChat() {

    let token = localStorage.getItem("access");

    if (!token) {
        window.location.href = "/accounts/login/";
        return;
    }

    let response = await fetch("/api/chat/", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (response.status === 401) {

        token = await refreshAccessToken();

        if (!token) {
            window.location.href = "/accounts/login/";
            return;
        }

        response = await fetch("/api/chat/", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    }

    const data = await response.json();

    document.body.innerHTML = data.message;
}

async function refreshAccessToken() {

    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
        window.location.href = "/accounts/login/";
        return null;
    }

    const response = await fetch("/accounts/api/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refresh: refresh
        })
    });

    if (!response.ok) {
        window.location.href = "/accounts/login/";
        return null;
    }

    const data = await response.json();

    localStorage.setItem("access", data.access);

    return data.access;
}

loadChat();

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChat');
const attachBtn = document.getElementById('attachBtn');
const settingsBtn = document.getElementById('settingsBtn');
const typingIndicator = document.getElementById('typingIndicator');
const charCount = document.getElementById('charCount');

// Initialize
let messageHistory = [];

// Auto-resize textarea
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    
    // Update character count
    const count = this.value.length;
    charCount.textContent = `${count}/2000`;
    
    // Enable/disable send button
    sendBtn.disabled = count === 0;
});

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter (Shift+Enter for new line)
messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Send message function
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Save to history
    messageHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date()
    });
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    charCount.textContent = '0/2000';
    sendBtn.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
        generateAIResponse(message);
    }, 1000 + Math.random() * 2000);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    if (sender === 'ai') {
        avatarDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
        `;
    } else {
        // Get user initials (you can customize this)
        const userLogin = 'ayoubbouzidi-etu-dotcommake';
        const initials = userLogin.substring(0, 2).toUpperCase();
        avatarDiv.textContent = initials;
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    
    const textP = document.createElement('p');
    textP.textContent = text;
    textDiv.appendChild(textP);
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = formatTime(new Date());
    
    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(timeDiv);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

// Generate AI response (mock function - replace with actual API)
function generateAIResponse(userMessage) {
    // Mock responses based on keywords
    let response = '';
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = "Hello! How can I assist you today? Feel free to ask me anything!";
    } else if (lowerMessage.includes('how are you')) {
        response = "I'm doing great, thank you for asking! I'm here and ready to help you with whatever you need.";
    } else if (lowerMessage.includes('help')) {
        response = "I'm here to help! You can ask me questions, request information, or just have a conversation. What would you like to know?";
    } else if (lowerMessage.includes('weather')) {
        response = "I don't have real-time weather data, but I recommend checking a weather service for accurate information. Is there anything else I can help you with?";
    } else if (lowerMessage.includes('time')) {
        const now = new Date();
        response = `The current time is ${now.toLocaleTimeString()}. How else can I assist you?`;
    } else if (lowerMessage.includes('joke')) {
        const jokes = [
            "Why don't programmers like nature? It has too many bugs! 🐛",
            "Why do programmers prefer dark mode? Because light attracts bugs! 💡",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💻"
        ];
        response = jokes[Math.floor(Math.random() * jokes.length)];
    } else {
        const responses = [
            "That's an interesting question! Let me think about that...",
            "I understand what you're asking. Here's what I think...",
            "Great question! Based on what you've told me...",
            "Thanks for sharing that with me. I'd be happy to help!",
            "I appreciate you asking! Let me provide some insight..."
        ];
        response = responses[Math.floor(Math.random() * responses.length)] + " This is a demo response. In a real application, this would be connected to an AI API.";
    }
    
    hideTypingIndicator();
    addMessage(response, 'ai');
    
    // Save to history
    messageHistory.push({
        role: 'ai',
        content: response,
        timestamp: new Date()
    });
}

// Clear chat
clearChatBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        chatMessages.innerHTML = '';
        messageHistory = [];
        
        // Add welcome message back
        addMessage("👋 Hello! I'm your AI assistant. How can I help you today?", 'ai');
    }
});

// Attach button (placeholder)
attachBtn.addEventListener('click', function() {
    alert('File attachment feature coming soon!');
});

// Settings button (placeholder)
settingsBtn.addEventListener('click', function() {
    alert('Settings feature coming soon!');
});

// Format time
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) {
        return 'Just now';
    } else if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Scroll to bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize focus
messageInput.focus();