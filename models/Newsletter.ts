import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  source: string;
  createdAt: Date;
}

const NewsletterSchema: Schema<INewsletter> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    source: { type: String, default: 'homepage_footer' },
  },
  {
    timestamps: true,
  }
);

export const NewsletterModel: Model<INewsletter> =
  mongoose.models.Newsletter ||
  mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export default NewsletterModel;

