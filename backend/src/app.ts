import express from "express";
import "dotenv/config";

const app = express();

// middlewares
app.use(express.json());

export default app;
