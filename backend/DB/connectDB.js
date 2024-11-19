import { connect } from 'mongoose';
import { mongoUri } from '../Config/config.js';

const connectDB = async () => {
  try {
    await connect(mongoUri);
    console.log('Db Connected!');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
