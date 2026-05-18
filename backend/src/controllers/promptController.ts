import { Request, Response, NextFunction } from 'express';
import * as promptService from '../services/promptService';

export const createPrompt = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category_id, sub_category_id, prompt } = req.body;
    
    // שליפת מזהה המשתמש, ובמקרה שאין - שימוש ב-ID זמני תקין ל-MongoDB כדי למנוע קריסה
    const userId = req.user?._id || '65f1c2d3e4b5a6c7d8e9f012';

    if (!category_id || !prompt) {
      res.status(400).json({ success: false, message: 'חובה לספק מזהה קטגוריה וטקסט עבור הפרומפט' });
      return;
    }

    const savedPrompt = await (promptService as any).generateAndSaveAIResponse(
      userId.toString(),
      category_id,
      sub_category_id,
      prompt
    );

    res.status(201).json({ success: true, data: savedPrompt });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id || '65f1c2d3e4b5a6c7d8e9f012';

    const history = await (promptService as any).getUserPromptHistory(userId.toString());
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};