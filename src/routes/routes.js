import express from 'express';
import { UserController } from '../api/user/user.controller.js';

const router = express.Router();
const userController = new UserController();

router.post('/api/v1/user', userController.createUser.bind(userController) );
router.get('/api/v1/users', userController.getAllUsers.bind(userController) );

export default router;
