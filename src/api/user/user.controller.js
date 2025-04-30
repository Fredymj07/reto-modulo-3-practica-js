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
            error: error.message
         });
      }
   }

   async getUsers(req, res) {
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

   async findUserById(req, res) {
      try {
         const userId = req.query.id;
         const response = await UserModel.findById(userId);

         if (!response) {
            return res.status( 400 ).json({ message: 'User not found' });
         }

         res.status( 200 ).json( response );
      } catch (error) {
         res.status(500).json({
            message: 'User not found',
            error: error.message
         });
      }
   }
}
