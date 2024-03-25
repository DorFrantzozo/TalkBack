import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Token = new Schema({
  token: {
    type: String,
    require: [true],
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Token", Token);
