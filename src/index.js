import app from './apps.js';
import { connectMongo } from './db.js';

connectMongo(); //Conexion a la base de datos
app.listen(3000);//Escuchando el servidor 
console.log('server listening on port 3000');