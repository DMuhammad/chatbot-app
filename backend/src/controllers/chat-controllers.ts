import { NextFunction, Request, Response } from "express";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import User from "../models/User.js";
import { configureOpenAi } from "../config/openai-config.js";

const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctioned" });

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    const config = configureOpenAi();
    const openai = new OpenAIApi(config);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const sendUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not registered or Token malfunctioned");

    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).send("Permissions didn't match");

    return res.status(200).json({
      message: "OK",
      chats: user.chats,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export { generateChatCompletion, sendUserChats };
