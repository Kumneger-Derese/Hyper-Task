import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

import Token from '../Models/tokenModel.js';
import { env, jwtConfig } from '../Config/config.js';
import { tokenType } from '../Config/tokens.js';
import ApiError from '../utils/ApiError.js';

//Generate Token
const generateToken = (userId, expires, type, secret = jwtConfig.secret) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, secret);
};

//Save  token to database
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });

  return tokenDoc;
};

//verify token
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, jwtConfig.secret);

  const tokenDoc = await Token.findOne({
    token,
    user: payload.sub,
    type,
    blacklisted: false,
  });

  if (!tokenDoc) {
    throw new ApiError(404, 'Token not found.');
  }

  return tokenDoc;
};

//Generate both access and refresh token
const generateAuthTokens = async (res, userId) => {
  const accessTokenExpires = dayjs().add(
    jwtConfig.accessExpirationMinutes,
    'minutes'
  );

  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    tokenType.ACCESS
  );

  const refreshTokenExpires = dayjs().add(
    jwtConfig.refreshExpirationDays,
    'days'
  );

  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    tokenType.REFRESH
  );

  //save refresh token to DB
  await saveToken(refreshToken, userId, refreshTokenExpires, tokenType.REFRESH);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: env === 'production',
    maxAge: refreshTokenExpires.toDate(),
  });

  return {
    accessToken: accessToken,
    expires: accessTokenExpires.toDate(),
  };
};

export { generateAuthTokens, verifyToken };
