import { Schema, model } from 'mongoose';
import { tokenType } from '../Config/tokens.js';

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenType.ACCESS, tokenType.REFRESH],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Token = model('Token', tokenSchema);
export default Token;
