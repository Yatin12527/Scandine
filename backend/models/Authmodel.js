import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, default: "https://github.com/shadcn.png" },
});
const User = mongoose.model("users", userSchema);
export default User;
