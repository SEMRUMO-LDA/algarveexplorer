
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAssistantResponse = async (userMessage: string, language: 'en' | 'pt' = 'en') => {
  try {
    const langInstruction = language === 'pt' 
      ? "Please respond exclusively in Portuguese." 
      : "Please respond exclusively in English.";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
