import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

/**
 * Product Schema
 * MongoDB schema for product documents
 */
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, maxlength: 255 })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  // Virtual for id
  id: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  /**
   * Get product with formatted price
   * @returns Product with formatted price
   */
  getFormattedProduct() {
    const obj = (this as any).toObject ? (this as any).toObject() : this;
    return {
      ...obj,
      price: parseFloat(this.price.toString()),
    };
  }

  /**
   * Add image to product
   * @param imageUrl - Image URL to add
   */
  addImage(imageUrl: string) {
    if (!this.images) {
      this.images = [];
    }
    this.images.push(imageUrl);
  }

  /**
   * Remove image from product
   * @param imageUrl - Image URL to remove
   */
  removeImage(imageUrl: string) {
    if (this.images) {
      this.images = this.images.filter(img => img !== imageUrl);
    }
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Add virtual for id
ProductSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
ProductSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Indexes
ProductSchema.index({ userId: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ createdAt: -1 });
