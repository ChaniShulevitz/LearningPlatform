import User, { IUser } from '../models/user';

export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).exec();
};

export const findUserByPhone = async (phone: string): Promise<IUser | null> => {
  return await User.findOne({ phone }).exec();
};

export const createNewUser = async (id: string, name: string, phone: string, role?: string): Promise<IUser> => {
  const user = new User({ _id: id, name, phone, role: role || 'user' });
  return await user.save();
};

export const fetchPaginatedUsers = async (skip: number, limit: number): Promise<IUser[]> => {
  return await User.find().skip(skip).limit(limit).exec();
};

export const countTotalUsers = async (): Promise<number> => {
  return await User.countDocuments().exec();
};