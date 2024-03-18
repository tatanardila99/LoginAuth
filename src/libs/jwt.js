import jwt from 'jsonwebtoken';
import { SECRET_KEY_TOKEN } from '../config.js';


export function generateToken( payload) {

    return new Promise((resolve, reject) => {
    
    //Usando la libreria jwt para crear el token
    jwt.sign( 
        payload, //informacion del usuario como el saverUser.id
        SECRET_KEY_TOKEN, {
        expiresIn: 86400 //24 horas
    },
    (err, token) => {
        if(err) reject(err);
        resolve(token);
    })
})}









