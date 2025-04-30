import { CategoryModel } from '../../models/category.js';

export class CategoryController {

   async createCategory( req, res ) {
      try {
         const { name, priority } = req.body;
         const newCategory = new CategoryModel({ name, priority });
         await newCategory.save();
         console.log(newCategory);

         res.status( 201 ).json({
            message: 'Category created successfuly',
            category: newCategory
         });
      } catch (error) {
         res.status( 500 ).json({
            message: 'Error creating category',
            error: error.message
         });
      }
   }

   async getCategories( req, res ) {
      try {
         const data = await CategoryModel.find();
         res.status( 200 ).json( data );
      } catch (error) {
         res.status( 500 ).json({
            message: 'Error fetching categories',
            error: error.message
         });
      }
   }

   async findCategoryById(req, res) {
      try {
         const categoryId = req.query.id;
         const response = await CategoryModel.findById(categoryId);

         if (!response) {
            return res.status( 400 ).json({ message: 'Category not found' });
         }

         res.status( 200 ).json( response );
      } catch (error) {
         res.status(500).json({
            message: 'Category not found',
            error: error.message
         });
      }
   }
}
