import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';
import useTodos from '../queryhook/useTodos';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [tags, setTags] = useState({ name: '', color: '' });
  const [subTask, setSubTask] = useState({ title: '', completed: false });

  //* Todo Hook
  const { createTodoMutation } = useTodos();

  //* handle create todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTodoMutation.mutateAsync({
      title,
      description,
      completed: false,
      dueDate,
      priority,
      tags,
      subTask,
    });
  };

  return (
    <div className='flex flex-col w-full relative md:w-4/6  mx-auto justify-center items-center mb-8'>
      <Link to={'/todos'} className='absolute top-4 left-4 text-[orangered]'>
        <HiArrowLeft size={24} />
      </Link>

      <form onSubmit={handleSubmit} className='p-8 w-full rounded form-control'>
        <h1 className='py-4 text-3xl font-bold text-left text-accent'>
          Add Todo
        </h1>
        {/* Title Input */}
        <div>
          <label htmlFor='date' className='label label-text font-medium'>
            Title
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input input-bordered bg-transparent w-full  mb-4 border-primary focus:border-rose-300 placeholder:text-white/80 py-4  text-white'
            placeholder='Todo title'
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor='desc' className='label label-text font-medium'>
            Description
          </label>

          <textarea
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description....'
            className='input input-bordered   bg-transparent w-full border-primary focus:border-rose-300 placeholder:text-white/80 py-4 text-white mb-4'
          />
        </div>

        {/* Due-date Input */}
        <div>
          <label htmlFor='date' className='label label-text font-medium'>
            Due date
          </label>
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className='input input-bordered  w-full  mb-4 border-primary focus:border-rose-300 text-white'
            placeholder='Todo title'
          />
        </div>

        {/* Priority Input */}
        <div>
          <label htmlFor='priority' className='font-medium label label-text'>
            Priority
          </label>

          <select
            id='priority'
            onChange={(e) => setPriority(e.target.value)}
            className='select select-bordered w-full mb-4  border-primary text-white focus:border-rose-300'
          >
            <option>Make priority</option>
            <option value={'high'}>High</option>
            <option value={'medium'}>Medium</option>
            <option value={'low'}>Low</option>
          </select>
        </div>

        {/* Sub task Input */}
        <div>
          <label className='font-medium label label-text'>Sub task</label>
          <input
            type='text'
            value={subTask.title}
            onChange={(e) => setSubTask({ ...subTask, title: e.target.value })}
            placeholder='Sub task'
            className='input w-full  mb-4  bg-transparent border-primary focus:border-rose-300 text-white focus:rose-lime-300'
          />
        </div>

        {/* Tags Input */}
        <div className='flex flex-col gap-4 md:flex-row w-full items-baseline'>
          <label htmlFor='tag' className='font-medium label label-text'>
            Tags
          </label>
          <input
            id='tag'
            type='text'
            value={tags.name}
            onChange={(e) => setTags({ ...tags, name: e.target.value })}
            placeholder='name'
            className='input w-full md:w-1/2 mb-4  bg-transparent border-primary text-white focus:border-rose-300'
          />

          <input
            type='text'
            value={tags.color}
            onChange={(e) => setTags({ ...tags, color: e.target.value })}
            placeholder='color'
            className='input w-full md:w-1/2  mb-4 bg-transparent  border-primary text-white focus:border-rose-300'
          />
        </div>

        <button
          className='btn bg-accent hover:bg-primary text-slate-900 w-full border-none
        font-bold text-lg'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateTodo;
