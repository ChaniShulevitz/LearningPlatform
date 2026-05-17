import User from '../models/user';
import Prompt from '../models/prompt';
import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

export const registerUser = async (userData: any) => {
  const { name, email, password, phone } = userData;
  const userExists = await (User as any).findOne({ email });
  if (userExists) {
    throw new Error('משתמש עם אימייל זה כבר קיים במערכת');
  }
  
  // כאן מונגו מייצר את ה-_id אוטומטית בצורה חלקה
  const user = await (User as any).create({ name, email, password, phone });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id.toString()),
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await (User as any).findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id.toString()),
    };
  } else {
    throw new Error('אימייל או סיסמה שגויים');
  }
};

export const getAllUsersAndHistory = async () => {
  const users = await (User as any).find({}).select('-password').lean();
  return Promise.all(
    users.map(async (user: any) => {
      const history = await Prompt.find({ user_id: user._id })
        .populate('category_id', 'name')
        .populate('sub_category_id', 'name')
        .sort({ created_at: -1 });
      return { ...user, history };
    })
  );
};