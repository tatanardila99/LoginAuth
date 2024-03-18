import { Router} from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = Router(); //Instancia para poder realizar peticiones


router.post('/login', login);
router.post('/register', register);

export default router;





