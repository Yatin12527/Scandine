import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, default: "https://github.com/shadcn.png" },
  lastName: { type: String, required: false },
  buissnessName: { type: String, required: false },
  role: { type: String, required: false },
  phone: { type: Number, required: false },
  about: { type: String, required: true },
});
const User = mongoose.model("users", userSchema);
export default User;
