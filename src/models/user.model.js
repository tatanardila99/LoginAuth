
import mongoose from 'mongoose';

//Definiendo la estructura de los usuarios y los tipos de datos que vamos a guardar
const userSchema = new mongoose.Schema ({

    username : {
        type: String,
        required: true,
        trim: true
    },


    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    }
}, 
    {timestamps: true} // para guardar y mostrar la fecha de creacion y actualizacion
);


export default mongoose.model('User', userSchema); //permite interactuar con la db y crear colecciones de usuarios





