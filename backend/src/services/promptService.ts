import { GoogleGenAI } from '@google/genai';
import Prompt from '../models/prompt';
import mongoose from 'mongoose';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || '', 
});

const ensureValidObjectId = (id: string | undefined): any => {
  if (!id) return undefined;
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  }
  return new mongoose.Types.ObjectId();
};

export const generateAndSaveAIResponse = async (
  userId: string,
  categoryId: string,
  subCategoryId: string | undefined,
  userInput: string
) => {
  try {
   
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', 
      contents: userInput,
      config: {
        systemInstruction: "You are an expert learning assistant. Provide structured, educational, and easy-to-understand responses based on the user's requests. Always respond in Hebrew.",
      }
    });

    const aiResponse = response.text;
    if (!aiResponse) {
      throw new Error('התקבלה תשובה ריקה מהבינה המלאכותית');
    }

    const validUserId = ensureValidObjectId(userId);
    const validCategoryId = ensureValidObjectId(categoryId);
    const validSubCategoryId = ensureValidObjectId(subCategoryId);

    
    const newPrompt = new Prompt({
      user_id: validUserId,
      category_id: validCategoryId,
      sub_category_id: validSubCategoryId,
      prompt: userInput,
      response: aiResponse,
    });

    return await newPrompt.save();
  } catch (error) {
    console.error('Gemini Live Connection Error:', error);
    throw error; 
  }
};

export const getUserPromptHistory = async (userId: string) => {
  const validUserId = mongoose.Types.ObjectId.isValid(userId) 
    ? new mongoose.Types.ObjectId(userId) 
    : userId;

  return await Prompt.find({ user_id: validUserId as any })
    .populate('category_id', 'name')
    .populate('sub_category_id', 'name')
    .sort({ created_at: -1 })
    .exec();
};