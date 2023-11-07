const jwt = require("jsonwebtoken");

const jwtSecret = "secret";

async function UserAuth(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send("No token provided");
  }
  try {
    const decoded = await jwt.verify(token, jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
}
module.exports = UserAuth;
