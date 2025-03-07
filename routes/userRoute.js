import express from "express";
import userAUTH from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

router.put("/update-user", userAUTH, updateUserController);

export default router;
