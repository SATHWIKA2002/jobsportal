import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  updateJobController,
  jobStatsController,
} from "../controllers/jobsController.js";
const router = express.Router();
//routes
//CREATE JOB || POST
router.post("/create-job", userAuth, createJobController);

//GET JOBS || GET
router.get("/get-job", userAuth, getAllJobsController);
//UPDATE JOBS || PUT || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);
//DELETE JOBS ||DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);
//JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, jobStatsController);
export default router;
