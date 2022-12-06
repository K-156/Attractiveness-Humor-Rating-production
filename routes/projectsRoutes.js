import express from "express";
const router = express.Router();

import {
  createProject,
  getAllProjects,
  updateProject,
  showStats,
} from "../controllers/projectsController.js";

router.route("/").post(createProject).get(getAllProjects);
router.route("/stats").get(showStats);
router.route("/:id").patch(updateProject);

export default router;
