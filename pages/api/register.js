// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initMiddleware from "../../middleware/init-middleware";
import validateMiddleware from "../../middleware/validate-middleware";
import Register from "../../models/Register";
import connectDB from "../../utils/mongodb";

const { body, check, validationResult } = require("express-validator");

const validateUserBody = initMiddleware(
  validateMiddleware(
    [
      body("student_id", "Name is require").not().isEmpty(),
      body("name", "Name is required").not().isEmpty(),
      body("gender", "Genderis required").not().isEmpty(),
      body("level", "Level is required").not().isEmpty(),
      body("program", "Programis required").not().isEmpty(),
      body("phone", "Phone No is required").not().isEmpty(),
    ],
    validationResult
  )
);
connectDB();
export default async function reg(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    await validateUserBody(req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { student_id, name, gender, level, program, phone } = req.body;

    const randomUnique = (range, count) => {
      let nums = new Set();
      while (nums.size < count) {
        nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
      }
      return [...nums].join("");
    };

    let tokenNum = randomUnique(10, 8);

    let reg = new Register({
      student_id: student_id,
      name: name,
      gender: gender,
      level: level,
      program: program,
      phone: phone,
      token: tokenNum,
    });

    ///////////send sms

    //////Save data

    let rowChecker = await Register.find({ student_id: student_id });

    if (rowChecker.length > 0) {
      return res.status(200).send({
        msg: "You have already registered",
      });
    } else {
      await reg.save(async (err, todos) => {
        if (err) throw err;

        return res
          .status(200)
          .send({ msg: "You have successfully applied for a room" });
      });
    }
  }

  if (req.method === "GET") {
    try {
      // const brand = await Administrator.find({}).select("-password");

      return res.status(200).json({ name: "nana" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error");
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
