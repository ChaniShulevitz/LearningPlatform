import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  matchPassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return enteredPassword === this.password;
};

export default mongoose.model<IUser>('User', UserSchema);