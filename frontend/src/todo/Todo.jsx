import Tags from './tag/Tags';
import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import useTags from '../queryhook/useTags';
import SubTasks from './subtask/SubTasks';
import useTodos from '../queryhook/useTodos';
import { Link, useParams } from 'react-router-dom';
import useSubtasks from '../queryhook/useSubtasks';
import CalculateDayLeft from '../components/CalculateDayLeft';
import { LuArrowLeft, LuCheck, LuListTodo, LuLoader } from 'react-icons/lu';

const Todo = () => {
  const { id } = useParams();
  const [tags, setTags] = useState({ name: '', color: '' });
  const [subTask, setSubTask] = useState({ title: '', completed: false });

  //* Todo hook
  const { todo, isTodoLoading, isTodoPending, completeTodoMutation } =
    useTodos(id);
  const { createTagMutation } = useTags(id); //* Tag hook
  const { createSubtaskMutation } = useSubtasks(id); //* Subtask hook

  //* Event handlers.
  const handleTagsSubmit = async (e) => {
    e.preventDefault();
    createTagMutation.mutateAsync(
      { id, body: { ...tags } },
      {
        onSuccess: () => {
          setTags({ name: '', color: '' });
        },
      }
    );
  };

  const handleSubTaskSubmit = async (e) => {
    e.preventDefault();
    createSubtaskMutation.mutateAsync(
      { id, body: { ...subTask } },
      {
        onSuccess: () => {
          setSubTask({ title: '', completed: false });
        },
      }
    );
  };

  const handleCompleteTodo = async (e) => {
    e.preventDefault();
    completeTodoMutation.mutateAsync(id);
  };

  if (isTodoLoading || isTodoPending) {
    return (
      <div>
        <h1 className='flex h-screen justify-center  items-center text-success text-9xl font-black '>
          <span className='loading loading-ring loading-lg'></span>
        </h1>
      </div>
    );
  }

  //priority dynamic bg
  const priorityStyle =
    todo?.priority === 'high'
      ? 'text-rose-500  border border-rose-500 px-4 rounded'
      : todo?.priority === 'medium'
      ? 'text-green-500 border border-green-500 px-4 rounded'
      : todo?.priority === 'low'
      ? 'text-yellow-500 border border-yellow-500 px-4 rounded'
      : null;

  return (
    <div className='flex flex-col lg:flex-row gap-x-4 gap-y-2 relative'>
      {/* Go back arrow */}
      <Link
        to={'/todos'}
        className='absolute top-8 left-8 text-secondary text-4xl'
      >
        <LuArrowLeft size={24} />
      </Link>

      {/* Listing todo desc */}
      <div className='w-full lg:w-7/12 mt-12  p-8 flex flex-col gap-y-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold mb-2 capitalize text-pretty text-primary'>
            {todo.title}
          </h1>

          {/*Edit todo link*/}
          <Link
            to={`/update/${id}`}
            className='font-black tooltip tooltip-accent text-accent '
            data-tip='Edit Todo'
          >
            <FiEdit3 size={28} />
          </Link>
        </div>

        <p className='tracking-wide text-lg text-gray-400'>
          {todo.description}
        </p>

        {/* If todo is not completed show progress */}
        {!todo?.completed && (
          <div className='flex w-fit flex-col lg:flex-row gap-4 lg:items-center justify-between py-2 text-stone-400 font-bold'>
            <p>Today: {new Date().toISOString().slice(0, 10)}</p>
            <CalculateDayLeft dueDate={todo.dueDate} />
            <p>Due date: {new Date(todo.dueDate).toISOString().slice(0, 10)}</p>
          </div>
        )}

        {/* Priority */}
        <div className='flex gap-x-2 items-center text-xl font-semibold '>
          <span> Priority:</span>
          <p
            className={`${priorityStyle} flex items-center gap-2 text-base font-normal pl-4 capitalize`}
          >
            <LuListTodo className='inline-block' /> {todo?.priority}
          </p>
        </div>

        {/* Todo status */}
        <div className='my-4'>
          <span className='font-semibold mr-2 text-xl'>Todo status:</span>
          {todo.completed ? (
            <span
              onClick={handleCompleteTodo}
              className='text-green-400 border cursor-pointer rounded-lg px-3 py-1 border-green-400'
            >
              <LuCheck className='inline-block' /> completed
            </span>
          ) : (
            <span
              onClick={handleCompleteTodo}
              className='text-blue-400 border cursor-pointer rounded-lg px-3 py-1 border-blue-400'
            >
              <LuLoader className='inline-block' /> on progress
            </span>
          )}
        </div>

        <Tags tags={todo?.tags} todoId={id} />
        <SubTasks subTasks={todo?.subTask} todoId={id} />
      </div>

      {/*right layout*/}
      <div className='w-full sm:px-12 relative lg:px-0 lg:w-5/12 flex flex-col items-center '>
        {/*tag form*/}
        <form
          onSubmit={handleTagsSubmit}
          className=' flex flex-col md:sticky md:top-8 form-control w-[90%] p-8 my-8 rounded-box bg-slate-700'
        >
          <h2 className='font-medium mb-2 label label-text text-accent'>
            Tags
          </h2>
          <div className='flex flex-col gap-y-4  w-full'>
            <input
              type='text'
              value={tags.name}
              onChange={(e) => setTags({ ...tags, name: e.target.value })}
              placeholder='Tag title'
              className='input mb-4  bg-transparent border-primary focus:border-rose-400 text-white'
            />

            <input
              type='text'
              value={tags.color}
              onChange={(e) => setTags({ ...tags, color: e.target.value })}
              placeholder='Tag color'
              className='input mb-4  bg-transparent border-primary focus:border-rose-400 text-white'
            />
          </div>

          {/* Tag Action Button */}
          <button className='btn border-none btn-md bg-accent text-zinc-950 hover:text-accent font-medium w-1/2 self-end hover:border-accent hover:bg-zinc-950 text-lg hover:border-2'>
            Add Tag
          </button>
        </form>

        {/* sub task form*/}
        <form
          onSubmit={handleSubTaskSubmit}
          className=' flex flex-col w-[90%] md:sticky md:top-96 form-control p-8 my-8  rounded-box bg-slate-700'
        >
          <h2 className='font-medium mb-2 label label-text text-accent'>
            Sub task
          </h2>
          <div className='flex flex-col gap-y-4 w-full'>
            <input
              type='text'
              value={subTask.title}
              onChange={(e) =>
                setSubTask({ ...subTask, title: e.target.value })
              }
              placeholder='subtask title'
              className='input  mb-4  bg-transparent border-primary text-white focus:border-rose-300'
            />
          </div>

          {/* Subtask Action Button */}
          <button className='btn btn-md bg-accent text-zinc-950 hover:text-accent hover:border-2 font-medium hover:border-accent hover:bg-zinc-950 w-1/2 self-end text-lg '>
            Add Subtask
          </button>
        </form>
      </div>
    </div>
  );
};
export default Todo;
