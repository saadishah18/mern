import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.Mongo).then( () => {
    console.log('monog connected');
}).catch( (err) => {
    console.error(err);
} );
const app = express();

app.listen(3000, () => {
    console.log('server is srunning on checking');
});