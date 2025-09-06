// Debug script for DeepSite AI API
// Run with: node debug-api.js

const fetch = require('node-fetch');

async function debugAPI() {
  console.log('🔍 Debugging DeepSite AI API...\n');

  // Test data
  const testData = {
    prompt: "Create a simple HTML page with a blue header",
    model: "deepseek-ai/DeepSeek-V3.1",
    provider: "deepseek",
    pages: [],
    previousPrompts: []
  };

  console.log('📤 Sending request to /api/ask-ai...');
  console.log('Request data:', JSON.stringify(testData, null, 2));

  try {
    const response = await fetch('http://localhost:3000/api/ask-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log(`\n📥 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('❌ Error response:', JSON.stringify(errorData, null, 2));
      
      if (errorData.setupRequired) {
        console.log('\n🔧 Setup required:');
        console.log(`   ${errorData.instructions}`);
        console.log('\n📝 To fix this:');
        console.log('   1. Create a .env.local file in the deepsite folder');
        console.log('   2. Add your DeepSeek API key:');
        console.log('      DEEPSEEK_API_KEY=your_actual_api_key_here');
        console.log('   3. Restart the development server');
      }
    } else {
      console.log('✅ API is working!');
      const responseText = await response.text();
      console.log('Response preview:', responseText.substring(0, 200) + '...');
    }

  } catch (error) {
    console.error('❌ Network error:', error.message);
    console.log('\n💡 Make sure the development server is running:');
    console.log('   npm run dev');
  }
}

debugAPI();