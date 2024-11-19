import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { clearCredential, setCredential } from '../app/slices/authSlice';
import { createUser, loginUser, logoutUser, updateUser } from '../api/userApi';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login user
  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(`Welcome, ${data?.user?.username}.`);
      dispatch(setCredential({ ...data }));
      navigate('/todos');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  //Register User
  const registerUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toast.success(`Welcome, ${data?.user?.username} you are registered.`);
      dispatch(setCredential({ ...data }));
      navigate('/');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  //* User Profile
  const userProfileMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(`Profile updated.`);
      navigate('/');
      dispatch(setCredential({ ...data }));
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  //* Logout User.
  const logoutUserMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success('User logged out.');
      dispatch(clearCredential());
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    loginUserMutation,
    registerUserMutation,
    userProfileMutation,
    logoutUserMutation,
  };
};

export default useAuth;
