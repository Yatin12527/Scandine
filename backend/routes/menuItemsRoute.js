import express from "express";
import {
  addMenu,
  getMenuById,
  editMenu,
  getMenusById,
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
// @access = private
router.get("/menuItems/:menuId", getMenuById);
// @desc = getting all menus by id
// @route = /api/items/menus
// @access = private
router.get("/menus", validateToken, getMenusById);

export default router;
