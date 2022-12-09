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
  const projects = await Project.find();
  res.status(StatusCodes.OK).json({
    projects,
    totalProjects: projects.length,
  });
};

const updateProject = async (req, res) => {
  const { id: projectId } = req.params;

  const { proj } = req.body;
  if (!proj) {
    throw new BadRequestError("Please provide all values");
  }

  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError(`No project with id ${projectId}`);
  }

  const updatedProject = await Project.findOneAndUpdate(
    { _id: projectId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedProject });
};

const getProject = async (req, res) => {
  res.send("show stats");
};

export { createProject, updateProject, getProject, getAllProjects };
