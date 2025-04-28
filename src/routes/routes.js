import express from 'express';
import { UserController } from '../api/user/user.controller.js';
import { CategoryController } from '../api/category/category.controller.js';

const router = express.Router();
const userController = new UserController();
const categoryController = new CategoryController();

// Rutas para usuarios
router.post('/api/v1/user', userController.createUser.bind(userController) );
router.get('/api/v1/users', userController.getAllUsers.bind(userController) );

// Rutas para categorías
router.post('/api/v1/category', categoryController.createCategory.bind(categoryController));
router.get('/api/v1/categories', categoryController.getAllCategories.bind(categoryController) );
router.get('/api/v1/priorities', categoryController.getAllPriorities.bind(categoryController) );

export default router;
