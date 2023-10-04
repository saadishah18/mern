import User from "../models/user.model.js";
import bycryptjs from 'bcryptjs';
import { errorHandler } from "../Utils/error.js";
export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = bycryptjs.hashSync(password,10);
    const newUser = new User({ username, email,password: hashPassword});
    try{
        await newUser.save();
        res.status(201).json('User created uccessfully!');
    }catch(error){
        // res.status(500).json(error.message)
        //middle ware error respones 
        next(error);
        //custom error message response inside middle ware response;
        // next(errorHandler(500, 'Error in user creation'));
    }
   
};
