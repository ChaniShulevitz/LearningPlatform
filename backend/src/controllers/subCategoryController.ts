import { Request, Response, NextFunction } from 'express';
import * as subCategoryService from '../services/subCategoryService';
import CustomResponseError from '../utils/aiResponse';

export const createSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { _id, category_id, name } = req.body;
    
    if (!_id || !category_id || !name) {
      return next(new CustomResponseError('חובה לספק את כל השדות: מזהה, מזהה קטגוריה ושם', 400));
    }

    const subCategory = await subCategoryService.createNewSubCategory(_id, category_id, name);
    res.status(201).json({ success: true, data: subCategory });
  } catch (error) {
    next(error);
  }
};

export const getSubCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categoryId = req.params.categoryId as string;
    
    if (!categoryId) {
      return next(new CustomResponseError('חובה לספק מזהה קטגוריה', 400));
    }
    
    const subCategories = await subCategoryService.getSubCategoriesByCategory(categoryId);
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    next(error);
  }
};