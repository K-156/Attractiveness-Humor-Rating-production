import express from "express";
const router = express.Router();

import {
  createProject,
  getAllProjects,
  updateProject,
  getProject,
} from "../controllers/projectsController.js";

router.route("/").post(createProject).get(getAllProjects);
router.route("/:id").patch(updateProject).get(getProject);

export default router;
