import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  console.log("=== AUTH MIDDLEWARE DEBUG ===");
  console.log("Request URL:", req.url);
  console.log("Request cookies:", req.cookies);
  console.log("Auth header:", req.headers.authorization);
  console.log("All headers:", JSON.stringify(req.headers, null, 2));

  let token;

  const authHeader = req.header("Authorization") || req.header("authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    console.log("✅ Found token in Bearer header");
  }

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log("✅ Found token in cookies");
  }

  if (!token) {
    console.log("❌ NO TOKEN FOUND ANYWHERE");
    console.log("Available cookies:", Object.keys(req.cookies || {}));
    return res.status(401).json({ message: "Authorization token not found" });
  }

  console.log("🔍 Token found, attempting verification...");

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    console.log("✅ Token verified successfully");
    req.data = decoded;
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default validateToken;
