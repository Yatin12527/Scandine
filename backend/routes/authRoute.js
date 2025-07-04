import express from "express";
import { signup,login,callback,googleLogin} from "../controllers/authController.js";
const router=express.Router();

router.post("/signup",signup );
router.post("/login",login);
router.get("/google",googleLogin);
router.get("/callback/google", callback);
export default router;