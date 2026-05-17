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
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert learning assistant. Provide structured, educational, and easy-to-understand responses based on the user\'s requests.',
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
    });

    const aiResponse = completion.choices[0]?.message?.content || 'לא התקבלה תשובה מהבינה המלאכותית';

    // תיקון מיפוי השדות בהתאם למודל
    const newPrompt = new Prompt({
      user_id: userId,
      category_id: categoryId,
      sub_category_id: subCategoryId || undefined,
      prompt: userInput,
      response: aiResponse,
    });

    return await newPrompt.save();
  } catch (error) {
    console.error('Error with OpenAI or DB Saving:', error);
    throw error; // זורק את השגיאה הלאה כדי שהקונטרולר יתפוס אותה ב-next(err)
  }
};

export const getUserPromptHistory = async (userId: string) => {
  return await Prompt.find({ user_id: new mongoose.Types.ObjectId(userId) as any })
    .populate('category_id', 'name')
    .populate('sub_category_id', 'name')
    .sort({ created_at: -1 })
    .exec();
};