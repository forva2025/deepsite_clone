/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createAIClient, getApiKeyForProvider } from "@/lib/ai-client";
import { MODELS, PROVIDERS } from "@/lib/providers";
import { Page } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, provider, model, pages } = body;

    // Validate required fields
    if (!model || !prompt) {
      return NextResponse.json(
        { error: "Missing required fields: model and prompt" },
        { status: 400 }
      );
    }

    // Find the selected model
    const selectedModel = MODELS.find(
      (m) => m.value === model || m.label === model
    );

    if (!selectedModel) {
      return NextResponse.json(
        { error: "Invalid model selected" },
        { status: 400 }
      );
    }

    // Determine the provider to use
    const selectedProvider = provider === "auto" 
      ? selectedModel.autoProvider 
      : provider || selectedModel.autoProvider;

    // Check if the model supports the selected provider
    if (!selectedModel.providers.includes(selectedProvider)) {
      return NextResponse.json(
        {
          error: `Model ${selectedModel.label} does not support provider ${selectedProvider}`,
          availableProviders: selectedModel.providers,
        },
        { status: 400 }
      );
    }

    // Get API key for the provider
    let apiKey: string;
    try {
      apiKey = getApiKeyForProvider(selectedProvider);
    } catch (error) {
      return NextResponse.json(
        {
          error: `API key not configured for ${selectedProvider}`,
          setupRequired: true,
          instructions: `Please add ${selectedProvider.toUpperCase().replace('-', '_')}_API_KEY to your .env.local file`,
        },
        { status: 400 }
      );
    }

    // Create AI client
    const aiClient = createAIClient(selectedProvider, model);

    // Prepare messages
    const messages = [
      {
        role: "system" as const,
        content: `You are a helpful AI assistant that creates websites and web applications. 
        You can generate HTML, CSS, and JavaScript code based on user prompts.
        Always provide complete, working code that can be run in a browser.
        Use modern web technologies and best practices.
        If the user asks for a website, provide a complete HTML page with embedded CSS and JavaScript.`
      },
      {
        role: "user" as const,
        content: prompt
      }
    ];

    // Call the AI
    const response = await aiClient.chatCompletion(messages);

    // Return the response
    return NextResponse.json({
      ok: true,
      content: response.content,
      usage: response.usage,
      model: model,
      provider: selectedProvider,
    });

  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process AI request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}