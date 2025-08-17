import express from "express";
import {addMenu, getMenuById } from "../controllers/menuItemsController.js";
import validateToken from "../middlewares/authMiddleware.js";
const router=express.Router();

// @desc = adding a new item
// @route = /api/items/addmenuItems
// @access = private
router.post("/addmenuItems",validateToken,addMenu);

// @desc = getting all items by id
// @route = /api/items/menuItems/:menuId
// @access = private
router.get("/menuItems/:menuId",validateToken,getMenuById);
export default router;