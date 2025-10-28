import express from "express";
import {
  addMenu,
  getMenuById,
  editMenu,
  getMenusById,
  viewCount,
  deleteMenu,
} from "../controllers/menuItemsController.js";
import validateToken from "../middlewares/authMiddleware.js";
const router = express.Router();

// @desc = adding a new item
// @route = /api/items/addmenuItems
// @access = private
router.post("/addmenuItems", validateToken, addMenu);
// @desc = editing an existing item
// @route = /api/items/editmenuItems
// @access = private
router.put("/editmenuItems", validateToken, editMenu);
// @desc = getting all items by id
// @route = /api/items/menuItems/:menuId
// @access = public
router.get("/menuItems/:menuId", getMenuById);
// @desc = getting all menus by id
// @route = /api/items/menus
// @access = private
router.get("/menus", validateToken, getMenusById);
// @desc = adding a new item
// @route = /api/items/view/:menuId
// @access = public
router.post("/view/:menuId", viewCount);
// @desc = deleting an  item
// @route = /api/items/menus/:menuId
// @access = private
router.delete("/menus/:menuId", validateToken, deleteMenu);

export default router;
