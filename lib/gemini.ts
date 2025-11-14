import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

export const geminiAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

