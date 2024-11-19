import { generateAuthTokens } from '../Services/tokenService.js';
import {
  getUserProfileService,
  loginUserService,
  logoutUserService,
  refreshAuthTokenService,
  registerUserService,
  updateUserProfileService,
} from '../Services/userService.js';
import asyncHandler from '../utils/asyncHandler.js';

//Todo: register
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await registerUserService(username, email, password);

  const token = await generateAuthTokens(res, user.id);
  res.status(201).json({ user, token });
});

//Todo: login
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await loginUserService(email, password);

  const token = await generateAuthTokens(res, user.id);
  res.status(200).json({ user, token });
});

//Todo: Logout User profile
const logoutUser = asyncHandler(async (req, res, next) => {
  const message = await logoutUserService(req, res);
  res.status(200).json(message);
});

//Todo: Get User profile
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await getUserProfileService(req);
  res.status(200).json(user);
});

//Todo: Update User profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await updateUserProfileService(req);

  const token = await generateAuthTokens(res, user.id);
  res.status(200).json({ user, token });
});

//Todo: Generate refresh token
const refreshAuthToken = asyncHandler(async (req, res, next) => {
  const response = await refreshAuthTokenService(req, res);

  res.status(200).json(response);
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  refreshAuthToken,
};
