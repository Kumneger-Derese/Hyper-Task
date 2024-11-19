import {
  completeSubTodoService,
  createSubTodoService,
  deleteSubTodoService,
  updateSubTodoService,
} from '../Services/subTodoService.js';
import asyncHandler from '../utils/asyncHandler.js';

const createSubTodo = asyncHandler(async (req, res, next) => {
  const subTodo = await createSubTodoService(req);

  res.status(200).json(subTodo);
});

const completeSubTodo = asyncHandler(async (req, res, next) => {
  const statusMessage = await completeSubTodoService(req);
  res.status(200).json(statusMessage);
});

const updateSubTodo = asyncHandler(async (req, res, next) => {
  const subTodo = await updateSubTodoService(req);
  res.status(200).json(subTodo);
});

const deleteSubTodo = asyncHandler(async (req, res, next) => {
  const subTodo = await deleteSubTodoService(req);
  res.status(200).json(subTodo);
});

export { createSubTodo, completeSubTodo, updateSubTodo, deleteSubTodo };
