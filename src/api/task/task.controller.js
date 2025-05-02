import { TaskModel} from '../../models/task.js';
import { UserModel } from '../../models/user.js';
import { TaskStage as stage } from '../../enums/task-stage.enum.js';
import { PriorityCategory as priority } from '../../enums/category-priority.enum.js';

export class TaskController {

   /**
    * @description Método para obtener los estados de las tareas
    */
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

   /**
    * @description Método para obtener las prioridades de las tareas
    */
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

   /**
    * @description Método para obtener todas las tareas
    */
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

   /**
    * @description Método para crear una nueva tarea
    */
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

   /**
    * @description Método para obtener tareas por ID de usuario
    */
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
            message: 'Error fetching tasks',
            error: error.message
         });
      }
   }

   /**
    * @description Método para obtener tareas por estado
    */
   async getTaskByStage(req, res) {
      try {
         const stage = req.query.stage;

         if (!stage) {
            return res.status( 400 ).json({ message: 'Stage is required' });
         }

         const response = await TaskModel.find({ stage });
         res.status( 200 ).json(response);
      } catch (error) {
         res.status( 500 ).json({
            message: 'Error fetching tasks',
            error: error.message
         });
      }
   }

   /**
    * @description Método para obtener tareas por prioridad
    */
   async getTaskByPriority(req, res) {
      try {
         const priority = req.query.priority;

         if (!priority) {
            return res.status( 400 ).json({ message: 'priority is required' });
         }

         const response = await TaskModel.find({ priority });
         res.status( 200 ).json(response);
      } catch (error) {
         res.status( 500 ).json({
            message: 'Error fetching priorities',
            error: error.message
         });
      }
   }

   /**
    * @description Método para obtener tareas por ID de categoría
    */
   async getTaskByCategoryId(req, res) {
      try {
         const categoryId = req.query.id;

         if (!categoryId) {
            return res.status( 400 ).json({ message: 'Category ID is required' });
         }

         const response = await TaskModel.find({ categoryId });
         res.status( 200 ).json(response);
      } catch (error) {
         res.status( 500 ).json({
            message: 'Error fetching tasks',
            error: error.message
         });
      }
   }
}
