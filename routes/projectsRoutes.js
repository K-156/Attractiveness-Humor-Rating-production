import express from "express";
const router = express.Router();

import {
  createProject,
  getAllProjects,
  updateProject,
  getProject,
  deleteProject,
} from "../controllers/projectsController.js";

import { deleteUploads, uploads } from "../controllers/uploadController.js";

router.route("/").post(createProject).get(getAllProjects);
router.route("/:id").patch(updateProject).get(getProject).delete(deleteProject);
router.route("/uploads/:id").post(uploads).delete(deleteUploads)


export default router;
