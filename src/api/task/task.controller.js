import { TaskModel} from '../../models/task.js';
import { UserModel } from '../../models/user.js';
import { TaskStage as stage } from '../../enums/task-stage.enum.js';
import { PriorityCategory as priority } from '../../enums/category-priority.enum.js';

export class TaskController {

   async createTask(req, res) {
      try {
         // Creación de nueva tarea
         const { title, description, stage, priority, userId, categoryId } = req.body;
         const newTask = new TaskModel({ title, description, stage, priority, userId, categoryId });
         const saveTask = await newTask.save();

         // Asociación de la tarea al usuario
         await UserModel.findByIdAndUpdate(
            userId,
            { $push: { tasks: saveTask._id } },
            { new: true }
         );

         // Respuesta de la operación
         res.status(201).json({
            message: 'Task created successfully',
            task: newTask
         });
      } catch (error) {
         res.status(500).json({
            message: 'Error creating task',
            error: error.message
         });
      }
   }

   async getTasks( req, res ) {
      try {
         const response = await TaskModel.find();
         res.status( 200 ).json(response);
      } catch (error) {
         res.status( 500 ).json({
            message: 'Error fetching tasks',
            error: error.message
         });
      }
   }

   async getStages( req, res ) {
      try {
         res.status( 200 ).json( Object.values(stage) );
      } catch (error) {
         res.status( 500 ).json({
            message: 'Error fetching stages',
            error: error.message
         });
      }
   }

   async getPriorities( req, res ) {
      try {
         res.status( 200 ).json( Object.values( priority ) );
      } catch ( error ) {
         res.status( 500 ).json({
            message: 'Error fetching priorities',
            error: error.message
         });
      }
   }

   async getTaskByUserId(req, res) {
      try {
         const userId = req.query.id;

         if (!userId) {
            return res.status( 400 ).json({ message: 'User ID is required' });
         }

         const response = await TaskModel.find({ userId });
         res.status( 200 ).json(response);
      } catch (error) {
         res.status( 500 ).json({
            message: 'Error fetching priorities',
            error: error.message
         });
      }
   }
}
