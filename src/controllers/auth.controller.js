
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



export const login = async (req, res) => { //funcion para el login 

    const {email, password} = req.body; //obteniendo el body de la peticion

    try {
        

        const userFound = await User.findOne({email}); //Buscando el usuario por email en la BD

        //Validando si el usuario existe
        if(!userFound) {
            return res.status(400).json(
                    {message: 'Usuario no encontrado'}
                );
        }
        
        const passwordCorrect = await bcrypt.compare(password, userFound.password); //Comparando la contraseña 

        //Validando la contraseña
        if(!passwordCorrect) {
            return res.status(400).json({
                "mensaje": "Contraseña incorrecta"
            })
        }

        const token = await generateToken({ id: userFound._id});
        res.cookie('token', token);

        //enviando la respuesta de usuario registrado como json
        res.json({
            mensaje: 'Usuario logueado exitosamente',
            username: userFound.username, //Mostrando el username
            id: userFound._id,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}



export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0),
    })
    res.json({
        message: 'Sesión cerrada'
    });
}




