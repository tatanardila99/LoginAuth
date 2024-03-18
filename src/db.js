
import mongoose from "mongoose";

export const  connectMongo = async() => {
    
    try {
        await mongoose.connect('mongodb://localhost/authdb');
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
    }
}


