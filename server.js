require('dotenv').config();
console.log('Environment variables loaded:');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve index.html with environment variable injected
app.get('/', (req, res) => {
  console.log('Route / hit - injecting API key');
  let html = fs.readFileSync('index.html', 'utf8');
  
  // Inject the API key as a global variable
  const apiKeyScript = `<script>window.OPENAI_API_KEY = '${process.env.OPENAI_API_KEY}';</script>`;
  console.log('Injecting API key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
  console.log('API key value (first 10 chars):', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + '...' : 'Missing');
  html = html.replace('</head>', `${apiKeyScript}\n</head>`);
  
  console.log('HTML modified and sent');
  res.send(html);
});

// Serve static files (after custom routes)
app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 