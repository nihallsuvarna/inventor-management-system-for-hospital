const jwt = require("jsonwebtoken");

export default function (req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
      error: err
    });
  }
}
