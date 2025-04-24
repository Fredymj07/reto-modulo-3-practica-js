import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { Database } from './configuration/database.js';
import routes from './routes/routes.js';

/* Initializations */
dotenv.config();
const app = express();

/* Settings */
app.set('port', process.env.PORT || 3001);

/* Middelwares */
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( (req, res, next) => {
   console.log(`${req.url} - ${req.method}`);
   next();
});

app.use(cors());

/* Routes */
app.use( routes );

app.get( '/api/v1', (req, res) => {
   res.json({
      message: 'Welcome to the API',
   });
});

/* Start server */
(async () => {
   try {
      await new Database();
      console.log('Database connection established');

      // Start the server after the database connection is established
      app.listen(app.get('port'), () => {
         console.log(`Server on port ${app.get('port')}`);
      });
   } catch (error) {
      console.error('Failed to connect to the database:', error);
      process.exit(1); // Exit the process with an error code
   }
})();
