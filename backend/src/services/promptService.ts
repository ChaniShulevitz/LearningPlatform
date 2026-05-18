import OpenAI from 'openai';
import Prompt from '../models/prompt';
import mongoose from 'mongoose';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAndSaveAIResponse = async (
  userId: string,
  categoryId: string,
  subCategoryId: string | undefined,
  userInput: string
) => {
  let completion;

  try {
  
    completion = await openai.chat.completions.create({
      model: 'gpt-4', 
      messages: [
        {
          role: 'system',
          content: "You are an expert learning assistant. Provide structured, educational, and easy-to-understand responses based on the user's requests. Always respond in Hebrew.",
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
    });
  } catch (error: any) {
    
    if (error.status === 403 || error.code === 'model_not_found') {
      console.warn('gpt-4 was restricted, trying gpt-4-turbo...');
      completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo', 
        messages: [
          {
            role: 'system',
            content: "You are an expert learning assistant. Provide structured, educational, and easy-to-understand responses based on the user's requests. Always respond in Hebrew.",
          },
          {
            role: 'user',
            content: userInput,
          },
        ],
      });
    } else {
      throw error;
    }
  }

  
  const aiResponse = completion.choices[0]?.message?.content || 'לא התקבלה תשובה מהבינה המלאכותית';

  
  const newPrompt = new Prompt({
    user_id: userId,
    category_id: categoryId,
    sub_category_id: subCategoryId || undefined,
    prompt: userInput,
    response: aiResponse,
  });

  return await newPrompt.save();
};

export const getUserPromptHistory = async (userId: string) => {
  return await Prompt.find({ user_id: new mongoose.Types.ObjectId(userId) as any })
    .populate('category_id', 'name')
    .populate('sub_category_id', 'name')
    .sort({ created_at: -1 })
    .exec();
};