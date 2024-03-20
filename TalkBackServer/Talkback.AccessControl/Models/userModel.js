import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const User = new Schema({
  username: {
    type: String,
    require: [true, "Please enter Username"],
    minlength: [3, "minimum username lenght is 3 characters"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please enter Password"],
    minlength: [8, "minimum password lenght is 8 characters"],
  },
});

User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

User.statics.signin = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("Username doesnt exist");
};
export default mongoose.model("User", User);
