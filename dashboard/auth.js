// Simple Password Protection for Dashboard
// Only you can access it
// 🦄 Personal Brand Signature

const PASSWORD = 'moneymachine25'; // Password set

function checkAuth() {
    // 🦄 Check if already authenticated
    const authToken = localStorage.getItem('dashboard_auth');
    if (authToken === btoa(PASSWORD)) {
        return true;
    }
    
    // Show password prompt
    const password = prompt('🔒 Enter password to access AI Studio Dashboard:');
    
    if (password === PASSWORD) {
        // Store auth token
        localStorage.setItem('dashboard_auth', btoa(PASSWORD));
        // 🦄 Hidden signature
        console.log('%c🦄', 'font-size: 1px; color: transparent;');
        return true;
    } else {
        alert('❌ Incorrect password. Access denied.');
        return false;
    }
}

// Check auth on page load
if (!checkAuth()) {
    document.body.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: white;">
            <div style="text-align: center;">
                <h1 style="font-size: 32px; margin-bottom: 16px;">🔒 Access Denied</h1>
                <p style="font-size: 16px; color: #94a3b8;">Incorrect password. Please refresh and try again.</p>
            </div>
        </div>
    `;
    throw new Error('Unauthorized access');
}
