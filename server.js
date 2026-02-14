const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { generatePassword } = require('./genpassword');

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Hostinger/reverse proxy)
const port = process.env.PORT || 3004;

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please wait and try again.',
  },
});

function toInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function sanitizeUppercasePosition(value) {
  if (value === 'first' || value === 'last') {
    return value;
  }
  return null;
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiLimiter);

app.get('/api/passwords', (req, res) => {
  const length1 = clamp(toInt(req.query.length1, 6), 2, 20);
  const length2 = clamp(toInt(req.query.length2, 4), 2, 20);
  const uppercasePosition = sanitizeUppercasePosition(req.query.uppercasePosition);

  const suggestions = Array.from({ length: 5 }, () =>
    generatePassword(length1, length2, uppercasePosition)
  );

  res.json({
    params: { length1, length2, uppercasePosition },
    suggestions,
  });
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
