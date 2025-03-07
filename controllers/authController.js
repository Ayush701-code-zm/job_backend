import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate required fields
  //   if (!name) {
  //     next("name required");
  //   }
  //   if (!email) {
  //     next("email required");
  //   }
  //   if (!password) {
  //     next("password required");
  //   }

  //   // Check if user already exists
  //   const existingUser = await userModel.findOne({ email });
  //   if (existingUser) {
  //     return res.status(200).send({
  //       message: "User already exists",
  //       success: false,
  //     });
  //   }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new userModel({ name, email, password: hashedPassword });
  await user.save();

  const token = user.createJWT();

  res.status(201).send({
    message: "User registered successfully",
    success: true,
    user,
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("please provide email and password");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    next("invalid user");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    next("invalid password");
  }
  const token = user.createJWT();

  res.status(200).send({
    message: "User logged in successfully",
    success: true,
    user,
    token,
  });
};
