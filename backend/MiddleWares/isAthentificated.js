const jwt = require("jsonwebtoken");
const AuthSchema = require("../Models/authSchema");
const secretKey = "blackcats";

exports.isAthentificated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.status(401).send("Invalid token");
    } else {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.log("JWT Error:", err.message);
          res.status(401).send("Invalid token");
        } else {
          req.user = decoded;
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong with auth");
  }
};