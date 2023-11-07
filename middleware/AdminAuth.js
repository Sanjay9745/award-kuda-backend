const jwt = require("jsonwebtoken");

const jwtSecret = "secret";

async function AdminAuth(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send("No token provided");
  }
  try {
    const decoded = await jwt.verify(token, jwtSecret);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
}
module.exports = AdminAuth;
