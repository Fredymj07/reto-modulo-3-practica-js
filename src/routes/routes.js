import express from 'express';
import { UserController } from '../api/user/user.controller.js';
import { CategoryController } from '../api/category/category.controller.js';
import { TaskController } from '../api/task/task.controller.js';

const router = express.Router();
const userController = new UserController();
const categoryController = new CategoryController();
const taskController = new TaskController();

// Rutas para usuarios
router.post('/api/v1/user', userController.createUser.bind(userController) );
router.get('/api/v1/users', userController.getUsers.bind(userController) );
router.get('/api/v1/user', userController.findUserById.bind(userController) );

// Rutas para categorías
router.post('/api/v1/category', categoryController.createCategory.bind(categoryController));
router.get('/api/v1/categories', categoryController.getCategories.bind(categoryController) );
router.get('/api/v1/category', categoryController.findCategoryById.bind(categoryController) );

// Rutas para tareas
router.post('/api/v1/task', taskController.createTask.bind(taskController));
router.get('/api/v1/stages', taskController.getStages.bind(taskController) );
router.get('/api/v1/priorities', taskController.getPriorities.bind(taskController) );
router.get('/api/v1/tasks', taskController.getTasks.bind(taskController) );
router.get('/api/v1/tasksByUser', taskController.getTaskByUserId.bind(taskController) );
router.get('/api/v1/tasksByStage', taskController.getTaskByStage.bind(taskController) );
router.get('/api/v1/tasksByPriority', taskController.getTaskByPriority.bind(taskController) );
router.get('/api/v1/tasksByCategory', taskController.getTaskByCategoryId.bind(taskController) );

export default router;
