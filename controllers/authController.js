import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  // if need update on page 107
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  res.send("user log in");
};

export { register, login };
