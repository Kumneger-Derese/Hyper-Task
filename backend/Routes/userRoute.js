import { Router } from 'express';

import {
  registerSchema,
  loginSchema,
  profileSchema,
} from '../Validations/userValidation.js';
import {
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAuthToken,
  registerUser,
  updateUserProfile,
} from '../Controllers/userController.js';
import auth from '../Middleware/auth.js';
import validate from '../Middleware/validate.js';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshAuthToken);
router
  .route('/profile')
  .get(auth, getUserProfile)
  .put(auth, validate(profileSchema), updateUserProfile);

export default router;
