import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
  // if need update on page 107
  const user = await User.create(req.body);
  const token = user.createJWT();
  // const userAlreadyExists = await User.findOne({ email });
  // if (userAlreadyExists) {
  //   throw new BadRequestError('Email already in use');
  // }
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  res.send("user log in");
};

export { register, login };
