import User from "../models/user.model.js";
import bycryptjs from 'bcryptjs';
import { errorHandler } from "../Utils/error.js";
import jwt from 'jsonwebtoken';


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


export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User Not found'));
        const validPassword = bycryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Credentials do not matched'));
        let id = validUser._id;
       
        const token = jwt.sign({id }, process.env.JWT_SECRET);
        // hid epassword from response;
        const {password: pass, ...rest} = validUser._doc;
        res.cookie('access_token' , token, {
            httpOnly: true, 
        }).status(200).json(rest);
    }catch(error){
        next(error);
    }
}
