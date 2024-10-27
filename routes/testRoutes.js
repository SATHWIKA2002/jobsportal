import express from "express";
import { testPostController } from "../controllers/testController.js";
import userModel from "../models/userModel.js";
import userAuth from "../middlewares/authMiddleware.js";
//router  object
const router = express.Router();
//rutes
router.post("/test-post",testPostController);

//export
export default router;
