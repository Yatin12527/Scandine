import menuItems from "../models/menuItemsModel.js";
export const addMenu = async (req, res) => {
  try {
    const { title, logo, sections, style } = req.body;
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
      style,
    });

    res.json({ msg: "Menu added successfully", menuId: createdMenu.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Restaurant name is required" });
  }
};
// difference between id and _id , in case searching the db we use _id
// console.log(menu._id);  // ObjectId("507f1f77bcf86cd799439011")
// console.log(menu.id);   // "507f1f77bcf86cd799439011" (string)

export const getMenuById = async (req, res) => {
  try {
    const menuId = req.params.menuId; // from URL
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
    console.log(menuId);
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

export const getMenusById = async (req, res) => {
  try {
    const owner = req.data.id;
    const allMenus = await menuItems.find(
      { owner: owner },
      { _id: 1, title: 1, logo: 1, owner: 1, createdAt: 1, style: 1, views: 1 }
    );
    res.json(allMenus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch menus" });
  }
};

export const viewCount = async (req, res) => {
  try {
    const menuId = req.params.menuId;

    await menuItems.updateOne({ _id: menuId }, { $inc: { views: 1 } });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Failed to update views" });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const owner = req.data.id;
    const menu = await menuItems.findOneAndDelete({
      _id: menuId,
      owner: owner,
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found or not yours" });
    }

    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete menu" });
  }
};
