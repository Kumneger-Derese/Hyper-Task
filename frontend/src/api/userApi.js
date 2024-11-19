import axios from '../utils/Axios';

const createUser = async (body) => {
  try {
    const { data } = await axios.post('/user/register', body);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const loginUser = async (body) => {
  try {
    const { data } = await axios.post('/user/login', body);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const logoutUser = async () => {
  try {
    const { data } = await axios.post('/user/logout');
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const updateUser = async (body) => {
  try {
    const { data } = await axios.put(`/user/profile`, body);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export { createUser, loginUser, logoutUser, updateUser };
