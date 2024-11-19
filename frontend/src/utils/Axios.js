import axios from 'axios';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const token = userInfo?.token?.accessToken;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //if error is caused by 401 status
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      //prevent retrying multiple times

      try {
        //request new token
        const { data } = await axios.post(
          `${baseURL}/user/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = data?.token?.accessToken;

        localStorage.setItem('userInfo', JSON.stringify(data));

        //retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
