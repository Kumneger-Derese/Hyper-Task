import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true,
      validate(v) {
        if (!validator.isEmail(v)) {
          throw new Error('Invalid Password.');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      private: true,
      validate(v) {
        if (!validator.isStrongPassword(v)) {
          throw new Error(
            'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          );
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  return (this.password = await bcrypt.hash(this.password, salt));
});

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.plugin(toJson);

const User = model('User', userSchema);
export default User;
