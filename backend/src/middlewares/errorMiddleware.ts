import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error detected: ${err.message || err}`);

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'הנתונים שהזנת כבר קיימים במערכת'
    });
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val: any) => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message: message
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'שגיאת שרת פנימית';

  res.status(statusCode).json({
    success: false,
    message: message
  });
};