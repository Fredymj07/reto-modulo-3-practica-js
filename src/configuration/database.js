import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
   constructor() {

      if (!Database.instance) {
         const uri = process.env.DATABASE_URL;

         // Verificar si la variable de entorno DATABASE_URL está definida
         if (!uri) {
            throw new Error('DATABASE_URL is not defined in .env file');
         }

         // Conectar a la base de datos
         mongoose.connect(uri)
            .then(() => {
               console.log('Database connected successfully. Connected to:', mongoose.connection.name);
            })
            .catch((error) => {
               console.error('Database connection error:', error);
            });

         Database.instance = this;
      }

      return Database.instance;
   }

   // Método para obtener la conexión actual
   static getConnection() {
      if (!Database.instance) {
         throw new Error('Database is not initialized. Call the constructor first.');
      }

      return mongoose.connection;
   }
}
