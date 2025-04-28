import { CategoryModel } from '../../models/category.js';
import { CategoryPriority } from '../../models/category-priority.enum.js';

export class CategoryController {

   async createCategory(req, res) {
      try {
         const { name } = req.body;
         const newCategory = new CategoryModel({ name });
         await newCategory.save();
         console.log(newCategory);

         res.status(201).json({
            message: 'Category created successfuly',
            category: newCategory
         });
      } catch (error) {
         res.status(500).json({
            message: 'Error creating category',
            error: error.message
         });
      }
   }

   async getAllCategories(req, res) {
      try {
         const data = await CategoryModel.find();
         res.status(200).json(data);
      } catch (error) {
         res.status(500).json({
            message: 'Error fetching categories',
            error: error.message
         });
      }
   }

   async getAllPriorities(req, res) {
      try {
         res.status(200).json(CategoryPriority);
      } catch (error) {
         res.status(500).json({
            message: 'Error fetching priorities',
            error: error.message
         });
      }
   }
}
