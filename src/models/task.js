import mongoose from 'mongoose';
import { TaskStage as stage } from '../enums/task-stage.enum.js';
import { PriorityCategory as priority } from '../enums/category-priority.enum.js';

const taskSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   stage: {
      type: String,
      enum: Object.values(stage),
      default: stage.PENDING
   },
   priority: {
      type: String,
      enum: Object.values(priority),
      default: priority.MIDDLE
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
   }
}, { timestamps: true });

export const TaskModel = mongoose.model('Task', taskSchema);
