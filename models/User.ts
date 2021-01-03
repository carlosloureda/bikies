import { Document, Model, model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    enum: ['manager', 'user'],
    required: true,
  },
});

enum Role {
  Manager = 'manager',
  User = 'user',
}

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  role: Role;
}

interface UserBaseDocument extends User, Document {}
export interface UserDocument extends UserBaseDocument {}
export interface UserModel extends Model<UserDocument> {}

export default models.User ||
  model<UserDocument, UserModel>('User', UserSchema);
