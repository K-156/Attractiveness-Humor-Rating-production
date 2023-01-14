import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

const register = async (req, res) => {
  const { email } = req.body;
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("User does not exist");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  // user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  // const { id: userId } = req.params;
  console.log(req.body);

  const { userResponse, role } = req.body;

  const user = await User.findOne({ _id: req.user.userId }).select("+password");

  user.sex = req.body.formData?.sex;
  user.age = req.body.formData?.age;
  user.ethnicity = req.body.formData?.ethnicity;
  user.userResponse = userResponse;
  user.role = role;

  await user.save();
  const token = user.createJWT();
  // user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({
    users,
    totalUsers: users.length,
  });
};

const getUsersByProjId = async (req, res) => {
  const { id: projectId } = req.params;

  const users = await User.find({ projId: projectId });
  if (!users) {
    throw new NotFoundError(`No users with id ${projectId}`);
  }
  res.status(StatusCodes.OK).json({ users });
};

const deleteUsers = async (req, res) => {

  const { id: userId } = req.params;
  const users = await User.findOne({ _id: userId });

  if (!users) {
    throw new NotFoundError(`No users with id ${users}`);
  }

  await users.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! User deleted" });
};

export {
  register,
  login,
  updateUser,
  getAllUsers,
  getUsersByProjId,
  deleteUsers,
};
