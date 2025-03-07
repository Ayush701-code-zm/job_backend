import express from "express";
import userAUTH from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobsController,
  getJobsController,
  updateJobsController,
} from "../controllers/jobsController.js";

const router = express.Router();

router.post("/create-job", userAUTH, createJobController);
router.get("/get-job", userAUTH, getJobsController);
router.patch("/create-job/:id", userAUTH, updateJobsController);
router.delete("/delete-job/:id", userAUTH, deleteJobsController);

export default router;
