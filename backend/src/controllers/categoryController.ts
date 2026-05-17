import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/categoryService';
import CustomResponseError from '../utils/aiResponse';

export const executeCategoryCreation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(new CustomResponseError('חובה לספק שם עבור הקטגוריה החדשה', 400));
    }

    const newCategory = await categoryService.createNewCategory(name);
    
    res.status(201).json({
      success: true,
      message: 'הקטגוריה נוצרה בהצלחה',
      data: newCategory
    });
  } catch (err) {
    next(err);
  }
};

export const fetchAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (err) {
    next(err);
  }
};

export const fetchSubCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categoryId = req.params.categoryId as string;

    if (!categoryId) {
      return next(new CustomResponseError('חובה לספק מזהה קטגוריה', 400));
    }

    const subCategories = await categoryService.getSubCategoriesByCategoryId(categoryId);
    
    res.status(200).json({
      success: true,
      data: subCategories
    });
  } catch (err) {
    next(err);
  }
};