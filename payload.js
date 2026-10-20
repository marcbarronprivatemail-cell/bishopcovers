// payload.js
(function() {
    'use strict';

    console.log('[Payload] ✅ Script successfully injected and executed via Blob URL.');

    // 1. Read the email passed from the loader's URL hash
    const hash = window.location.hash;
    const emailFromHash = hash && hash.length > 1 ? decodeURIComponent(hash.slice(1)) : null;

    if (emailFromHash) {
        console.log('[Payload] 📧 Detected email from hash:', emailFromHash);

        // Wait for DOM to be fully parsed (since this script is injected into the <head>)
        document.addEventListener('DOMContentLoaded', () => {
            // Look for an email input field (by ID or type)
            const emailInput = document.getElementById('email') || document.querySelector('input[type="email"]');
            
            if (emailInput) {
                emailInput.value = emailFromHash;
                console.log('[Payload] ✅ Pre-filled email input field.');
            } else {
                console.warn('[Payload] ⚠️ No email input field found on the page to pre-fill.');
            }
        });
    } else {
        console.log('[Payload] ℹ️ No email hash detected in URL.');
    }

    // ==========================================
    // ADD YOUR CUSTOM JAVASCRIPT BELOW THIS LINE
    // ==========================================
    
    // Example: Add a custom CSS class to the body
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('payload-injected');
    });

})();