import User from "../models/Authmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

export const signup = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await User.findOne({ username: username });
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!username || !name || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  if (existingUser) {
    return res.status(401).json({
      message: "user already exists",
    });
  }

  const user = await User.create({
    name: name,
    username: username,
    password: hashedPassword,
  });

  let token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
    },
    process.env.JWTSECRET,
    { expiresIn: "30d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    message: "signed up successfully",
    redirect: process.env.FRONTEND_SERVICE,
  });
};

export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({
    username: username,
  });
  const hashedPassword = existingUser.password;
  const comparedPassword = await bcrypt.compare(password, hashedPassword);

  if (existingUser && comparedPassword) {
    let token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        username: existingUser.username,
      },
      process.env.JWTSECRET,
      { expiresIn: "30d" }
    );
    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
  }

  res.status(401).json({
    msg: "please signup",
  });
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
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
  const existingUser = await User.findOne({ username: email });
  //incase someone's token expired and theyare trying to login again with google give them fresh token
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        username: existingUser.username,
        picture: existingUser.picture,
      },
      process.env.JWTSECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(process.env.FRONTEND_SERVICE);
  }

  await User.create({
    name: name,
    username: email,
    password: "GOOGLE",
    picture: picture,
  });

  let user = await User.findOne({ username: email });
  let token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
      picture: user.picture,
    },
    process.env.JWTSECRET,
    { expiresIn: "30d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.redirect("http://localhost:3000");
};
