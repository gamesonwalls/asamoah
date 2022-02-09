// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initMiddleware from "../../../middleware/init-middleware";
import validateMiddleware from "../../../middleware/validate-middleware";

const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import connectDB from "../../../utils/mongodb";

const { body, check, validationResult } = require("express-validator");

const validateUserBody = initMiddleware(
  validateMiddleware(
    [
      body("email", "Please include a valid email").isEmail(),
      body("password", "Password is required").exists(),
    ],
    validationResult
  )
);
connectDB();
export default async function rooms(req, res) {
  console.log("req", req.body);
  if (req.method === "POST") {
    // Process a POST request
    await validateUserBody(req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      console.log("user", user);
      if (!user) {
        return res.status(400).json({ errors: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: "Invalid Credentials" });
      }

      // Payload for user using jsonwebtoken
      const payload = {
        user: {
          //user.id is the id in mongoDb
          id: user._id,
        },
      };
      //
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            return res.status(200).json({ error: "Token Expired" });
          }
          //Sending token
          return res.status(200).json({ token });
        }
      );

      // res.send("User registered")
    } catch (error) {
      return res.status(400).json({ errors: "Request Failed" });
      //console.log(error.message)
    }
  }

  if (req.method === "GET") {
    try {
      // const brand = await User.find({}).select("-password");
      const admins = await User.findById({});
      res.json(admins);
      return res.status(200).json(admins);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error");
    }
  }
}

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "100MB",
//     },
//   },
// };
