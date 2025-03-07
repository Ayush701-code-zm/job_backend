import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
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
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
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
