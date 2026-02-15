const crypto = require('crypto');

// Define vowels and consonants
const vowels = ['a', 'e', 'i', 'o', 'u'];
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
    'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

// Function to generate a random element from an array
function getRandomElement(array) {
    return array[crypto.randomInt(array.length)];
}

// Function to generate a readable string of a given length
function generateReadableString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
            // Even index: consonant
            result += getRandomElement(consonants);
        } else {
            // Odd index: vowel
            result += getRandomElement(vowels);
        }
    }
    return result;
}

// Function to generate a random digit
function generateDigit() {
    return crypto.randomInt(10).toString();
}

// Function to generate a random special character
function generateSpecialCharacter() {
    const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\', ';', ':', ',', '.', '<', '>', '?', '/'];
    return getRandomElement(specialChars);
}

// Function to generate the password with customizable lengths and optional uppercase
function generatePassword(length1 = 6, length2 = 4, uppercasePosition = null) {
    const part1 = generateReadableString(length1);
    const part2 = generateDigit();
    const part3 = generateDigit();
    const part4 = generateReadableString(length2);
    const part5 = generateSpecialCharacter();

    let password = part1 + part2 + part3 + part4 + part5;

    if (uppercasePosition === 'first') {
        password = password.charAt(0).toUpperCase() + password.slice(1);
    } else if (uppercasePosition === 'last') {
        // Find the last alphabetic character and uppercase it
        let lastAlphaIndex = -1;
        for (let i = password.length - 1; i >= 0; i--) {
            if (/[a-zA-Z]/.test(password[i])) {
                lastAlphaIndex = i;
                break;
            }
        }
        if (lastAlphaIndex !== -1) {
            password = password.slice(0, lastAlphaIndex) + password.charAt(lastAlphaIndex).toUpperCase() + password.slice(lastAlphaIndex + 1);
        }
    }

    return password;
}

// Export the function for external use
module.exports = { generatePassword };

// Main function to handle command-line arguments
function main() {
    const args = process.argv.slice(2);
    let length1 = 6;
    let length2 = 4;
    let uppercasePosition = null;

    if (args.length >= 2) {
        length1 = parseInt(args[0], 10);
        length2 = parseInt(args[1], 10);
    }

    if (args.length >= 3) {
        uppercasePosition = args[2];
    }

    const password = generatePassword(length1, length2, uppercasePosition);
    console.log('Generated Password:', password);
}

// Run the main function if the script is executed directly
if (require.main === module) {
    main();
}