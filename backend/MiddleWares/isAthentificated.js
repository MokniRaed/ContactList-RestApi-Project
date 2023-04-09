const jwt = require("jsonwebtoken");
const AuthSchema = require("../Models/authSchema");
const secretKey = "blackcats";

exports.isAthentificated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
     return res.status(401).send("Invalid token");
    } else {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.log("JWT Error:", err.message);
          res.status(401).send("Invalid token");
        } else {
          console.log("decoded code ",decoded);
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong with auth");
  }
};