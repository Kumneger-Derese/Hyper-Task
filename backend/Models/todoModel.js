import mongooseToJson from '@meanie/mongoose-to-json';
import { Schema, model } from 'mongoose';

const tagSchema = new Schema({ name: String, color: String });

const subTaskSchema = new Schema({
  title: { type: String },
  completed: { type: Boolean, default: false },
});

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
    tags: [tagSchema],
    subTask: [subTaskSchema],
  },
  { timestamps: true }
);

todoSchema.plugin(mongooseToJson);

const Todo = model('Todo', todoSchema);
export default Todo;
