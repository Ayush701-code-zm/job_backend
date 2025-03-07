export const updateUserController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    next("provide fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.email = email;
  user.password = password;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    message: "User updated successfully",
    success: true,
    user,
    token,
  });
};
