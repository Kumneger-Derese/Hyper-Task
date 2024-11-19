import { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import { Link } from 'react-router-dom';
import useTodos from '../queryhook/useTodos';
import {
  HiMiniMagnifyingGlass,
  HiOutlineFunnel,
  HiPlus,
} from 'react-icons/hi2';

const TodoList = ({ isOpen }) => {
  const [query, setQuery] = useState('');
  const [taskList, setTaskList] = useState([]);
  const { todos, isTodosError, todosError, isTodosPending } = useTodos();

  useEffect(() => {
    setTaskList(todos);
  }, [todos]);

  if (isTodosError) {
    return (
      <div className='flex h-screen w-full justify-center items-center'>
        <h1 className=' text-warning font-black text-4xl'>
          {todosError?.message}
        </h1>
      </div>
    );
  }

  if (isTodosPending) {
    return (
      <div className='flex justify-center w-full items-center h-screen '>
        <span className='text-green-500 text-9xl  loading loading-bars loading-lg'></span>
      </div>
    );
  }

  const filterPTask = (priority) => {
    let task = taskList;

    task = todos?.filter((todo) => {
      if (priority === 'all') return todo;
      return todo.priority === priority;
    });

    setTaskList(task);
  };

  const handleAllPTask = () => filterPTask('all');
  const handleLowPTask = () => filterPTask('low');
  const handleMediumPTask = () => filterPTask('medium');
  const handleHighPTask = () => filterPTask('high');

  const handleSearch = (query) => {
    setQuery(query);
    let filteredTasks = taskList;

    filteredTasks = todos?.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setTaskList(filteredTasks);
  };

  return (
    <div className={'w-full mb-32'}>
      {/* Header */}
      <header className='flex mb-4 p-2 sm:p-4 justify-between'>
        <Link
          to={'/'}
          className='text-3xl sm:text-4xl  font-black text-[orangered]'
        >
          Hyper<span className='text-white'>Task</span>
        </Link>

        <Link
          to={'/create-todo'}
          className='font-bold text-secondary border border-secondary sm:text-lg btn'
        >
          <HiPlus size={24} /> Create Todo
        </Link>
      </header>

      {/* Search and Filter set */}
      <div className='px-8 flex gap-x-8 md:items-center justify-between'>
        {/* Search */}
        <div className='flex items-center '>
          <input
            type='text'
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder='search tasks...'
            className='input input-bordered min-w-min ml-8 bg-transparent input-accent'
          />
          <HiMiniMagnifyingGlass
            type='button'
            size={32}
            className='-ml-12 z-50 text-accent cursor-pointer hover:text-primary'
          />
        </div>

        {/* Priority */}
        <div className='dropdown dropdown-bottom'>
          <label
            tabIndex={0}
            className='btn m-1 flex gap-x-2 border border-accent'
          >
            <HiOutlineFunnel size={24} />
            <span className='hidden sm:block'>Priority</span>
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content z-[1] menu p-2 flex  flex-col pl-4 gap-y-1 font-bold cursor-pointer shadow bg-accent text-accent-content rounded w-32 -ml-24'
          >
            <li
              className='hover:bg-primary px-2 py-1 hover:text-primary-content rounded-md'
              onClick={handleAllPTask}
            >
              All
            </li>
            <li
              className='hover:bg-primary px-2  py-1 hover:text-primary-content rounded-md'
              onClick={handleLowPTask}
            >
              Low
            </li>
            <li
              className='hover:bg-primary px-2 py-1 hover:text-primary-content rounded-md'
              onClick={handleMediumPTask}
            >
              Medium
            </li>
            <li
              className='hover:bg-primary px-2 py-1 hover:text-primary-content rounded-md'
              onClick={handleHighPTask}
            >
              High
            </li>
            <li></li>
          </ul>
        </div>
      </div>

      {/* BlogList */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center my-12 gap-4'>
        {taskList?.length === 0 ? (
          <div className='text-2xl items-center justify-center  text-orange-500 font-bold flex flex-col sm:flex-row gap-4 p-2 mt-32 rounded-md'>
            No Tasks ?
            <span className='flex items-center gap-x-4 justify-center border p-2 border-orange-500 rounded-md'>
              <Link to={'/create-todo'}>Create Todo</Link> <HiPlus size={32} />
            </span>
          </div>
        ) : (
          taskList?.map((todo) => (
            <TodoCard key={todo.id} todo={todo} isOpen={isOpen} />
          ))
        )}
      </div>
    </div>
  );
};
export default TodoList;
