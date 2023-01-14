import express from "express";
const router = express.Router();

import {
  register,
  login,
  updateUser,
  getAllUsers,
  getUsersByProjId,
  deleteUsers,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(getUsersByProjId)
  .delete(authenticateUser, deleteUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser/:id").patch(authenticateUser, updateUser);

export default router;
