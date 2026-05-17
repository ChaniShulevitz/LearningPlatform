import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import CustomResponseError from '../utils/aiResponse';
import User from '../models/user';

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key_123';

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new CustomResponseError('גישה נדחתה: לא נשלח קוד אימות, אנא התחבר מחדש', 401));
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY as jwt.Secret) as JwtPayload;

    const currentUser = await User.findById(decoded.id).exec();
    if (!currentUser) {
      return next(new CustomResponseError('המשתמש המחובר אינו קיים עוד במערכת', 401));
    }

    (req as any).user = currentUser;
    next();
  } catch (err) {
    next(new CustomResponseError('קוד האימות אינו תקין או שפג תוקפו', 401));
  }
};

export const restrictToAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    return next(new CustomResponseError('אין לך הרשאה לבצע פעולה זו. מיועד למנהלים בלבד', 403));
  }

  next();
};