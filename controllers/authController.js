import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError,UnAuthenticatedError } from "../errors/index.js";

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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email })
  //.select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login };
