import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      res.status(400).json({ success: false, message: 'חובה למלא את כל השדות: שם, אימייל, סיסמה וטלפון' });
      return;
    }
    const result = await (userService as any).registerUser({ name, email, password, phone });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'חובה לספק אימייל וסיסמה' });
      return;
    }
    const result = await (userService as any).loginUser(email, password);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersWithHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await (userService as any).getAllUsersAndHistory();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};