
import { GoogleGenAI } from "@google/genai";

// Use an environment variable with a fallback check
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
let aiClient: GoogleGenAI | null = null;

export const getTravelAssistantResponse = async (userMessage: string, language: 'en' | 'pt' = 'en') => {
  // Graceful fallback if no API key is set (common in initial production deployments)
  if (!apiKey) {
    console.warn("AI Assistant: API Key is missing. Please set GEMINI_API_KEY in environment variables.");
    return language === 'pt'
      ? "Desculpe, o assistente virtual não está configurado. Por favor, contacte-nos diretamente."
      : "I'm sorry, our AI assistant isn't fully set up yet. Feel free to contact us via the form above!";
  }

  try {
    // Lazy initialize to avoid crashing the whole bundle if the key is missing or invalid
    if (!aiClient) {
      aiClient = new GoogleGenAI({ apiKey });
    }

    const langInstruction = language === 'pt'
      ? "Please respond exclusively in Portuguese."
      : "Please respond exclusively in English.";

    const response = await aiClient.models.generateContent({
      model: "gemini-1.5-flash", // Using a stable model name
      contents: userMessage,
      config: {
        systemInstruction: `You are an expert regional guide for Algarve Explorer in Portugal. 
        You specialize in trail adventures, hidden nature spots, hiking, and cultural discoveries. 
        You know every path from the Monchique mountains to the Sagres cliffs. 
        Be helpful, welcoming, and professional. 
        Promote our guided tours, walks, and transfer services when relevant.
        Focus on the "secrets of the Algarve"—the spots away from mass tourism.
        Recommend the best seasons (Spring for flowers, Autumn for light) and local customs.
        ${langInstruction}`,
        temperature: 0.7,
      },
    });

    return response.text || (language === 'pt' ? "Desculpe, não consegui encontrar uma resposta." : "I'm sorry, I couldn't find an answer for that right now.");
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return language === 'pt'
      ? "Desculpe, estou com problemas técnicos. Tente novamente mais tarde."
      : "I'm sorry, I'm having a bit of trouble reaching our base camp. Can you try again shortly?";
  }
};
