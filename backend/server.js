import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import menuRoute from "./routes/menuItemsRoute.js";
import uploadRoute from "./routes/upload.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import validateToken from "./middlewares/authMiddleware.js";
import User from "./models/Authmodel.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_SERVICE,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(cookieParser());
const port = process.env.PORT;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_STRING);
  console.log("db connected");
}
// Parse JSON body
app.use(express.json());
app.use("/api/users", authRoute);
app.use("/api/items", menuRoute);
app.use("/api", uploadRoute);

// for navbar and telling frontend that im logged in
app.get("/api/users/me", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.data.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const response = {
      name: user.name ?? null,
      username: user.username ?? null,
      picture: user.picture ?? null,
      lastName: user.lastName ?? null,
      businessName: user.businessName ?? null,
      role: user.role ?? null,
      phone: user.phone ?? null,
      about: user.about ?? null,
    };

    res.json(response);
  } catch (e) {
    res.status(500).json({ message: "Failed to load profile" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
