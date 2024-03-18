
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../libs/jwt.js';


export const register = async (req, res) => { //funcion para el registro

    const {username,email, password} = req.body; //obteniendo el body de la peticion

    try {
        const passwordHash = await bcrypt.hash(password, 10); //Encriptando la contraseña    
        const userNew = new User({ //Creando un nuevo usuario del mdoelo importado
            username, 
            email, 
            password: passwordHash // Guardando la contraseña encriptada
        });
        
        //console.log(userNew); //Mostrando el usuario
        const userSaved = await userNew.save(); //Guardando el usuario en la base de dato
        const token = await generateToken({ id: userSaved._id});
        res.cookie('token', token);
        
        //enviando la respuesta de usuario registrado como json
        res.json({
            mensaje: 'Usuario registrado exitosamente',
            username: userSaved.username, //Mostrando el username
            id: userSaved._id,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

export const login = (req, res) => { //Funcion para el login

    const {email, password} = req.body;

    console.log(email, password);
    res.send('login...');
    
}

