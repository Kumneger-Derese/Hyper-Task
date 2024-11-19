import { jwtConfig } from './config.js';
import { tokenType } from './tokens.js';
import User from '../Models/userModel.js';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

const jwtOptions = {
  secretOrKey: jwtConfig.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenType.ACCESS) {
      throw new Error('Invalid token type.');
    }

    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
export default jwtStrategy;
