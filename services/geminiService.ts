
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateMotivation = async (): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Gere uma frase motivacional curta e inspiradora em português para começar o dia de trabalho. Seja conciso.',
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text || "Continue focado em seus objetivos!";
  } catch (error) {
    console.error("Erro ao gerar motivação:", error);
    return "O sucesso é a soma de pequenos esforços repetidos dia após dia.";
  }
};

export const suggestTasks = async (currentTasks: string[]): Promise<string[]> => {
  try {
    const ai = getAIClient();
    const prompt = `Com base nestas tarefas: ${currentTasks.join(', ')}, sugira mais 3 tarefas produtivas e curtas para o dia de hoje em português. Retorne apenas uma lista simples separada por vírgulas.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    const text = response.text || "";
    return text.split(',').map(t => t.trim()).filter(t => t.length > 0);
  } catch (error) {
    console.error("Erro ao sugerir tarefas:", error);
    return ["Organizar agenda", "Beber água", "Revisar e-mails"];
  }
};
