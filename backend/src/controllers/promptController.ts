import { Request, Response, NextFunction } from 'express';
import * as promptService from '../services/promptService';
import CustomResponseError from '../utils/aiResponse';

export const createAIPrompt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?._id;
    const { category_id, sub_category_id, prompt } = req.body;

    if (!category_id || !prompt) {
      return next(new CustomResponseError('חובה לספק קטגוריה וטקסט פרומפט', 400));
    }

    const savedPrompt = await promptService.generateAndSaveAIResponse(
      userId,
      category_id,
      sub_category_id,
      prompt
    );

    res.status(201).json({
      success: true,
      data: savedPrompt
    });
  } catch (err) {
    next(err);
  }
};

export const fetchUserHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?._id;
    const history = await promptService.getUserPromptHistory(userId);

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (err) {
    next(err);
  }
};