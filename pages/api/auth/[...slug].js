// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import authMiddleWare from "../../../middleware/auth";

const User = require("../../../models/User");

const { body, check, validationResult } = require("express-validator");
var multer = require("multer");
// const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    // cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    cb(null, Date.now() + "." + ext); //Appending extension
  },
});

export default async function authslugs(req, res) {
  const { slug } = req.query;

  let url = slug.join("/");
  console.log("slugs", slug.join(","), "url", url);

  let mmy = await authMiddleWare(req, res);

  console.log("verifyAdmin", mmy);

  if (req.method === "GET" && url === "admin") {
    try {
      const user = await User.findById(req.admin.id).select("-password");
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100MB",
    },
  },
};
