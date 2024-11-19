import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import useTodos from '../queryhook/useTodos';
import { HiArrowLeft } from 'react-icons/hi2';

const EditTodo = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //* Todo Hook
  const { todo, isTodoLoading, editTodoMutation, deleteTodoMutation } =
    useTodos(id);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [completed, setCompleted] = useState();
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setCompleted(todo.completed || false);
      setDueDate(todo.dueDate.substring(0, 10) || '');
      setPriority(todo.priority || '');
    }
  }, [todo]);

  //* Event handlers.
  const handleSubmit = async (e) => {
    e.preventDefault();
    editTodoMutation.mutateAsync({
      id,
      body: {
        title,
        description,
        completed,
        dueDate,
        priority,
      },
    });
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate(id);
    closeModal();
  };

  if (isTodoLoading) {
    return (
      <div>
        <h1 className='flex h-screen justify-center  items-center text-success text-9xl font-black '>
          <span className='loading loading-ring loading-lg'></span>
        </h1>
      </div>
    );
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-full md:w-7/12 mx-auto'>
      <Link to={'/todos'} className='absolute top-4 left-4 text-[orangered]'>
        <HiArrowLeft size={24} />
      </Link>

      <form onSubmit={handleSubmit} className='p-8 rounded form-control'>
        <h1 className='py-4 text-3xl font-bold text-left text-accent'>
          Edit Todo
        </h1>
        {/* Title Input */}
        <div>
          <label htmlFor='title' className='label label-text font-medium'>
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input input-bordered bg-transparent w-full mb-4 border-primary focus:border-rose-300 placeholder:text-white text-white'
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor='desc' className='label label-text font-medium'>
            Description
          </label>
          <textarea
            type='text'
            rows={3}
            id='desc'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='input input-bordered  bg-transparent w-full border-primary mb-4 placeholder:align-middle focus:border-rose-300 text-white placeholder:text-white'
          />
        </div>

        <div className='flex gap-4 gap-x-8 flex-col md:flex-row items-baseline w-full'>
          {/* Checkbox */}
          <div className='flex w-full md:w-1/3 gap-x-4 items-center'>
            <label htmlFor='complete' className='label label-text font-medium'>
              Toggle state
            </label>

            <input
              type='checkbox'
              id='complete'
              checked={completed}
              className='checkbox border-primary w-12 h-11'
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>

          {/* Date */}
          <div className='flex gap-x-4 w-full md:w-2/3 items-baseline'>
            <label htmlFor='date' className='label label-text font-medium'>
              Due date
            </label>

            <input
              type='date'
              id='date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className='input input-bordered   mb-4 border-primary focus:border-rose-300 text-white'
            />
          </div>
        </div>

        <div>
          <label className='font-medium'>Priority</label>
          <select
            onChange={(e) => setPriority(e.target.value)}
            className='select select-bordered w-full mb-8 border-primary text-white focus:border-rose-300 '
            value={priority}
          >
            <option disabled>Make priority</option>
            <option value={'high'}>High</option>
            <option value={'medium'}>Medium</option>
            <option value={'low'}>Low</option>
          </select>
        </div>

        <div className='w-full flex justify-between'>
          <button
            type='submit'
            className='btn w-8/12 bg-accent hover:bg-accent/70 text-slate-900 border-none
        font-bold text-lg'
          >
            Update
          </button>

          <button
            type='button'
            onClick={openModal}
            className='btn w-3/12 bg-red-500 hover:bg-red-700 text-slate-900  border-none
        font-bold text-lg'
          >
            Delete
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <p className='font-bold text-stone-300 text-2xl '>
              Are you sure you want to delete this task?{' '}
            </p>
            <div className='flex gap-x-8 mt-8'>
              <button
                onClick={closeModal}
                className='btn btn-md px-6 btn-warning'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='btn btn-md px-6 btn-error'
              >
                Delete
              </button>
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};
export default EditTodo;
