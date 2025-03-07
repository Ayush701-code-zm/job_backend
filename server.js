import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

import connectDB from "./config/db.js";
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoute.js";
import jobsRoutes from "./routes/jobsRoute.js";

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json()); // Body parser middleware
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoutes);

app.use("/api/v1/jobs", jobsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("Hello, your backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
