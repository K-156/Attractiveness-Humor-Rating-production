import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import 'express-async-errors'

// set up mutler for storing uploaded files
// import multer from 'mutler'

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// let upload = multer({ storage: storage });

// db and authenticate user
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import projectsRouter from './routes/projectsRoutes.js'

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {}
};

start();
