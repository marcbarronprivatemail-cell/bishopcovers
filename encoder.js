const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function stringToHex(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hex;
}

function hexToBase64(hex) {
    return Buffer.from(hex, 'hex').toString('base64');
}

function stringToDoubleEncoded(text) {
    const hex = stringToHex(text);
    return hexToBase64(hex);
}

function showMenu() {
    console.log('\n--- 🛠️  Payload Encoder Tool ---');
    console.log('1. String ➡️ Hex');
    console.log('2. Hex ➡️ Base64');
    console.log('3. String ➡️ Double Encoded (Hex ➡️ Base64)');
    console.log('4. Exit');
    rl.question('\nChoose an option: ', handleChoice);
}

function handleChoice(choice) {
    switch (choice) {
        case '1':
            rl.question('Enter text to convert to Hex: ', (text) => {
                console.log('\n🚀 Hex Result:\n' + stringToHex(text));
                showMenu();
            });
            break;
        case '2':
            rl.question('Enter Hex string to convert to Base64: ', (hex) => {
                try {
                    console.log('\n🚀 Base64 Result:\n' + hexToBase64(hex));
                } catch (e) {
                    console.log('\n❌ Error: Invalid Hex string.');
                }
                showMenu();
            });
            break;
        case '3':
            rl.question('Enter text to double encode: ', (text) => {
                console.log('\n🚀 Double Encoded Result (B64 of Hex):\n' + stringToDoubleEncoded(text));
                showMenu();
            });
            break;
        case '4':
            console.log('Goodbye! 👋');
            rl.close();
            break;
        default:
            console.log('Invalid choice, please try again.');
            showMenu();
            break;
    }
}

showMenu();
