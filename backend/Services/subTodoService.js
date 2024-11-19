import Todo from '../Models/todoModel.js';
import ApiError from '../utils/ApiError.js';

const createSubTodoService = async (req) => {
  const { todoId } = req.params;
  const user = req.user._id;

  const todo = await Todo.findOne({ _id: todoId, user });
  if (!todo) {
    throw new ApiError(404, 'Todo not found.');
  }

  todo.subTask.push(req.body);
  await todo.save();
  return todo;
};

const completeSubTodoService = async (req) => {
  let statusMessage;

  const user = req.user._id;
  const { todoId, subTodoId } = req.params;

  const todo = await Todo.findOne({ _id: todoId, user });
  if (!todo) throw new ApiError(404, 'Todo not found.');

  const subTodo = todo.subTask.id(subTodoId);
  if (!subTodo) throw new ApiError(404, 'Sub todo not found.');

  if (subTodo.completed === true) {
    subTodo.completed = false;
    statusMessage = 'Subtask on progress.';
  } else {
    subTodo.completed = true;
    statusMessage = 'Subtask completed.';
  }

  await todo.save();
  return statusMessage;
};

const updateSubTodoService = async (req) => {
  const { todoId, subTodoId } = req.params;
  const { title, completed } = req.body;
  const user = req.user._id;

  const todo = await Todo.findOne({ _id: todoId, user });
  if (!todo) throw new ApiError(404, 'Todo not found.');

  const subTodo = todo.subTask.id(subTodoId);
  if (!subTodo) throw new ApiError(404, 'Sub todo not found.');

  subTodo.title = title;
  subTodo.completed = completed;

  //updating sub document
  //   const todo = await Todo.findOneAndUpdate(
  //     { _id: todoId, 'subTask._id': subTodoId },
  //     { $set: { 'subTask.$.title': title, 'subTask.$.completed': completed } },
  //     { new: true }
  //   );
  // const subTodo = todo.subTask.id(subTodoId);
  //   if (!subTodo) throw new ApiError(404, 'Sub todo not found.');

  await todo.save();
  return todo;
};

const deleteSubTodoService = async (req) => {
  const { todoId, subTodoId } = req.params;
  const user = req.user._id;

  const todo = await Todo.findOne({ _id: todoId, user });
  if (!todo) throw new ApiError(404, 'Todo not found.');

  const subTodo = todo.subTask.id(subTodoId);
  if (!subTodo) throw new ApiError(404, 'Sub todo not found.');

  await subTodo.deleteOne();
  await todo.save();
  return todo;
};

export {
  createSubTodoService,
  completeSubTodoService,
  updateSubTodoService,
  deleteSubTodoService,
};
