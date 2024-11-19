import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
  const info = useSelector((store) => store.auth.userInfo);
  let userInfo;

  if (info) {
    userInfo = info.user;
  }
  return (
    <div
      id='hero'
      className='flex flex-col md:flex-row gap-8 w-full mb-24 px-8 '
    >
      {/* left section */}
      <section className='flex flex-col w-full lg:w-1/2 mt-8 lg:mt-32 relative'>
        <h1 className='font-black text-4xl md:text-6xl mb-4 text-[orangered]/95 leading-tight '>
          Take Control of Your Day with Hyper
          <span className='text-white'>Task</span>!
        </h1>

        <h6 className='mt-4 mb-8 text-lg '>
          Organize, prioritize, and conquer your to-dos with the ultimate task
          management app that adapts to your workflow.
        </h6>

        <Link
          to={userInfo ? '/todos' : 'register'}
          className='btn btn-md bg-white text-rose-500 w-fit px-4 
        font-black text-lg'
        >
          {userInfo ? 'Manage Task' : 'Create Account'}
        </Link>
      </section>

      {/* Right section */}
      <section className='flex items-baseline mt-16 w-full justify-center lg:w-1/2 relative'>
        <img
          src='/hero.png'
          className='w-[70%] md:w-[80%] z-50'
          alt='hero image'
        />
        <img
          src='/dots.png'
          className='absolute top-12 left-12'
          alt='hero image'
        />
      </section>
    </div>
  );
};
export default Hero;
