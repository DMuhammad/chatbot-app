import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/chats", chatRoutes);

export default routes;
