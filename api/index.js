import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'


dotenv.config();

mongoose.connect(process.env.Mongo).then( () => {
    console.log('monog connected');
}).catch( (err) => {
    console.error(err);
} );
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('server is srunning on checking');
});


app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

// middleware for error message
app.use((err, req, resp, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return resp.status(status).json({
        success: false,
        status,
        message
    })
})