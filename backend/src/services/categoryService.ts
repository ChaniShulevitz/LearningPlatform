import Category from '../models/category';

export const createNewCategory = async (name: string) => {
  const category = new Category({ name });
  return await category.save();
};

export const getAllCategories = async () => {
  return await Category.find().exec();
};