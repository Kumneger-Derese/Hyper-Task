import {
  TbSquareRoundedChevronsLeft,
  TbSquareRoundedChevronsRight,
} from 'react-icons/tb';
import { LuListTodo } from 'react-icons/lu';
import { CgAddR } from 'react-icons/cg';
import { RiHome6Line } from 'react-icons/ri';
import { TbUserCircle } from 'react-icons/tb';
import { MdLogout } from 'react-icons/md';

import Logo from './Logo';
import { Link } from 'react-router-dom';
import useAuth from '../queryhook/useAuth';

const Sidebar = ({ isOpen, setIsOpen }) => {
  //* Auth Hook.
  const { logoutUserMutation } = useAuth();

  // Event Handler
  const handleLogout = () => {
    logoutUserMutation.mutate();
  };

  return (
    <section>
      <div className='lg:hidden'></div>
      <div
        className={`hidden lg:block fixed max-h-screen top-0 bottom-0 left-0 bg-slate-700  `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative top-4 z-50 ${
            isOpen ? 'left-52 -ml-8' : 'left-20 -ml-3'
          }`}
        >
          {isOpen ? (
            <TbSquareRoundedChevronsLeft className='text-[#f86936]' size={32} />
          ) : (
            <TbSquareRoundedChevronsRight
              className='text-[#f86936]'
              size={32}
            />
          )}
        </button>

        <div className='border-b border-b-slate-500  h-8 -mt-4 '>
          <div className='w-12 h-full pl-3'>
            <Logo />
          </div>
        </div>

        <ul className='flex flex-col gap-y-6  w-full font-medium text-lg text-white border-b border-b-slate-500 h-4/5 pt-8 px-4'>
          {/*Menu list*/}
          <Link to='/' className='cursor-pointer flex items-center'>
            <span className={`pr-2 ${!isOpen && 'mx-auto'}`}>
              <RiHome6Line size={30} className={` ${!isOpen && 'text-2xl'}`} />
            </span>
            {isOpen && <span>Home</span>}
          </Link>

          <Link
            to={'/create-todo'}
            className='cursor-pointer flex items-center'
          >
            <span className={`pr-2 ${!isOpen && 'mx-auto'}`}>
              <CgAddR size={30} className={``} />
            </span>
            {isOpen && <span>Create</span>}
          </Link>

          <li className='cursor-pointer flex items-center'>
            <span className={`pr-2 ${!isOpen && 'mx-auto'}`}>
              <LuListTodo size={30} className={`${!isOpen && 'mx-auto'}`} />
            </span>
            {isOpen && <span> Todo list</span>}
          </li>

          <Link to='/profile' className='cursor-pointer flex items-center'>
            <span className={`pr-2 ${!isOpen && 'mx-auto'}`}>
              <TbUserCircle size={30} className={` ${!isOpen && 'text-2xl'}`} />
            </span>
            {isOpen && <span>Profile</span>}
          </Link>
        </ul>

        <div className='h-12 pt-2 pl-4  '>
          <button
            onClick={handleLogout}
            className='cursor-pointer flex items-center text-red-400'
          >
            <span className={`pr-2 ${!isOpen && 'mx-auto'}`}>
              <MdLogout size={30} className={` ${!isOpen && 'text-2xl'}`} />
            </span>
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </section>
  );
};
export default Sidebar;
