# 🤖 AI Setup Guide for DeepSite

This guide will help you set up AI models for your DeepSite application.

## 📋 Available AI Models

Your application supports **6 AI models** through **7 providers**:

### **Models:**
1. **DeepSeek V3 O324** - General purpose coding model
2. **DeepSeek R1 0528** - Reasoning model (thinks step-by-step)
3. **Qwen3 Coder 480B A35B** - Specialized coding model
4. **Kimi K2 Instruct** - General purpose model
5. **DeepSeek V3.1** - Latest general purpose model
6. **Kimi K2 Instruct 0905** - Updated Kimi model

### **Providers:**
1. **Fireworks AI** (131k tokens) - **Recommended**
2. **Together AI** (128k tokens) - Good alternative
3. **Groq** (16k tokens) - Fast and has free tier
4. **NovitaAI** (16k tokens) - Default provider
5. **Nebius AI Studio** (131k tokens)
6. **SambaNova** (32k tokens)
7. **Hyperbolic** (131k tokens)

## 🔑 Getting API Keys

### **1. Fireworks AI (Recommended)**
- Go to [https://fireworks.ai](https://fireworks.ai)
- Sign up for an account
- Go to API Keys section
- Create a new API key
- Copy the key

### **2. Together AI**
- Go to [https://together.ai](https://together.ai)
- Sign up for an account
- Go to API Keys section
- Create a new API key
- Copy the key

### **3. Groq (Free Tier Available)**
- Go to [https://groq.com](https://groq.com)
- Sign up for an account
- Go to API Keys section
- Create a new API key
- Copy the key

### **4. NovitaAI**
- Go to [https://novita.ai](https://novita.ai)
- Sign up for an account
- Go to API Keys section
- Create a new API key
- Copy the key

## ⚙️ Configuration

### **Step 1: Create Environment File**
Copy the example environment file:
```bash
cp env.example .env.local
```

### **Step 2: Add Your API Keys**
Edit `.env.local` and add your API keys:
```env
# Example configuration
FIREWORKS_API_KEY=your_fireworks_api_key_here
TOGETHER_API_KEY=your_together_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Default settings
DEFAULT_MODEL=deepseek-ai/DeepSeek-V3.1
DEFAULT_PROVIDER=fireworks-ai
```

### **Step 3: Restart Your Application**
```bash
npm run dev
```

## 🚀 Testing Your Setup

### **Test the AI Integration:**
1. Open your browser to `http://localhost:3000`
2. Go to the editor
3. Try using the AI features
4. Check the browser console for any errors

### **Test with curl:**
```bash
curl -X POST http://localhost:3000/api/ask-ai-new \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a simple HTML page with a blue header",
    "model": "deepseek-ai/DeepSeek-V3.1",
    "provider": "fireworks-ai"
  }'
```

## 🔧 Troubleshooting

### **Common Issues:**

1. **"API key not configured" error:**
   - Make sure you've added the API key to `.env.local`
   - Check the key name matches the provider (e.g., `FIREWORKS_API_KEY`)
   - Restart your development server

2. **"Model not supported by provider" error:**
   - Check the model supports your chosen provider
   - Try a different provider or model

3. **Rate limit errors:**
   - You've hit the API rate limit
   - Wait a few minutes or upgrade your API plan

4. **Authentication errors:**
   - Check your API key is correct
   - Make sure the key has the right permissions

### **Debug Mode:**
Add this to your `.env.local` for detailed logging:
```env
DEBUG_AI=true
```

## 💰 Cost Considerations

### **Free Tiers:**
- **Groq**: Free tier available
- **Together AI**: Free credits for new users
- **Fireworks AI**: Free credits for new users

### **Paid Plans:**
- Most providers offer pay-per-use pricing
- Costs vary by model and provider
- Check each provider's pricing page

## 🎯 Recommended Setup

For the best experience, I recommend:

1. **Start with Groq** (free tier)
2. **Add Fireworks AI** (good performance)
3. **Add Together AI** (backup option)

This gives you:
- ✅ Free testing with Groq
- ✅ High-quality results with Fireworks
- ✅ Backup options with Together

## 📞 Support

If you need help:
1. Check the browser console for errors
2. Verify your API keys are correct
3. Test with a simple prompt first
4. Check the provider's documentation

---

**Happy coding! 🚀**