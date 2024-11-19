import { Link } from 'react-router-dom';

const TodoCard = ({ todo }) => {
  //priority dynamic bg
  const priorityStyle =
    todo.priority === 'high'
      ? 'text-rose-500 '
      : todo.priority === 'medium'
      ? 'text-green-500'
      : todo.priority === 'low'
      ? 'text-yellow-500'
      : null;

  return (
    <div
      key={todo.id}
      className={`card card-bordered hover:border-2  border-primary min-h-80 bg-slate-800 shadow-xl text-stone-300`}
    >
      <div className='card-body '>
        <h2 className='card-title font-bold text-xl capitalize text-gray-100'>
          {todo.title}
        </h2>

        <p className='line-clamp-3'>{todo.description}</p>

        <h3 className={`${priorityStyle} font-bold capitalize`}>
          {todo.priority}
        </h3>

        {/* Tag list */}

        <div className='flex'>
          <span className='font-bold text-gray-200  mr-2'>Tags:</span>
          {todo.tags.slice(0, 3).map((tag) => (
            <p className='font-semibold text-secondary' key={tag._id}>
              {tag.name}
            </p>
          ))}
        </div>

        {/* Subtask list */}

        <div className='flex'>
          <span className='font-bold text-gray-200  mr-2'>SubTask:</span>
          {todo.subTask.slice(0, 1).map((task) => (
            <p key={task._id}>{task.title}</p>
          ))}
        </div>

        {/* Card actions */}

        <div className='card-actions justify-between'>
          <Link to={`/todo/${todo.id}`} className='btn btn-md px-6 btn-primary'>
            Manage
          </Link>
          <Link
            to={`/update/${todo.id}`}
            className='btn btn-md px-6 btn-primary'
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TodoCard;
