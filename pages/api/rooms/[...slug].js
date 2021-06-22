// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initMiddleware from "../../../middleware/init-middleware";
import validateMiddleware from "../../../middleware/validate-middleware";
import Room from "../../../models/Rooms";
import connectDB from "../../../utils/mongodb";

import Booking from "../../../models/Bookings";

const { body, check, validationResult } = require("express-validator");

const validateUserBody = initMiddleware(
  validateMiddleware(
    [
      body("room_name", "Room Name").not().isEmpty(),
      body("room_participants", "Number of Occupants").not().isEmpty(),
    ],
    validationResult
  )
);
connectDB();
export default async function rooms(req, res) {
  if (req.method === "GET") {
    console.log("req", req.query.slug[0]);

    try {
      const roomCheckCount = await Booking.find({
        block: req.query.slug[0],
        type: req.query.slug[1],
      });

      if (roomCheckCount.length < parseInt(req.query.slug[2])) {
        return res.status(200).send({ msg: "Room available" });
      } else {
        return res.status(200).send({ msg: "Sorry room is full" });
      }
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
