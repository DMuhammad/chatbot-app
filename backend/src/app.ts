import express from "express";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

// middlewares
app.use(express.json());

// remove when in production
app.use(morgan("dev"));

app.use("/api/v1", routes);

export default app;
