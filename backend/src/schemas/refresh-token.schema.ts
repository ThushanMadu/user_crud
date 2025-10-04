import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

/**
 * Refresh Token Schema
 * MongoDB schema for refresh token documents
 */
@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ required: true, type: String })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ maxlength: 45 })
  ipAddress?: string;

  @Prop({ maxlength: 500 })
  userAgent?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  // Virtual for id
  id: string;

  // Timestamps
  createdAt: Date;

  /**
   * Check if token is expired
   * @returns True if token is expired
   */
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  /**
   * Revoke the token
   */
  revoke() {
    this.isActive = false;
  }
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

// Add virtual for id
RefreshTokenSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
RefreshTokenSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Indexes
RefreshTokenSchema.index({ token: 1 });
RefreshTokenSchema.index({ userId: 1 });
RefreshTokenSchema.index({ isActive: 1 });
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

