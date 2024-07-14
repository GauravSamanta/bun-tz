import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => console.log(message.trim()),
    },
  }
);

app.use(morganMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({
  path: "./.env",
});

//routes
import userRoutes from "./routes/user.routes.js";

//api routes

app.use("/api/users/", userRoutes);

export { app };
