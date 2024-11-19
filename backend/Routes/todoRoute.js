import { Router } from 'express';
import validate from '../Middleware/validate.js';
import {
  completeTodo,
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '../Controllers/todoController.js';
import {
  createTodoSchema,
  subTodoSchema,
  tagsSchema,
  updateTodoSchema,
} from '../Validations/todoValidation.js';
import auth from '../Middleware/auth.js';
import {
  completeSubTodo,
  createSubTodo,
  deleteSubTodo,
  updateSubTodo,
} from '../Controllers/subTodoController.js';
import {
  createTag,
  deleteTag,
  updateTag,
} from '../Controllers/tagController.js';

const router = Router();

//Todo: Todo router
router.get('/get-todos', auth, getTodos);
router.get('/get-todo/:id', auth, getTodo);
router.patch('/complete/:todoId', auth, completeTodo);
router.post('/create', auth, validate(createTodoSchema), createTodo);
router.put('/update/:id', auth, validate(updateTodoSchema), updateTodo);
router.delete('/delete/:id', auth, deleteTodo);

//Todo: Sub-todo router
router.post('/sub-todo/:todoId', auth, validate(subTodoSchema), createSubTodo);
router.patch('/complete-subtask/:todoId/:subTodoId', auth, completeSubTodo);

router.put(
  '/sub-todo/:todoId/:subTodoId',
  auth,
  validate(subTodoSchema),
  updateSubTodo
);
router.delete('/sub-todo/:todoId/:subTodoId', auth, deleteSubTodo);

//Todo: Tags router
router.post('/create-tag/:todoId', auth, validate(tagsSchema), createTag);
router.put('/update-tag/:todoId/:tagId', auth, validate(tagsSchema), updateTag);
router.delete('/delete-tag/:todoId/:tagId', auth, deleteTag);

export default router;
