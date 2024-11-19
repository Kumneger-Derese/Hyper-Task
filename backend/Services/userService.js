import httpStatus from 'http-status';
import User from '../Models/userModel.js';
import ApiError from '../utils/ApiError.js';
import { generateAuthTokens, verifyToken } from './tokenService.js';
import { tokenType } from '../Config/tokens.js';
import Token from '../Models/tokenModel.js';
import { env } from '../Config/config.js';

//Todo: Register user service
const registerUserService = async (username, email, password) => {
  const userExists = await User.isEmailTaken(email);

  if (userExists) {
    throw new ApiError(401, 'User already registered');
  }
  const user = await User.create({ username, email, password });

  return user;
};

//Todo: Login user service

const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password.');
  }

  return user;
};

//Todo: Logout user service

const logoutUserService = async (req, res) => {
  const token = req.cookies.refreshToken;

  const tokenDoc = await verifyToken(token, tokenType.REFRESH);
  if (!tokenDoc) throw ApiError(401, httpStatus.UNAUTHORIZED);

  const user = await User.findById({ _id: tokenDoc.user });
  if (!user) throw ApiError(401, 'Invalid token');

  //delete refresh token
  await Token.findOneAndDelete({
    token,
    user: tokenDoc.user,
    blacklisted: false,
    type: tokenType.REFRESH,
  });

  //clear refresh cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: env === 'production',
  });

  return 'User logged out successfully';
};

//Todo: Get user profile service

const getUserProfileService = async (req) => {
  const userId = req.user._id;
  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }
  return user;
};

//Todo: Update user profile service

const updateUserProfileService = async (req) => {
  const { username, email, password } = req.body;
  const id = req.user._id;

  const user = await User.findById({ _id: id });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not authorized.');
  }

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      user.password = password || user.password;
    }
  }

  await user.save();
  return user;
};

//Todo: generate refresh token service

const refreshAuthTokenService = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const refreshTokenDoc = await verifyToken(refreshToken, tokenType.REFRESH);
    const user = await User.findById({ _id: refreshTokenDoc.user });

    if (!user) {
      throw new Error('Invalid Token');
    }

    //Delete a old refresh token document from a collection
    const oldRefreshToken = await Token.findOneAndDelete({
      _id: refreshTokenDoc.user,
      token: refreshToken,
      type: tokenType.REFRESH,
    });

    // generate new refresh token

    const token = await generateAuthTokens(res, user.id);

    return { user, token };
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Please Authenticate(RT).`);
  }
};

export {
  registerUserService,
  loginUserService,
  logoutUserService,
  getUserProfileService,
  updateUserProfileService,
  refreshAuthTokenService,
};
