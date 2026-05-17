import SubCategory from '../models/subCategory';

export const createNewSubCategory = async (id: string, category_id: string, name: string) => {
  const newSubCategory = new SubCategory({
    _id: id,
    category_id,
    name
  });
  return await newSubCategory.save(); 
};

export const getSubCategoriesByCategory = async (category_id: string) => {
  return await SubCategory.find({ category_id }).exec();
};