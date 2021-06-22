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

// const validatePaymentSlip = initMiddleware(

//    multer({
//     storage: storage,
//   }).single("slipImage")
// );
connectDB();
export default async function user(req, res) {
  if (req.method === "PUT") {
    try {
      // const brand = await Administrator.find({}).select("-password");
      let upload = multer({
        storage: storage,
      }).single("slipImage");

      upload(req, res, async function (err) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          if (!req.file) {
            return res.status(200).send({ msg: "Image is required" });
          } else {
            console.log("req", req);

            const filter = {
              student_id: req.body.student_id,
            };
            const update = {
              image: req.file.filename,
            };
            let doc = await Book.findOneAndUpdate(filter, update, {
              new: true,
            });

            res.status(200).send({
              msg: "You have successfully uploaded your payment slip",
              dataUpdated: doc,
            });
          }
        }
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error");
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
