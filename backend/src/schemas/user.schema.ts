import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document & {
  comparePassword(password: string): Promise<boolean>;
  getProfile(): any;
};

/**
 * User Schema
 * MongoDB schema for user documents
 */
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ maxlength: 500 })
  avatar?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isEmailVerified: boolean;

  // Virtual for id
  id: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

// Add virtual for id
UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Hash password before saving
// DISABLED - Password hashing handled manually in auth service
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   
//   try {
//     const salt = await bcrypt.genSalt(12);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Add instance methods
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  console.log('Comparing password:', password, 'with hash:', this.password);
  const result = await bcrypt.compare(password, this.password);
  console.log('Password comparison result:', result);
  return result;
};

UserSchema.methods.getProfile = function() {
  const obj = this.toObject ? this.toObject() : this;
  const { password, ...profile } = obj;
  return profile;
};

// Hash password before saving
// DISABLED - Password hashing handled manually in auth service
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   
//   try {
//     const salt = await bcrypt.genSalt(12);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Index for isActive (email index is automatically created by unique: true)
UserSchema.index({ isActive: 1 });
