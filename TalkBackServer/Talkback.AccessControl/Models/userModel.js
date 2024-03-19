import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const User = new Schema({
  username: {
    type: String,
    require: [true, "Please enter Username"],
    minlenght: 3,
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please enter Password"],
    minlenght: [8, "minimum password lenght is 8 characters"],
  },
});

User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
export default mongoose.model("User", User);
