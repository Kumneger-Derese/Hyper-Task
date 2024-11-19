import Logo from './Logo';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../queryhook/useAuth';
import { HiBars3BottomRight, HiPlus } from 'react-icons/hi2';

const HomeNavbar = () => {
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [openMenu, setOpenMenu] = useState(false);

  //* Auth Hook.
  const { logoutUserMutation } = useAuth();

  // Event Handlers.
  const handleLogout = () => {
    logoutUserMutation.mutate();
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div
      id='nav'
      className='flex z-[1000] justify-between items-center h-16 sticky top-3 mt-3 bg-accent-content mx-8 px-4 text-lg'
    >
      {/* Logo section */}
      <div className=' text-white rounded-sm flex items-center justify-center'>
        <Logo className={'hidden lg:block'} />

        <h1 className='text-xl font-bold  '>
          Hyper
          <span className='text-[orangered]'>Task</span>
        </h1>
      </div>

      {/* middle section on lg screen */}
      <div className='hidden lg:flex items-center justify-center rounded-full text-white '>
        <ul className='flex gap-8 font-medium'>
          <Link className='text-[orangered] font-bold' to={'/todos'}>
            Tasks
          </Link>

          <Link
            className='text-[orange] border border-orange-400 font-bold flex items-center gap-2 px-2 rounded-md'
            to={'/create-todo'}
          >
            Create <HiPlus size={20} color='orange' />
          </Link>
          <a href='#feature' className='scroll-smooth'>
            Features
          </a>
          <a href='#service'>Services</a>
          <a href='#faq'>FAQ</a>
          <a href='#contact'>Contact</a>
        </ul>
      </div>

      {/* Todos */}
      <Link
        className='text-[orange] flex border border-orange-400 font-bold items-center gap-2 px-2 rounded-md  lg:hidden'
        to={'/create-todo'}
      >
        Create
        <HiPlus size={20} color='orange' />
      </Link>

      {/* Button or Login */}
      <section className='flex items-center justify-center'>
        {userInfo ? (
          <button onClick={handleOpenMenu}>
            <HiBars3BottomRight size={32} />
          </button>
        ) : (
          <Link to={'/login'} className='text-white font-bold'>
            Login
          </Link>
        )}
      </section>

      {/* Dropdown section */}

      {openMenu && (
        <div className='absolute text-lg top-16 right-8 p-4 bg-gray-700 text-white/80'>
          <ul className='flex flex-col gap-y-2 w-32'>
            <div className='lg:hidden flex flex-col gap-x-2'>
              <Link className='text-[orangered] font-bold' to={'/todos'}>
                Tasks
              </Link>
              <a
                onClick={() => setOpenMenu(false)}
                href='#feature'
                className='scroll-smooth'
              >
                Features
              </a>
              <a onClick={() => setOpenMenu(false)} href='#service'>
                Services
              </a>
              <a onClick={() => setOpenMenu(false)} href='#faq'>
                FAQ
              </a>
              <a onClick={() => setOpenMenu(false)} href='#contact'>
                Contact
              </a>
            </div>

            {userInfo && (
              <div className='flex flex-col  gap-y-2'>
                <li>
                  <Link
                    to={'/profile'}
                    className='btn btn-sm rounded-sm w-24 text-white'
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className='btn btn-sm rounded-sm w-24 text-white'
                  >
                    Logout
                  </button>{' '}
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default HomeNavbar;
