const CalculateDayLeft = ({ dueDate }) => {
  //* To check todo date.

  const due = new Date(dueDate);
  const today = new Date();

  let taskStatus;

  const timeDiff = due - today;

  const dayLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (dayLeft > 1) {
    taskStatus = (
      <span className='border-2 inline-block px-4 rounded border-green-400 text-green-300 font-medium'>
        {dayLeft} day left
      </span>
    );
  } else if (dayLeft === 1) {
    taskStatus = (
      <span className='border-2 inline-block px-4 rounded border-blue-400 text-blue-300 font-medium'>
        {dayLeft} day left
      </span>
    );
  } else if (dayLeft === 0) {
    taskStatus = (
      <span className='border-2 inline-block px-4 rounded border-amber-400 text-amber-300 font-medium'>
        Due today
      </span>
    );
  } else {
    taskStatus = (
      <span className='border-2 inline-block px-4 rounded border-red-400 text-red-300 font-medium'>
        Task overdue by {Math.abs(dayLeft)} day(s)
      </span>
    );
  }

  return taskStatus;
};

export default CalculateDayLeft;
