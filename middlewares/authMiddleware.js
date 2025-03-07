import JWT from "jsonwebtoken";

const userAUTH = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    next("Invalid token");
  }
};

export default userAUTH;
