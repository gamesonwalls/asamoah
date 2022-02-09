const jwt = require("jsonwebtoken");

import connectDB from "../utils/mongodb";

connectDB();
module.exports = function (req, res) {
  return new Promise((resolve, reject) => {
    //Get token from header

    const token = req.headers.token;

    // console.log("req", req);
    //check if no token
    if (!token) {
      //401 not authorized
      return res.status(401).json({ msg: "No token, authorization denied" });
    } else {
      try {
        const decode = jwt.verify(token, process.env.jwtSecret);

        console.log("decode", decode);

        req.admin = decode.user;
        resolve(req.admin);
      } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
      }
    }
  });
};
