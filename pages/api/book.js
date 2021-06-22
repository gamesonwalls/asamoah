// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initMiddleware from "../../middleware/init-middleware";
import validateMiddleware from "../../middleware/validate-middleware";
import Book from "../../models/Bookings";
import connectDB from "../../utils/mongodb";

var multer = require("multer");

const { body, check, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/paymentslips");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    // cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    cb(null, Date.now() + "." + ext); //Appending extension
  },
});

const validateUserBody = initMiddleware(
  validateMiddleware(
    [
      body("student_id", "Name is require").not().isEmpty(),
      body("name", "Name is required").not().isEmpty(),
      body("gender", "Genderis required").not().isEmpty(),
      body("level", "Level is required").not().isEmpty(),
      body("program", "Programis required").not().isEmpty(),
      body("phone", "Phone No is required").not().isEmpty(),
      body("block", "Block is required").not().isEmpty(),
      body("type", "Room Type is required").not().isEmpty(),
    ],
    validationResult
  )
);

// const validatePaymentSlip = initMiddleware(

//    multer({
//     storage: storage,
//   }).single("slipImage")
// );
connectDB();
export default async function user(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    await validateUserBody(req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      student_id,
      name,
      gender,
      level,
      program,
      phone,
      block,
      type,
      message,
      occupants,
    } = req.body;

    let booking = new Book({
      student_id: student_id,
      name: name,
      gender: gender,
      level: level,
      program: program,
      phone: phone,
      block: block,
      type: type,
      message: message,
    });

    ///////////send sms

    //////Save data

    let rowChecker = await Book.find({ student_id: student_id });

    if (rowChecker.length > 0) {
      return res.status(200).send({
        msg: "You have already booked",
      });
    } else {
      const roomCheckCount = await Booking.find({
        block: block,
        type: type,
      });

      if (roomCheckCount.length < parseInt(occupants)) {
        //return res.status(200).send({ msg: "Room available" });

        await booking.save(async (err, todos) => {
          if (err) throw err;

          return res
            .status(200)
            .send({ msg: "You have successfully booked a room" });
        });
      } else {
        return res.status(200).send({ msg: "Sorry room is full" });
      }
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

  if (req.method === "PUT") {
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100MB",
    },
  },
};
