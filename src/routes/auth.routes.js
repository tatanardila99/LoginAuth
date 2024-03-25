import { Router} from 'express';
import { login, register, logout } from '../controllers/auth.controller.js';

const router = Router(); //Instancia para poder realizar peticiones


router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

export default router;





