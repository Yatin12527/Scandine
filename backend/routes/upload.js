import express from "express";
import multer from "multer";
import upload from "../controllers/coudinaryController.js"

const router = express.Router();
const multerUpload = multer({ dest: "uploads/" }); // temp storage
// upload.single helps you get the exact location of the file u stored locally and in next step we just push it onto cloudanry to save
router.post("/upload-image", multerUpload.single("file"), upload)

export default router;
