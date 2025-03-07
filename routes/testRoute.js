import express from "express";
import testController from "../controllers/testController.js";
import userAUTH from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/test", userAUTH, testController);

export default router;
