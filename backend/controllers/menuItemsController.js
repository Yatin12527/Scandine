import menuItems from "../models/menuItemsModel.js";

export const addmenuItems=async(req,res)=>{
const title=req.body.title;
const description=req.body.description;
const price=req.body.price;
const image=req.body.thumbnail;

if (!title || !description || !price) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

await menuItems.create({
    title:title,
    description:description,
    price:price,
    thumbnail:image
});
res.json({
    msg:"Item added successfully"
});

}

export const getAllMenuItems = async (req, res) => {
    try {
      const allItems = await menuItems.find(); 
      res.json(allItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  };
  