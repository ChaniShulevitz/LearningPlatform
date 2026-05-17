import { Request, Response, NextFunction } from 'express';
import * as promptService from '../services/promptService';

export const createPrompt = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category_id, sub_category_id, prompt } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'משתמש לא מחובר או אסימון לא תקף' });
      return;
    }

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
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'משתמש לא מחובר או אסימון לא תקף' });
      return;
    }

    const history = await (promptService as any).getUserPromptHistory(userId.toString());
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};