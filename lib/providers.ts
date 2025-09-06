export const PROVIDERS = {
  deepseek: {
    name: "DeepSeek",
    max_tokens: 32_000,
    id: "deepseek",
  },
  "fireworks-ai": {
    name: "Fireworks AI",
    max_tokens: 131_000,
    id: "fireworks-ai",
  },
  nebius: {
    name: "Nebius AI Studio",
    max_tokens: 131_000,
    id: "nebius",
  },
  sambanova: {
    name: "SambaNova",
    max_tokens: 32_000,
    id: "sambanova",
  },
  novita: {
    name: "NovitaAI",
    max_tokens: 16_000,
    id: "novita",
  },
  hyperbolic: {
    name: "Hyperbolic",
    max_tokens: 131_000,
    id: "hyperbolic",
  },
  together: {
    name: "Together AI",
    max_tokens: 128_000,
    id: "together",
  },
  groq: {
    name: "Groq",
    max_tokens: 16_384,
    id: "groq",
  },
};

export const MODELS = [
  {
    value: "deepseek-chat",
    label: "DeepSeek Chat (V3.1)",
    providers: ["deepseek"],
    autoProvider: "deepseek",
  },
  {
    value: "deepseek-reasoner",
    label: "DeepSeek Reasoner (V3.1)",
    providers: ["deepseek"],
    autoProvider: "deepseek",
    isThinker: true,
  },
  {
    value: "Qwen/Qwen3-Coder-480B-A35B-Instruct",
    label: "Qwen3 Coder 480B A35B Instruct",
    providers: ["novita", "hyperbolic"],
    autoProvider: "novita",
    isNew: true,
  },
  {
    value: "moonshotai/Kimi-K2-Instruct",
    label: "Kimi K2 Instruct",
    providers: ["together", "novita", "groq"],
    autoProvider: "groq",
  },
  {
    value: "deepseek-ai/DeepSeek-V3.1",
    label: "DeepSeek V3.1",
    providers: ["deepseek", "fireworks-ai", "novita"],
    isNew: true,
    autoProvider: "deepseek",
  },
  {
    value: "moonshotai/Kimi-K2-Instruct-0905",
    label: "Kimi K2 Instruct 0905",
    providers: ["together", "groq", "novita"],
    isNew: true,
    autoProvider: "groq"
  }
];
