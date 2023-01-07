import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
  createProject,
  getAllProjects,
  updateProject,
  getProject,
  deleteProject,
  displayOutput,
} from "../controllers/projectsController.js";

import {
  createFolder,
  deleteFolder,
  deleteUploads,
  uploads,
} from "../controllers/uploadController.js";

router.route("/").post(authenticateUser, createProject).get(getAllProjects);
router
  .route("/:id")
  .patch(authenticateUser, updateProject)
  .get(getProject)
  .delete(authenticateUser, deleteProject);
router
  .route("/uploads/:id")
  .post(authenticateUser, uploads)
  .delete(authenticateUser, deleteUploads);
router
  .route("/folder/:id")
  .post(authenticateUser, createFolder)
  .delete(authenticateUser, deleteFolder);
router.route("/participants/:id").get(authenticateUser, displayOutput);
export default router;
