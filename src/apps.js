
import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

const app = express(); //Instancia para poder realizar peticiones
app.use(morgan('dev')); //Para ver las peticiones que se realizan en el servidor
app.use(express.json()); //Para poder leer el body de las peticiones en json
app.use('/api',authRoutes); // Rutas de autenticacion



export default app;







