import httpStatus from 'http-status';
import {
  completeTodoService,
  createTodoService,
  deleteTodoService,
  getTodoService,
  getTodosService,
  updateTodoService,
} from '../Services/todoService.js';
import asyncHandler from '../utils/asyncHandler.js';

const createTodo = asyncHandler(async (req, res, next) => {
  const todo = await createTodoService(req);
  res.status(httpStatus.CREATED).json(todo);
});

const completeTodo = asyncHandler(async (req, res, next) => {
  const statusMessage = await completeTodoService(req);
  res.status(httpStatus.OK).json(statusMessage);
});

const getTodos = asyncHandler(async (req, res, next) => {
  const user = req.user._id;

  const todo = await getTodosService(user);
  res.status(httpStatus.OK).json(todo);
});

const getTodo = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = req.user._id;

  const todo = await getTodoService(id, user);
  res.status(httpStatus.OK).json(todo);
});

const updateTodo = asyncHandler(async (req, res, next) => {
  const todo = await updateTodoService(req);
  res.status(httpStatus.OK).json(todo);
});

const deleteTodo = asyncHandler(async (req, res, next) => {
  await deleteTodoService(req);
  res.status(httpStatus.OK).json({ message: 'Todo deleted' });
});

export { createTodo, completeTodo, getTodos, getTodo, updateTodo, deleteTodo };
