import joi from 'joi';

const createTodoSchema = {
  body: joi
    .object()
    .keys({
      title: joi.string().required(),
      description: joi.string().optional(),
      dueDate: joi.date().required(),
      completed: joi.boolean().default(false),
      priority: joi.string().valid('high', 'medium', 'low').required(),
    })
    .unknown(),
};

const updateTodoSchema = {
  body: joi
    .object()
    .keys({
      title: joi.string().optional(),
      description: joi.string().optional(),
      dueDate: joi.date().optional(),
      completed: joi.boolean(),
      priority: joi.string().valid('high', 'medium', 'low').optional(),
    })
    .unknown(),
};

const subTodoSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    completed: joi.boolean().optional(),
  }),
};

const tagsSchema = {
  body: joi.object().keys({
    name: joi.string().required(),
    color: joi.string().required(),
  }),
};

export { createTodoSchema, updateTodoSchema, subTodoSchema, tagsSchema };
