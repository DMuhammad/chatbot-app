import express from "express";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove when in production
app.use(morgan("dev"));

app.use("/api/v1", routes);

export default app;
