import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './DB/connectDB.js';
import userRoute from './Routes/userRoute.js';
import todoRoute from './Routes/todoRoute.js';
import jwtStrategy from './Config/passport.js';
import { errorConverter, errorHandler, notFound } from './Middleware/error.js';
import { port as PORT, frontendUrl } from './Config/config.js';

connectDB();

const app = express();
const port = PORT;

//app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

//passport middleware
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

//route middleware
app.use('/api/user', userRoute);
app.use('/api/todo', todoRoute);

//error middleware
app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
