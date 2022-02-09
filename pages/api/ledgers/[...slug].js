// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import authMiddleWare from "../../../middleware/auth";

const User = require("../../../models/User");

const LedgerComposition = require("../../../models/LedgerComposition");
const Ledgers = require("../../../models/Ledgers");
const LedgerCodes = require("../../../models/LedgerCodes");

const { body, check, validationResult } = require("express-validator");

// const jwt = require("jsonwebtoken");

export default async function authslugs(req, res) {
  const { slug } = req.query;

  let url = slug.join("/");
  console.log("slugs", slug.join(","), "url", url);

  let mmy = await authMiddleWare(req, res);

  console.log("verifyAdmin", mmy);

  if (req.method === "GET" && slug[0] === "composition") {
    try {
      let serachValue = slug[1];

      let ledgers = await LedgerComposition.find({
        income_expense_type: new RegExp("^" + serachValue + "$", "i"),
      });
      console.log("legder composition", ledgers);
      res.json(ledgers);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
  if (req.method === "GET" && slug[0] === "openingbalance") {
    try {
      let mmy = await authMiddleWare(req, res);
      let ledgers = await Ledgers.find({ narration: /Opening Balance/ });

      res.status(200).send(ledgers);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  if (req.method === "GET" && slug[0] === "codes") {
    try {
      let mmy = await authMiddleWare(req, res);
      // const brand = await Administrator.find({}).select("-password");
      const codes = await LedgerCodes.find({});
      res.json(codes);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "GET" && slug[0] === "journals") {
    try {
      let mmy = await authMiddleWare(req, res);
      // const brand = await Administrator.find({}).select("-password");
      const codes = await Ledgers.find({ receipt_payment: /Journal/ }).sort({
        _id: -1,
      });
      res.json(codes);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "POST" && slug[0] === "savejournal") {
    try {
      let mmy = await authMiddleWare(req, res);

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
      //req.body.groupList.pop();
      //// console.log("today_now",today_now)

      //var filtered2 =  req.body.groupList.filter(value => Object.keys(value).length !== 0);
      // filtered2.pop();
      var filtered = req.body.groupList;

      let accountArray = [];
      let narrationArray = [];
      let amount_brArrayCredit = [];
      let amount_brArrayDebit = [];
      let type_brArray = [];

      let myee = req.body.date_br.split("-");
      let date_final = myee[2] + "-" + myee[1] + "-" + myee[0];
      let date_sorting = myee[0] + "-" + myee[1] + "-" + myee[2];

      for (var i = 0; i < filtered.length; i++) {
        accountArray.push(filtered[i]["account"]);
        narrationArray.push(filtered[i]["narration"]);
        // amount_brArray.push(req.body.groupList[i]['amount_br']);

        //amount_brArray.push(parseFloat(req.body.groupList[i]['amount_br']));
        amount_brArrayCredit.push(parseFloat(filtered[i]["amount_br_credit"]));
        amount_brArrayDebit.push(parseFloat(filtered[i]["amount_br_debit"]));

        type_brArray.push(filtered[i]["type"]);

        if (filtered.length - 1 === i) {
          let accountArrayString = JSON.stringify(accountArray);
          let narrationArrayString = JSON.stringify(narrationArray);
          let amount_brArrayString_Credit =
            JSON.stringify(amount_brArrayCredit);
          let amount_brArrayString_Debit = JSON.stringify(amount_brArrayDebit);

          let type_brArrayString = JSON.stringify(type_brArray);

          var total = 0;

          let ledgerscodesSave = new Ledgers({
            date_added: today_now,
            date_transaction: date_final,
            date_for_sorting: date_sorting,
            voucher_num: req.body.voucher_br,
            bank_cash: "Journal",
            narration: narrationArrayString,
            received_from_or_paid_to: req.body.received_from_br,
            debit: amount_brArrayString_Debit,
            credit: amount_brArrayString_Credit,
            code_description: accountArrayString,
            total: total,
            receipt_payment: "Journal",
            type: type_brArrayString,
          });

          await ledgerscodesSave.save(async (err, todos) => {
            if (err) throw err;
            console.log("leder saved", ledgerscodesSave._id);
            let fetched = await Ledgers.find({ _id: ledgerscodesSave._id });

            res.json({ savedData: fetched, msg: "Journal Saved" });
          });
        }
      }
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "GET" && slug[0] === "nonbankcash") {
    try {
      let mmy = await authMiddleWare(req, res);

      console.log("@nonbankcash");
      // const brand = await Administrator.find({}).select("-password");
      let codes = await LedgerCodes.find({
        $and: [
          { type: { $ne: "Bank Account" } },
          { type: { $ne: "Cash Account" } },
        ],
      });
      res.json(codes);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "GET" && slug[0] === "bankonly") {
    try {
      let mmy = await authMiddleWare(req, res);
      // const brand = await Administrator.find({}).select("-password");
      console.log("@bankonly");
      let bank = "Bank Account";

      let row = await LedgerCodes.find({
        type: new RegExp("^" + bank + "$", "i"),
      });

      // console.log("@bankonly row", row);
      res.json(row);
    } catch (error) {
      console.log("error@bankonly", error);
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "GET" && slug[0] === "vouchercheck") {
    try {
      let mmy = await authMiddleWare(req, res);
      // const brand = await Administrator.find({}).select("-password");
      var voucher = slug[1];

      let row = await Ledgers.find({
        voucher_num: new RegExp("^" + voucher + "$", "i"),
      });

      if (row.length !== 0) {
        res.status(200).json({ msg: "existing" });
      } else {
        res.status(200).json({ msg: "not existing" });
      }
    } catch (error) {
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
