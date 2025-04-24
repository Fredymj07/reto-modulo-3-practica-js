import { UserModel } from '../../models/user.js';

export class UserController {

   async createUser(req, res) {
      try {
         const { name, email } = req.body;
         const newUser = new UserModel({ name, email });
         await newUser.save();
         console.log(newUser);

         res.status(201).json({
            message: 'User created successfully',
            user: newUser
         });
      } catch (error) {
         res.status(500).json({
            message: 'Error creating user',
            erro: error.message
         });
      }
   }

   async getAllUsers(req, res) {
      try {
         const data = await UserModel.find();
         res.status(200).json(data);
      } catch (error) {
         res.status(500).json({
            message: 'Error fetching users',
            error: error.message
         });
      }
   }
}
