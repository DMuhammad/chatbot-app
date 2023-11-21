import axios from "axios";

const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to signup");
  }

  const data = await res.data;
  return data;
};

const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }

  const data = await res.data;
  return data;
};

const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }

  const data = await res.data;
  return data;
};

const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");

  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }

  const data = await res.data;
  return data;
};

const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chats/new", { message });

  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }

  const data = await res.data;
  return data;
};

const getUserChats = async () => {
  const res = await axios.get("/chats/all-chats");

  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }

  const data = await res.data;
  return data;
};

const deleteUserChats = async () => {
  const res = await axios.delete("/chats/delete");

  if (res.status !== 200) {
    throw new Error("Unable to delete chat");
  }

  const data = await res.data;
  return data;
};

export {
  signupUser,
  loginUser,
  logoutUser,
  checkAuthStatus,
  sendChatRequest,
  getUserChats,
  deleteUserChats,
};
