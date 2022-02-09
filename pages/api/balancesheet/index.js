// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import BalanceSheet from "../../../models/BalanceSheet";
import authMiddleWare from "../../../middleware/auth";

// const { body, check, validationResult } = require("express-validator");

// const validateUserBody = initMiddleware(
//   validateMiddleware(
//     [
//       body("room_name", "Room Name").not().isEmpty(),
//       body("room_participants", "Number of Occupants").not().isEmpty(),
//     ],
//     validationResult
//   )
// );

export default async function ledgers(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    // await validateUserBody(req, res);
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }
    // const { room_name, room_participants } = req.body;
    // let room = new Room({
    //   room_name,
    //   room_participants,
    // });
    // ///////////send sms
    // //////Save data
    // let rowChecker = await Room.find({ student_id: student_id });
    // if (rowChecker.length > 0) {
    //   return res.status(200).send({
    //     msg: "Room already exist",
    //   });
    // } else {
    //   await room.save(async (err, todos) => {
    //     if (err) throw err;
    //     return res.status(200).send({ msg: "Room added" });
    //   });
    // }
  }

  if (req.method === "GET") {
    try {
      // const brand = await Administrator.find({}).select("-password");

      let mmy = await authMiddleWare(req, res);

      let balanceSheet = await BalanceSheet.find({});

      res.json(balanceSheet);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
}
