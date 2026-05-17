import Category from '../models/category';
import SubCategory from '../models/subCategory';

export const createNewCategory = async (name: string) => {
  const category = new Category({ name });
  return await category.save();
};

export const getAllCategories = async () => {
  return await Category.find().exec();
};

export const createNewSubCategory = async (category_id: string, name: string) => {
  const newSubCategory = new SubCategory({
    category_id,
    name
  });
  return await newSubCategory.save(); 
};

export const getSubCategoriesByCategoryId = async (categoryId: string) => {
  return await SubCategory.find({ category_id: categoryId }).exec();
};