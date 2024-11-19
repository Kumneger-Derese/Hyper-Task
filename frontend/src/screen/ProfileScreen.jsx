import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../components/Logo';
import useAuth from '../queryhook/useAuth';

const ProfileScreen = () => {
  const userAuth = useSelector((store) => store.auth.userInfo);
  const userInfo = userAuth?.user;

  const [userData, setUserData] = useState({
    username: userInfo?.username,
    email: userInfo?.email,
    password: userInfo?.password,
  });

  //* Auth Hook.
  const { userProfileMutation } = useAuth();

  // Event handlers
  const handleChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userProfileMutation.mutateAsync(userData);
  };

  return (
    <div className=' relative flex flex-col p-8 md:p-0 md:flex-row w-full min-h-screen'>
      {/* Left Section */}
      <div className='w-full md:w-5/12 flex flex-col md:ml-16 justify-center'>
        <Link
          to={'/'}
          className='absolute top-6 md:top-8 left-6 md:left-20 text-[orangered] font-black text-2xl'
        >
          <FaChevronLeft />
        </Link>

        <Logo className={'hidden md:block w-32'} />

        <h1 className='text-[orange] p-3 font-black text-4xl sm:text-6xl mb-16 mt-8'>
          <span className='block text-[#ffbe45]'>Hi there,</span>
          Your Profile is here.
        </h1>
      </div>

      {/* Right Section */}
      <div className='flex items-center justify-center w-full md:w-7/12'>
        <form
          onSubmit={handleSubmit}
          className='flex justify-center flex-col gap-y-0 mx-8 items-center w-full md:w-4/6'
        >
          <div className='w-full'>
            <label htmlFor='username' className='mb-2 font-bold text-xl'>
              Your name:
              <input
                type='text'
                className='input input-bordered w-full bg-transparent text-white font-medium mb-8'
                value={userData.username}
                onChange={handleChange}
                name='username'
                id='username'
              />
            </label>
          </div>

          <div className='w-full'>
            <label htmlFor='email' className='mb-2 font-bold text-xl'>
              Your Email:
              <input
                type='email'
                className='input input-bordered w-full bg-transparent text-white font-medium mb-8'
                onChange={handleChange}
                value={userData.email}
                name='email'
                id='email'
              />
            </label>
          </div>

          <div className='w-full'>
            <label htmlFor='password' className='mb-2 text-xl font-bold'>
              Password:
              <input
                type='password'
                className='input input-bordered block w-full bg-transparent text-white font-medium mb-8'
                onChange={handleChange}
                value={userData.password}
                placeholder='*********'
                name='password'
                id='password'
              />
            </label>
          </div>

          <button type='submit' className='btn ml-4 w-full btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default ProfileScreen;
