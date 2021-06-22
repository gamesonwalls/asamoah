// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initMiddleware from "../../../middleware/init-middleware";
import validateMiddleware from "../../../middleware/validate-middleware";
import Room from "../../../models/Rooms";
import connectDB from "../../../utils/mongodb";

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
  if (req.method === "POST") {
    // Process a POST request
    await validateUserBody(req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { room_name, room_participants } = req.body;

    let room = new Room({
      room_name,
      room_participants,
    });

    ///////////send sms

    //////Save data

    let rowChecker = await Room.find({ student_id: student_id });

    if (rowChecker.length > 0) {
      return res.status(200).send({
        msg: "Room already exist",
      });
    } else {
      await room.save(async (err, todos) => {
        if (err) throw err;

        return res.status(200).send({ msg: "Room added" });
      });
    }
  }

  if (req.method === "GET") {
    try {
      // const brand = await Administrator.find({}).select("-password");
      const patient = await Room.findById({});
      res.json(patient);
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
