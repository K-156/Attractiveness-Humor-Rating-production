import express from "express";
const router = express.Router();

import {
  createProject,
  getAllProjects,
  updateProject,
  getProject,
} from "../controllers/projectsController.js";

import { uploadImage } from "../controllers/uploadController.js";

router.route("/").post(createProject).get(getAllProjects);
router.route("/:id").patch(updateProject).get(getProject);
router.route("/uploads").post(uploadImage);

export default router;
