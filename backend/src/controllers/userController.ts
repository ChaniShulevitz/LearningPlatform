import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as userService from '../services/userService';
import CustomResponseError from '../utils/aiResponse';

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key_123';
const JWT_EXPIRATION = process.env.JWT_EXPIRE || '30d';

export const executeRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, name, phone, role } = req.body;

    if (!id || !name || !phone) {
      return next(new CustomResponseError('חובה לספק תעודת זהות, שם מלא ומספר טלפון', 400));
    }

    const idCheck = await userService.findUserById(id);
    if (idCheck) {
      return next(new CustomResponseError('שגיאה: משתמש עם תעודת זהות זו כבר רשום במערכת', 400));
    }

    const phoneCheck = await userService.findUserByPhone(phone);
    if (phoneCheck) {
      return next(new CustomResponseError('שגיאה: מספר הטלפון הזה כבר נמצא בשימוש של משתמש אחר', 400));
    }

    const freshUser = await userService.createNewUser(id, name, phone, role);
    const token = jwt.sign({ id: freshUser._id }, JWT_SECRET_KEY as jwt.Secret, { expiresIn: JWT_EXPIRATION as any });

    res.status(201).json({
      success: true,
      message: 'החשבון נוצר בהצלחה',
      token,
      data: freshUser
    });
  } catch (err) {
    next(err);
  }
};

export const executeLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, name, phone } = req.body;

    if (!id || !name || !phone) {
      return next(new CustomResponseError('כדי להתחבר יש להזין שם, תעודת זהות וטלפון', 400));
    }

    const account = await userService.findUserById(id);
    if (!account) {
      return next(new CustomResponseError('לא נמצא חשבון התואם לנתונים אלו. יש להירשם תחילה', 404));
    }

    if (account.name !== name || account.phone !== phone) {
      return next(new CustomResponseError('אימות נכשל: הפרטים שהוזנו אינם תואמים את הרישום במערכת', 401));
    }

    const token = jwt.sign({ id: account._id }, JWT_SECRET_KEY as jwt.Secret, { expiresIn: JWT_EXPIRATION as any });

    res.status(200).json({
      success: true,
      message: 'התחברות בוצעה בהצלחה',
      token,
      data: account
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminUserList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const currentPage = parseInt(req.query.page as string) || 1;
    const itemsPerPage = parseInt(req.query.limit as string) || 10;
    const skipAmount = (currentPage - 1) * itemsPerPage;

    const records = await userService.fetchPaginatedUsers(skipAmount, itemsPerPage);
    const totalRecords = await userService.countTotalUsers();

    res.status(200).json({
      success: true,
      meta: {
        totalItems: totalRecords,
        itemsReturned: records.length,
        currentPage,
        totalPages: Math.ceil(totalRecords / itemsPerPage)
      },
      data: records
    });
  } catch (err) {
    next(err);
  }
};