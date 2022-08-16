import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
const app = express();
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();


// importing routes
import jobsRoute from './routes/jobs.routes.js';
import videoRoute from './routes/video.routes.js';
import userRoute from './routes/user.routes.js';
import booksRoute from './routes/books.routes.js';
import blogsRoute from './routes/blogs.routes.js';

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to womenCouncelling Db!");
  })
  .catch((e) => {
    console.log(e)
    console.log("Connection failed!");
  });

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false, parameterLimit:100000}));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,  OPTIONS"
  );
  next();
});


// jobs routes
app.use('/api/jobs', jobsRoute)
// videos routes
app.use('/api/videos', videoRoute)
// users routes
app.use('/api/users', userRoute)
// books routes
app.use('/api/books', booksRoute)
// blogs routes
app.use('/api/blogs', blogsRoute)


export default app;