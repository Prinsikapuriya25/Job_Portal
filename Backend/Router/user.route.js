import express from "express";
import {
  login,
  register,
  updateProfile,
  logout,
  downloadResume,
} from "../Controllers/user.controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile);
router.route("/logout").get(logout);
router.route("/resume/download").get(
  isAuthenticated,
  downloadResume
);

export default router;
