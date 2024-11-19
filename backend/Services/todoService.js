import Todo from '../Models/todoModel.js';
import ApiError from '../utils/ApiError.js';

const createTodoService = async (req) => {
  const user = req.user._id;

  //copy all request body and add user also
  const todo = await Todo.create({ ...req.body, user });

  if (!todo) {
    throw new ApiError(400, 'Todo Not Created .');
  }
  return todo;
};

const completeTodoService = async (req) => {
  const user = req.user._id;
  const { todoId } = req.params;

  let statusMessage;

  const todo = await Todo.findOne({ user, _id: todoId });

  if (!todo) {
    throw new ApiError(404, 'Todo Not Found.');
  }

  if (todo.completed === true) {
    todo.completed = false;
    statusMessage = 'Task on progress.';
  } else {
    todo.completed = true;
    statusMessage = 'Task completed.';
  }

  await todo.save();
  return statusMessage;
};

const getTodosService = async (user) => {
  const todo = await Todo.find({ user });

  return todo;
};

const getTodoService = async (id, user) => {
  const todo = await Todo.findOne({ _id: id, user });

  if (!todo) {
    throw new ApiError(404, 'Todo not found .');
  }

  return todo;
};

const updateTodoService = async (req) => {
  const id = req.params.id;
  const user = req.user._id;

  const { title, description, dueDate, completed, priority } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user },
    { title, description, dueDate, completed, priority },
    { new: true }
  );

  if (!todo) {
    throw new ApiError(404, 'Todo to be updated is not found .');
  }

  return todo;
};

const deleteTodoService = async (req) => {
  const id = req.params.id;
  const user = req.user._id;

  const todo = await Todo.findOneAndDelete({ _id: id, user });

  if (!todo) {
    throw new ApiError(404, 'Todo to be deleted not found .');
  }
  return todo;
};

export {
  createTodoService,
  completeTodoService,
  getTodosService,
  getTodoService,
  updateTodoService,
  deleteTodoService,
};
