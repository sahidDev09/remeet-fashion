import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  id: number;
  name: string;
  color: string;
  price: string;
  numericPrice: number;
  originalPrice: string;
  discount: string;
  image: string;
  images: string[];
  categories: string[];
  colors: string[];
  sizes: string[];
  description: string;
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true },
    price: { type: String, required: true },
    numericPrice: { type: Number, required: true },
    originalPrice: { type: String, default: '' },
    discount: { type: String, default: '' },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    categories: { type: [String], default: [], index: true },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    description: { type: String, default: '' },
    stock: { type: Number, default: 50 },
    rating: { type: Number, default: 5.0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model during hot reload
export const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;

