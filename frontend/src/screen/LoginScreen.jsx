import { useState } from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import useAuth from '../queryhook/useAuth';
import { FaChevronLeft } from 'react-icons/fa6';

const LoginScreen = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  //* Auth Hook.
  const { loginUserMutation } = useAuth();

  //on change event handler
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUserMutation.mutateAsync(userData);
  };

  return (
    <div className='relative p-6 sm:p-16 md:p-0 flex flex-col md:flex-row w-full min-h-screen '>
      {/* Left section */}
      <div className='flex w-full md:w-5/12 flex-col items-center justify-center'>
        <Link
          to={'/'}
          className='absolute top-6 md:top-8 left-6 md:left-20 text-[orangered] font-black text-2xl'
        >
          <FaChevronLeft />
        </Link>

        <Logo size={32} className='hidden md:block' />

        <h1 className='text-[orange] font-black text-4xl sm:text-6xl mb-16 mt-8'>
          Wel come back.
        </h1>
      </div>

      {/* Right section */}
      <div className='bg-slate-800 w-full md:w-7/12 flex justify-center items-center rounded-md'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col w-full gap-y-1 md:w-3/5 px-8 py-16'
        >
          <div>
            <label htmlFor='email' className='mb-2 font-bold text-xl'>
              Email:
              <input
                type='text'
                className='input input-bordered block w-full bg-transparent text-white font-medium mb-8'
                onChange={handleChange}
                value={userData.email}
                name='email'
                id='email'
                placeholder='jondoe@gmail.com'
              />
            </label>
          </div>

          <div>
            <label htmlFor='password' className='mb-2 font-bold text-xl'>
              Password:
              <input
                type='password'
                className='input block w-full input-bordered bg-transparent text-white font-medium mb-8'
                onChange={handleChange}
                name='password'
                id='password'
                value={userData.password}
                placeholder='*********'
              />
            </label>
          </div>

          <button type='submit' className='btn mb-2 btn-primary'>
            Login
          </button>

          <p>
            Don&apos;t have account{' '}
            <Link to='/register' className='text-blue-400 underline font-bold'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
