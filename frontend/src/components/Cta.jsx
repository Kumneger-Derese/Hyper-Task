import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cta = () => {
  const info = useSelector((store) => store.auth.userInfo);
  let userInfo;

  if (info) {
    userInfo = info.user;
  }

  return (
    <div className='md:mx-20 relative my-16 bg-gradient-to-r flex flex-col p-12 lg:rounded-tl-full items-center justify-center from-secondary/70 to-secondary min-h-80'>
      <h1 className='font-bold text-4xl mb-8 text-base-300 md:px-24 mx-auto w-full'>
        <p>
          <span className='text-white'>Manage</span> All your task at your
          fingertip with Hyper
          <span className='text-white'>Task</span>.
        </p>
      </h1>

      <Link
        to={userInfo ? '/todos' : '/login'}
        className='btn hover:text-white md:btn-md border-none bg-white text-base-300 w-40 px-4 
        font-black text-lg'
      >
        {userInfo ? 'Manage Task' : 'Get Started'}
      </Link>

      <img
        src='/black-dots.png'
        className='absolute bottom-8 w-16 right-8 sm:w-24 sm:right-16'
        alt='hero image'
      />
    </div>
  );
};
export default Cta;
