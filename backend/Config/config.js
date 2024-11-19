import joi from 'joi';
process.loadEnvFile('.env');

const envVarSchema = joi
  .object({
    MONGODB_URI: joi.string().required(),
    PORT: joi.number().positive().required(),
    NODE_ENV: joi.string().required(),
  })
  .unknown();

const { value: enVars, error } = envVarSchema.validate(process.env);

const env = enVars.NODE_ENV;
const port = enVars.PORT;
const mongoUri = enVars.MONGODB_URI;
const frontendUrl = enVars.FRONTEND_URL;

const jwtConfig = {
  secret: enVars.JWT_SECRET_KEY,
  accessExpirationMinutes: enVars.ACCESS_TOKEN_EXPIRATION_MINUTES,
  refreshExpirationDays: enVars.REFRESH_TOKEN_EXPIRATION_DAYS,
};

if (error && env === 'development') {
  console.log(error.message);
}

export { env, port, mongoUri, jwtConfig, frontendUrl };
