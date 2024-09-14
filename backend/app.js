import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import tweetRoutes from './routes/tweet.route.js';
import { jwtTokenAuthentication } from './config/jwtAuthController.js';
import cors from 'cors';


const app = express();

// middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cookieParser());
var corsOptions = {
    // origin: 'http://localhost:5173',
    origin: 'https://connectus-frontend-tqv5.onrender.com',
    credentials: true
};
app.use(cors(corsOptions));

// APIs
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", jwtTokenAuthentication, tweetRoutes);


export { app };