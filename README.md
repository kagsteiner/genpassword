# Secure Password Generator

A simple client/server web app to generate secure and easy-to-type passwords.

## Why this little app? 

I was a long-time user of the wonderful SecureSafe which generates passwords that are easy to type and secure. Then I switched to the Apple password app, which has great advantages but generates GODAWFUL passwords.

Thus this app. Generate SecureSafe-style passwords.

## Features

- Simple backend endpoint that takes three parameters and returns five suggestions
- Clean web UI with one highlighted main password and four alternatives below
- Click an alternative to promote it to main password
- Copy the main password to clipboard
- Endpoint rate limiting to reduce brute-force abuse

## Installation

1. Clone this repository or download the files
2. Install Node.js if you have not already
3. Run `npm install`

## Run the app

```bash
npm start
```

Then open `http://localhost:3004`.

## API

### `GET /api/passwords`

Query parameters:

- `length1` - Length of the first readable part (2-20, default `6`)
- `length2` - Length of the second readable part (2-20, default `4`)
- `uppercasePosition` - `first`, `last`, or omitted

Example request:

```bash
curl "http://localhost:3004/api/passwords?length1=6&length2=4&uppercasePosition=first"
```

Example response:

```json
{
  "params": {
    "length1": 6,
    "length2": 4,
    "uppercasePosition": "first"
  },
  "suggestions": [
    "Befamo37kuda@",
    "Lidora21mepi#",
    "Kuvati56sano!",
    "Moqibe40tari$",
    "Wugalo89feni&"
  ]
}
```

## CLI usage (still available)

```bash
npm run cli -- 6 4 first
```

## Password structure

The generated password follows this pattern:

- Readable string (alternating consonants and vowels)
- Two random digits
- Another readable string
- One random special character

Example: `bafemo37kuda@`

## License

MIT License - see the LICENSE file for details.