const { AuthService } = require("../services");

async function auth(req, res, next) {
  try {
    const { access_token } = req.cookies;
    if (!access_token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decode = await AuthService.getUserSession(access_token);
    if (!decode) {
      return res.status(401).json({ message: "Authentication required" });
    }
    req.userId = decode.user_id;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
      error: err
    });
  }
}

module.exports = auth;
