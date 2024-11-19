import Todo from '../Models/todoModel.js';
import ApiError from '../utils/ApiError.js';

const createTagService = async (req) => {
  const { todoId } = req.params;
  const user = req.user._id;

  const todo = await Todo.findOne({ _id: todoId, user });
  if (!todo) throw new ApiError(404, 'Todo not found');

  todo.tags.push(req.body);
  await todo.save();
  return todo;
};

const updateTagService = async (req) => {
  const { todoId, tagId } = req.params;
  const { name, color } = req.body;
  const user = req.user._id;

  const todo = await Todo.findOne({ _id: todoId, user });
  if (!todo) throw new ApiError(404, 'Todo not found');

  const tag = todo.tags.id(tagId);
  if (!tag) throw new ApiError(404, 'Tag not found');

  tag.name = name;
  tag.color = color;

  await todo.save();
  return todo;
};

const deleteTagService = async (req) => {
  const { todoId, tagId } = req.params;
  const user = req.user._id;

  const todo = await Todo.findOne({ _id: todoId, user });
  if (!todo) throw new ApiError(404, 'Todo not found');

  const tag = todo.tags.id(tagId);
  if (!tag) throw new ApiError(404, 'Tag not found');

  tag.deleteOne();

  await todo.save();
  return todo;
};

export { createTagService, updateTagService, deleteTagService };
