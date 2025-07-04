import express from "express";
import {addmenuItems, getAllMenuItems } from "../controllers/menuItemsController.js";
const router=express.Router();

router.post("/addmenuItems",addmenuItems);
router.get("/addmenuItems",getAllMenuItems);
export default router;