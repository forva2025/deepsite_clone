// AI Client for DeepSite - Supports multiple providers
interface AIProvider {
  name: string;
  max_tokens: number;
  id: string;
}

interface AIModel {
  value: string;
  label: string;
  providers: string[];
  autoProvider: string;
  isThinker?: boolean;
  isNew?: boolean;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface AIStreamResponse {
  content: string;
  done: boolean;
}

export class AIClient {
  private apiKey: string;
  private provider: string;
  private model: string;

  constructor(provider: string, model: string, apiKey: string) {
    this.provider = provider;
    this.model = model;
    this.apiKey = apiKey;
  }

  async chatCompletion(messages: ChatMessage[]): Promise<AIResponse> {
    switch (this.provider) {
      case 'deepseek':
        return this.callDeepSeek(messages);
      case 'fireworks-ai':
        return this.callFireworksAI(messages);
      case 'together':
        return this.callTogetherAI(messages);
      case 'groq':
        return this.callGroq(messages);
      case 'novita':
        return this.callNovitaAI(messages);
      case 'nebius':
        return this.callNebiusAI(messages);
      case 'sambanova':
        return this.callSambaNova(messages);
      case 'hyperbolic':
        return this.callHyperbolic(messages);
      default:
        throw new Error(`Unsupported provider: ${this.provider}`);
    }
  }

  async *chatCompletionStream(messages: ChatMessage[]): AsyncGenerator<AIStreamResponse> {
    switch (this.provider) {
      case 'deepseek':
        yield* this.callDeepSeekStream(messages);
        break;
      case 'fireworks-ai':
        yield* this.callFireworksAIStream(messages);
        break;
      case 'together':
        yield* this.callTogetherAIStream(messages);
        break;
      case 'groq':
        yield* this.callGroqStream(messages);
        break;
      default:
        // For providers that don't support streaming, fall back to regular completion
        const response = await this.chatCompletion(messages);
        yield { content: response.content, done: true };
    }
  }

  private async callDeepSeek(messages: ChatMessage[]): Promise<AIResponse> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: 4000,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`DeepSeek API error: ${response.statusText} - ${errorData.error?.message || ''}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
    };
  }

  private async *callDeepSeekStream(messages: ChatMessage[]): AsyncGenerator<AIStreamResponse> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: 4000,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`DeepSeek API error: ${response.statusText} - ${errorData.error?.message || ''}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body reader available');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              yield { content: '', done: true };
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                yield { content, done: false };
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  private async callFireworksAI(messages: ChatMessage[]): Promise<AIResponse> {
    const response = await fetch('https://api.fireworks.ai/inference/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Fireworks AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
    };
  }

  private async callTogetherAI(messages: ChatMessage[]): Promise<AIResponse> {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Together AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
    };
  }

  private async callGroq(messages: ChatMessage[]): Promise<AIResponse> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
    };
  }

  private async callNovitaAI(messages: ChatMessage[]): Promise<AIResponse> {
    const response = await fetch('https://api.novita.ai/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Novita AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
    };
  }

  private async callNebiusAI(messages: ChatMessage[]): Promise<AIResponse> {
    // Nebius AI implementation
    throw new Error('Nebius AI integration not implemented yet');
  }

  private async callSambaNova(messages: ChatMessage[]): Promise<AIResponse> {
    // SambaNova implementation
    throw new Error('SambaNova integration not implemented yet');
  }

  private async callHyperbolic(messages: ChatMessage[]): Promise<AIResponse> {
    // Hyperbolic implementation
    throw new Error('Hyperbolic integration not implemented yet');
  }

  // Streaming methods for other providers (fallback to regular completion)
  private async *callFireworksAIStream(messages: ChatMessage[]): AsyncGenerator<AIStreamResponse> {
    const response = await this.callFireworksAI(messages);
    yield { content: response.content, done: true };
  }

  private async *callTogetherAIStream(messages: ChatMessage[]): AsyncGenerator<AIStreamResponse> {
    const response = await this.callTogetherAI(messages);
    yield { content: response.content, done: true };
  }

  private async *callGroqStream(messages: ChatMessage[]): AsyncGenerator<AIStreamResponse> {
    const response = await this.callGroq(messages);
    yield { content: response.content, done: true };
  }
}

// Helper function to get API key for provider
export function getApiKeyForProvider(provider: string): string {
  let envKey: string;
  
  // Handle special cases for provider names
  switch (provider) {
    case 'deepseek':
      envKey = 'DEEPSEEK_API_KEY';
      break;
    case 'fireworks-ai':
      envKey = 'FIREWORKS_API_KEY';
      break;
    case 'together':
      envKey = 'TOGETHER_API_KEY';
      break;
    case 'groq':
      envKey = 'GROQ_API_KEY';
      break;
    case 'novita':
      envKey = 'NOVITA_API_KEY';
      break;
    case 'nebius':
      envKey = 'NEBIUS_API_KEY';
      break;
    case 'sambanova':
      envKey = 'SAMBANOVA_API_KEY';
      break;
    case 'hyperbolic':
      envKey = 'HYPERBOLIC_API_KEY';
      break;
    default:
      envKey = `${provider.toUpperCase().replace('-', '_')}_API_KEY`;
  }
  
  const apiKey = process.env[envKey];
  
  if (!apiKey) {
    throw new Error(`API key not found for provider ${provider}. Please set ${envKey} in your .env.local file`);
  }
  
  return apiKey;
}

// Helper function to create AI client
export function createAIClient(provider: string, model: string): AIClient {
  const apiKey = getApiKeyForProvider(provider);
  return new AIClient(provider, model, apiKey);
}