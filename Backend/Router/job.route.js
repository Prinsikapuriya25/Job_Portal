import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";

import {
  postjob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  deleteJob,
  updateJob,
} from "../Controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postjob);

router.route("/get").get(getAllJobs);

router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

router.route("/get/:id").get(isAuthenticated, getJobById);

router.route("/delete/:id").delete(
  isAuthenticated,
  deleteJob
);

router.route("/update/:id").put(
  isAuthenticated,
  updateJob
);

export default router;
