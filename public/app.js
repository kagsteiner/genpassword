const form = document.getElementById('password-form');
const length1Input = document.getElementById('length1');
const length2Input = document.getElementById('length2');
const uppercasePositionInput = document.getElementById('uppercasePosition');
const mainPasswordEl = document.getElementById('main-password');
const alternativesEl = document.getElementById('alternatives');
const copyBtn = document.getElementById('copy-btn');
const copyFeedback = document.getElementById('copy-feedback');
const generateBtn = document.getElementById('generate-btn');

let currentMainPassword = '';
let alternativePasswords = [];

function renderPasswords() {
  mainPasswordEl.textContent = currentMainPassword || 'No password available';
  copyBtn.disabled = !currentMainPassword;

  alternativesEl.innerHTML = '';
  alternativePasswords.forEach((password) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'password-option';
    optionBtn.type = 'button';
    optionBtn.textContent = password;
    optionBtn.addEventListener('click', () => promotePassword(password));
    alternativesEl.appendChild(optionBtn);
  });
}

function promotePassword(newMainPassword) {
  if (!newMainPassword || newMainPassword === currentMainPassword) {
    return;
  }

  const updatedAlternatives = alternativePasswords.filter(
    (password) => password !== newMainPassword
  );

  if (currentMainPassword) {
    updatedAlternatives.push(currentMainPassword);
  }

  currentMainPassword = newMainPassword;
  alternativePasswords = updatedAlternatives.slice(0, 4);
  copyFeedback.textContent = '';
  renderPasswords();
}

async function generatePasswords() {
  const params = new URLSearchParams({
    length1: length1Input.value,
    length2: length2Input.value,
    uppercasePosition: uppercasePositionInput.value,
  });

  generateBtn.disabled = true;
  generateBtn.textContent = 'Generating...';
  copyFeedback.textContent = '';

  try {
    const response = await fetch(`/api/passwords?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Could not generate passwords right now.');
    }

    const payload = await response.json();
    const [mainPassword, ...otherPasswords] = payload.suggestions;

    currentMainPassword = mainPassword || '';
    alternativePasswords = otherPasswords.slice(0, 4);
    renderPasswords();
  } catch (error) {
    currentMainPassword = '';
    alternativePasswords = [];
    renderPasswords();
    copyFeedback.textContent = error.message;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate 5 suggestions';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  await generatePasswords();
});

copyBtn.addEventListener('click', async () => {
  if (!currentMainPassword) {
    return;
  }

  try {
    await navigator.clipboard.writeText(currentMainPassword);
    copyFeedback.textContent = 'Main password copied to clipboard.';
  } catch (_error) {
    copyFeedback.textContent = 'Copy failed. Please copy manually.';
  }
});

generatePasswords();
