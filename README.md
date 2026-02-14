# Secure Password Generator

A Node.js tool to generate secure and easy-to-type passwords.

## Why this little app?

I was a long-time user of the wonderful SecureSafe which generates passwords that are easy to type and secure. Then I switched to the Apple password app, which has great advantages but generates GODAWFUL passwords.

Thus this app. Generate SecureSafe-style passwords.

## Features

- Generates passwords with alternating consonants and vowels for readability
- Includes random digits and special characters for security
- Customizable password length
- Optional uppercase letter positioning

## Installation

1. Clone this repository or download the files
2. Install Node.js if you haven't already
3. Run `npm install` to install dependencies

## Usage

### As a command-line tool:

```bash
node genpassword.js [length1] [length2] [uppercasePosition]
```

**Concrete Example:**
```bash
$ node genpassword.js 6 4 first
Generated Password: Befamo37kuda@
```

This command generates a password with:
- 6 characters for the first readable part: "Befamo"
- 2 random digits: "37"
- 4 characters for the second readable part: "kuda"
- 1 special character: "@"
- First letter capitalized: "B"

- `length1`: Length of the first readable part (default: 6)
- `length2`: Length of the second readable part (default: 4)
- `uppercasePosition`: Position of uppercase letter ('first' or 'last', optional)

Examples:
```bash
node genpassword.js          # Default: 6-4 pattern
node genpassword.js 8 5       # Custom lengths: 8-5 pattern
node genpassword.js 6 4 first # Uppercase first letter
node genpassword.js 6 4 last  # Uppercase last letter
```

### As a module in your Node.js application:

```javascript
const { generatePassword } = require('./genpassword');

// Generate a password with default settings
const password = generatePassword();
console.log(password);

// Generate with custom settings
const customPassword = generatePassword(8, 5, 'first');
console.log(customPassword);
```

## Password Structure

The generated password follows this pattern:
- Readable string (alternating consonants and vowels)
- Two random digits
- Another readable string
- One random special character

Example: `bafemo37kuda@`

## License

MIT License - see the LICENSE file for details.