import express from "express";
import { signup,login,logout,callback,googleLogin} from "../controllers/authController.js";
const router=express.Router();

router.post("/signup",signup );
router.post("/login",login);
router.post("/logout",logout);
router.get("/google",googleLogin);
router.get("/callback/google", callback);
//@private route - /api/users/addData
//adds the additional info to the user profile
router.post("/addData",validateToken,addData);
export default router;