const fs = require('fs');
const path = require('path');

// Load .env if present (local dev)
try {
  const env = fs.readFileSync('.env', 'utf8');
  env.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  });
} catch {}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || apiKey === '__OPENAI_API_KEY__') {
  console.error('Error: OPENAI_API_KEY is not set.');
  process.exit(1);
}

const src = fs.readFileSync('shorts-studio.html', 'utf8');
const out = src.replace('__OPENAI_API_KEY__', apiKey);

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync(path.join('dist', 'index.html'), out);
console.log('Build complete → dist/index.html');
