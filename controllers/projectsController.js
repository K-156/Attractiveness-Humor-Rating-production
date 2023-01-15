import fs from "fs";
import request from "request";
import csv from "csv-parser";
import Papa from "papaparse";
import iconv from "iconv-lite";
import sgMail from "@sendgrid/mail";

import Project from "../models/Project.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createProject = async (req, res) => {
  console.log(req.body);
  // const { projDetails, sections, data } = req.body.projDetails;
  // if (!projDetails || !sections || !data) {
  //   throw new BadRequestError("Please provide all values");
  // }
  // console.log(req.user)

  // req.body.projDetails.createdBy = req.user.userId;

  const project = await Project.create(req.body.projDetails);
  // console.log(project)
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
  const { userId } = req.user;
  const user = await User.findOne({ userId });
  const { id: projectId } = req.params;

  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError(`No project with id ${projectId}`);
  }

  // checkPermissions(user);

  console.log(req.body);

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
  const { id: projectId } = req.params;

  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError(`No project with id ${projectId}`);
  }
  res.status(StatusCodes.OK).json({ project });
};

const deleteProject = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ userId });

  const { id: projectId } = req.params;
  const project = await Project.findOne({ _id: projectId });

  if (!project) {
    throw new NotFoundError(`No project with id ${projectId}`);
  }

  if (project && project.isActive) {
    throw new BadRequestError("Cannot delete active project");
  }

  checkPermissions(user);

  await project.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Project deleted" });
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email, name, otp, projId } = req.body;
  const {projDetails} = await Project.findOne({ _id: projId });


  const msg = {
    to: email, // Change to your recipient
    from: "limstephanie156@gmail.com", // Change to your verified sender
    subject: `Participants of ${projDetails.title}`,
    html: 
    `Dear ${name}, </br></br> Thank you for signing up to participate in this survey. `
    + "Please click the following link:"
    + `<br><br>Your OTP number is ${otp}. You only have ${projDetails.duration} minutes to complete the survey. When the time is up, you would not be able to continue or return to the survey. <br><br> Thank you.`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(StatusCodes.OK).json({ msg: "Success! Email Sent!" });
};

const displayOutput = async (req, res) => {
  const readCSVPromise = (link) => {
    return new Promise((resolve, reject) => {
      const data = [];
      request
        .get(link)
        .on("error", (err) => {
          console.log(err);
          reject(err);
        })
        .pipe(fs.createWriteStream("file.csv"))
        .on("finish", () => {
          fs.createReadStream("file.csv", "utf-8")
            .pipe(iconv.decodeStream("utf8"))
            .pipe(csv())
            .on("data", (row) => {
              console.log(row);
              data.push(row);
            })
            .on("end", () => {
              console.log("CSV file successfully processed");
              resolve(data);
            });
        });
    });
  };

  const { id: projectId } = req.params;

  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError(`No project with id ${projectId}`);
  }

  const links = project.emailList.emailLink;
  console.log(links);

  Promise.all(links.map(readCSVPromise)).then((data) => {
    const results = data.reduce((acc, val) => acc.concat(val), []);
    console.log(results);
    res.status(StatusCodes.OK).json({ results });
  });
};

export {
  createProject,
  updateProject,
  getProject,
  getAllProjects,
  deleteProject,
  displayOutput,
  sendEmail,
};
