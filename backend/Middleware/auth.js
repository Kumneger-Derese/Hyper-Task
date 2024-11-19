import passport from 'passport';
import ApiError from '../utils/ApiError.js';

const VerifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(401, 'Please authenticate you need passport.'));
  }

  req.user = user;
  resolve();
};

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      VerifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((error) => next(error));
};

export default auth;
