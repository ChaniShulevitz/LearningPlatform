import mongoose, { Schema, Document } from 'mongoose';

export interface IPrompt extends Document {
  user_id: Schema.Types.ObjectId;
  category_id: Schema.Types.ObjectId;
  sub_category_id?: Schema.Types.ObjectId;
  prompt: string;
  response: string;
}

const PromptSchema = new Schema<IPrompt>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  sub_category_id: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  prompt: { type: String, required: true },
  response: { type: String, required: true }
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

export default mongoose.model<IPrompt>('Prompt', PromptSchema);