import User from "../models/Authmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export const signup = async (req, res) => {
  const { name, username, password } = req.body;

  if (!username || !name || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(401).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    username,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
    },
    process.env.JWTSECRET,
    { expiresIn: "30d" }
  );

  res.cookie("token", token, cookieOptions);
  return res.status(200).json({
    message: "Signed up successfully",
    redirect: process.env.FRONTEND_SERVICE,
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const comparedPassword = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!comparedPassword) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: existingUser.id,
      name: existingUser.name,
      username: existingUser.username,
    },
    process.env.JWTSECRET,
    { expiresIn: "30d" }
  );

  res.cookie("token", token, cookieOptions);
  return res.status(200).json({
    message: "Logged in successfully",
    redirect: process.env.FRONTEND_SERVICE,
  });
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error during logout",
    });
  }
};

export const googleLogin = (_req, res) => {
  const redirectUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile`;

  res.redirect(redirectUrl);
};

export const callback = async (req, res) => {
  try {
    const code = req.query.code;
    const tokenRes = await axios.post(process.env.TOKEN_URI, {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const access_token = tokenRes.data.access_token;

    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const { name, email, picture } = userRes.data;
    let user = await User.findOne({ username: email });

    if (!user) {
      user = await User.create({
        name,
        username: email,
        password: "GOOGLE",
        picture,
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        picture: user.picture,
      },
      process.env.JWTSECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, cookieOptions);
    return res.redirect(process.env.FRONTEND_SERVICE);
  } catch (error) {
    console.error(
      "Error during Google OAuth callback:",
      error.response?.data || error.message
    );
    return res.redirect(
      `${process.env.FRONTEND_SERVICE}/auth/login?error=google_oauth_failed`
    );
  }
};

export const addData = async (req, res) => {
  try {
    const ownerId = req.data.id;
    const { lastName, businessName, role, phone, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      ownerId,
      { lastName, businessName, role, phone, about },
      { new: true }
      // ususal behaviour of mongo is to return previous data not the updated doing new:true gives updated data
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};
