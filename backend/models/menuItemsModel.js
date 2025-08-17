import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  value: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
});

const sectionSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  items: [itemSchema],
  image: { type: String },
});

const menuItemsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  logo: { type: String },
  // using map for efficient lookup
  sections: {
    type: Map,
    of: sectionSchema,
  },
  // ref looks up for models not collections
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const menuItems = mongoose.model("menuItems", menuItemsSchema);
export default menuItems;
