import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import databaseConnection from './config/database.js';
import userRoutes from './routes/user.route.js';
import tweetRoutes from './routes/tweet.route.js';
import { jwtTokenAuthentication } from './config/jwtAuthController.js';

dotenv.config();

// Connecting DATABASE
databaseConnection();

const app = express();

// middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cookieParser());

// APIs
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", jwtTokenAuthentication, tweetRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})