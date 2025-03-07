import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs"; // Changed to bcryptjs
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "localhost",
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcryptjs.genSalt(10); // Changed to bcryptjs
  this.password = await bcryptjs.hash(this.password, salt); // Changed to bcryptjs
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password); // Changed to bcryptjs
};

// Method to create JWT
userSchema.methods.createJWT = function () {
  try {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

export default mongoose.model("User", userSchema);
