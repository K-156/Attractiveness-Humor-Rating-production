import Project from "../models/Project.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createProject = async (req, res) => {
  const { proj } = req.body;
  if (!proj) {
    throw new BadRequestError("Please provide all values");
  }

  const project = await Project.create(req.body);
  res.status(StatusCodes.CREATED).json({ project });
};

const getAllProjects = async (req, res) => {
  const projects = await Project.find({createdBy:req.user.userId})
};

const updateProject = async (req, res) => {
  res.send("update project");
};

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createProject, updateProject, showStats, getAllProjects };
