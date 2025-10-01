import express from "express";
import { signup,login,logout,callback,googleLogin,addData,me} from "../controllers/authController.js";
import validateToken from "../middlewares/authMiddleware.js";
const router=express.Router();

router.post("/signup",signup );
router.post("/login",login);
router.post("/logout",logout);
router.get("/google",googleLogin);
router.get("/callback/google", callback);
//@private route - /api/users/addData
//adds the additional info to the user profile
router.put("/addData",validateToken,addData);
// for navbar and telling frontend that im logged in
//@private route = api/users/me
router.get("/me", validateToken, me);
export default router;