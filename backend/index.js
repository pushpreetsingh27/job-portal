import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDB from './utils/db.js';
import userRoutes from './routes/user.route.js'
import companyRoutes from "./routes/compamy.route.js"
import jobRoutes from "./routes/job.route.js"
import applicationRoutes from "./routes/application.route.js"

dotenv.config({})
const app = express();
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

//
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:5173', 'https://job-portal-1-ukke.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

const PORT =  process.env.PORT ||8000;

app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/company' , companyRoutes)
app.use('/api/v1/job' , jobRoutes)
app.use('/api/v1/application' , applicationRoutes)

app.listen(PORT, () => {
    connectToDB()
    console.log(`Server is running on port ${PORT}`);
    });
