import menuItems from "../models/menuItemsModel.js";

export const addMenu = async (req, res) => {
  try {
    const { title, logo, sections } = req.body;
    const owner = req.data.id;
    if (!title || !sections) {
      return res
        .status(400)
        .json({ message: "Title and sections are required" });
    }

    const createdMenu = await menuItems.create({
      title,
      logo,
      sections,
      owner,
    });

    res.json({ msg: "Menu added successfully", menuId: createdMenu.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add menu" });
  }
};
// difference between id and _id , in case searching the db we use _id
// console.log(menu._id);  // ObjectId("507f1f77bcf86cd799439011")
// console.log(menu.id);   // "507f1f77bcf86cd799439011" (string)

export const getMenuById = async (req, res) => {
  try {
    const menuId = req.params.menuId; // from URL

    // fetch only if this menu belongs to the logged-in user
    const menu = await menuItems.findOne({ _id: menuId });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found or not yours" });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

export const editMenu = async (req, res) => {
  try {
    const { title, logo, sections, menuId } = req.body;
    const owner = req.data.id;
    if (!title || !sections) {
      return res
        .status(400)
        .json({ message: "Title and sections are required" });
    }
    console.log(menuId)
    await menuItems.findByIdAndUpdate(
      menuId,
      {
        title,
        logo,
        sections,
        owner,
      },
      { new: true }
    );

     res.json({ msg: "Menu added successfully", menuId: menuId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit menu" });
  }
};
