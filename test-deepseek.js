// Test script for DeepSeek API integration
// Run with: node test-deepseek.js

const fetch = require('node-fetch');

async function testDeepSeek() {
  // Get API key from environment
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    console.error('❌ DEEPSEEK_API_KEY not found in environment variables');
    console.log('Please add your API key to .env.local file');
    process.exit(1);
  }

  console.log('🧪 Testing DeepSeek API...');
  console.log('API Key:', apiKey.substring(0, 10) + '...');

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3.1',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that creates websites.'
          },
          {
            role: 'user',
            content: 'Create a simple HTML page with a blue header that says "Hello World"'
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ API Error:', response.status, errorData);
      process.exit(1);
    }

    const data = await response.json();
    console.log('✅ DeepSeek API is working!');
    console.log('Response:', data.choices[0].message.content.substring(0, 200) + '...');
    console.log('Usage:', data.usage);

  } catch (error) {
    console.error('❌ Error testing DeepSeek API:', error.message);
    process.exit(1);
  }
}

testDeepSeek();