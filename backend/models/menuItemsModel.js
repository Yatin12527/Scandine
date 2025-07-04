import mongoose from "mongoose";

const menuItemsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  thumbnail:{type:String,required:false}
});
const menuItems = mongoose.model("menuItems", menuItemsSchema);
export default menuItems;