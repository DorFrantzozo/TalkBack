import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;
const User = new Schema({
  email: {
    type: String,
    require: [true, "Please enter Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    require: [true, "Please enter Password"],
    minlength: [8, "minimum password lenght is 8 characters"],
  },
  firstName: {
    type: String,
    require: [true, "Please enter First Name"],
    minlength: [3, "minimum First Name lenght is 3 characters"],
  },
  lastName: {
    type: String,
    require: [true, "Please enter Last Name"],
    minlength: [3, "minimum Last Name lenght is 3 characters"],
  },
});

User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

User.statics.signin = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("email doesnt exist");
};
export default mongoose.model("User", User);
