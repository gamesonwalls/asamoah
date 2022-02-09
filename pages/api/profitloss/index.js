// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import ProfitLoss from "../../../models/ProfitLoss";
import authMiddleWare from "../../../middleware/auth";

export default async function profitloss(req, res) {
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
      console.log("get profit lostt");
      let auth = await authMiddleWare(req, res);
      console.log("auth", auth);
      // const brand = await Administrator.find({}).select("-password");
      let profitLost = await ProfitLoss.find({});
      res.json(profitLost);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
}
