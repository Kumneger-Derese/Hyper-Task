import joi from 'joi';
import { password } from './customValidation.js';

const registerSchema = {
  body: joi.object().keys({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.custom(password).required(),
  }),
};

const loginSchema = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.custom(password).required(),
  }),
};

const profileSchema = {
  body: joi.object().keys({
    username: joi.string(),
    email: joi.string().email(),
    password: joi.custom(password),
  }),
};

export { registerSchema, loginSchema, profileSchema };
