// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initMiddleware from "../../../middleware/init-middleware";
import validateMiddleware from "../../../middleware/validate-middleware";
import LedgerCodes from "../../../models/LedgerCodes";
import Ledgers from "../../../models/Ledgers";

import authMiddleWare from "../../../middleware/auth";
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

export default async function ledgers(req, res) {
  if (req.method === "POST") {
    let mmy = await authMiddleWare(req, res);

    let row = await LedgerCodes.find({
      $or: [
        {
          code: new RegExp("^" + req.body.codes + "$", "i"),
        },
        { description: new RegExp("^" + req.body.description + "$", "i") },
      ],
    });

    if (row.length > 0) {
      res.status(200).json({ errors: "Code Or Description already exist" });
    } else {
      var code = req.body.codes;
      var description = req.body.description;
      var p_l_b_s = req.body.pl_bs;
      var income_balance = req.body.is_bs_radio;

      let code_description = req.body.codes + " - " + req.body.description;
      let type1 = req.body.type;

      let ledgerscodesMain = new LedgerCodes({
        code: code,
        description: description,
        income_balance: income_balance,
        p_l_b_s: p_l_b_s,
        type: type1,
      });

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!

      var year = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }

      let today_now = dd + "-" + mm + "-" + year;

      let code_descriptionArray = [];
      let narrationArray = ["Opening Balance"];

      let myee = today_now.split("-");
      let date_sorting = myee[2] + "-" + myee[1] + "-" + myee[0];
      let date_final = myee[0] + "-" + myee[1] + "-" + myee[2];

      code_descriptionArray.push(code_description);
      let code_descrtipionArrayString = JSON.stringify([code_description]);
      let debitArrayString = JSON.stringify([parseFloat(0)]);
      let creditArrayString = JSON.stringify([parseFloat(0)]);
      let narrationArrayString = JSON.stringify([
        [narrationArray] + "-" + code_description,
      ]);
      let type = JSON.stringify([req.body.type]);

      let ledgerscodesSave = new Ledgers({
        bank_cash: "none",
        category: null,
        cheque_num: null,
        code_description: code_descrtipionArrayString,
        credit: creditArrayString,
        date_added: today_now,
        date_for_sorting: date_sorting,
        date_transaction: date_final,
        debit: debitArrayString,
        narration: narrationArrayString,
        receipt_payment: "none",
        received_from_or_paid_to: null,
        total: null,
        type: type,
        type_of_bank: null,
        voucher_num: null,
      });

      await ledgerscodesSave.save();

      await ledgerscodesMain.save(async (err, todos) => {
        if (err) throw err;
        console.log("leder saved", ledgerscodesMain._id);
        let fetched = await LedgerCodes.find({ _id: ledgerscodesMain._id });

        res.status(200).send({ savedData: fetched, msg: "Ledger Saved" });
      });
      //  res
    }
  }

  if (req.method === "GET") {
    // try {
    //   let mmy = await authMiddleWare(req, res);
    //   // const brand = await Administrator.find({}).select("-password");
    //   const codes = await LedgerCodes.find({});
    //   res.json(codes);
    // } catch (error) {
    //   return res.status(500).send("Server error");
    // }
  }
}

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "100MB",
//     },
//   },
// };
