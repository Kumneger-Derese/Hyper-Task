import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import useAuth from '../queryhook/useAuth';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const { registerUserMutation } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUserMutation.mutateAsync(userData);
  };

  return (
    <div className='relative min-h-screen p-6 md:p-0 w-full flex flex-col md:flex-row '>
      {/* Left Section */}
      <div className='flex w-full md:w-5/12 flex-col items-center justify-center'>
        <Link
          to={'/'}
          className='absolute top-6 md:top-8 left-6 md:left-20 text-[orangered] font-black text-2xl'
        >
          <FaChevronLeft />
        </Link>

        <Logo size={32} className={'hidden md:block'} />

        <h1 className='text-[orange] p-3 font-black text-4xl sm:text-6xl mb-16 mt-8'>
          <span className='block text-[#ffbe45]'>Hi there,</span>
          Register here.
        </h1>
      </div>

      {/* Right Section */}
      <div className='w-full md:w-7/12 flex justify-center items-center  bg-slate-800'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center px-8 py-16 items-center gap-y-1 w-full md:w-3/5'
        >
          <div className='w-full'>
            <label htmlFor='username' className='mb-2 font-bold text-xl'>
              Username:
              <input
                type='text'
                className='input input-bordered block w-full bg-transparent text-white font-medium mb-8'
                value={userData.username}
                name='username'
                id='username'
                onChange={handleChange}
                placeholder='John Doe'
              />
            </label>
          </div>

          <div className='w-full'>
            <label htmlFor='email' className='mb-2 font-bold text-xl'>
              Email:
              <input
                type='email'
                className='input input-bordered block  w-full bg-transparent text-white font-medium mb-8'
                onChange={handleChange}
                value={userData.email}
                name='email'
                id='email'
                placeholder='johndoe@gmail.com'
              />
            </label>
          </div>

          <div className='w-full'>
            <label htmlFor='password' className='mb-2 font-bold text-xl'>
              Password:
              <input
                type='password'
                className='input input-bordered  w-full bg-transparent text-white font-medium mb-8'
                onChange={handleChange}
                value={userData.password}
                name='password'
                id='password'
                placeholder='*********'
              />
            </label>
          </div>

          <button type='submit' className='btn mb-2 w-full btn-primary'>
            Submit
            {registerUserMutation.isPending ? <Loader /> : 'Login'}
          </button>
          <p className='w-full'>
            Already registered{' '}
            <Link to='/login' className='text-blue-400 underline font-bold'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default RegisterScreen;
