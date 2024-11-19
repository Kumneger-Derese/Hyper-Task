import {
  createTagService,
  deleteTagService,
  updateTagService,
} from '../Services/tagService.js';
import asyncHandler from '../utils/asyncHandler.js';

const createTag = asyncHandler(async (req, res, next) => {
  const tag = await createTagService(req);
  res.status(201).json(tag);
});

const updateTag = asyncHandler(async (req, res, next) => {
  const tag = await updateTagService(req);
  res.status(200).json(tag);
});

const deleteTag = asyncHandler(async (req, res, next) => {
  const tag = await deleteTagService(req);
  res.status(200).json(tag);
});

export { createTag, updateTag, deleteTag };
