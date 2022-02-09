// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import authMiddleWare from "../../../middleware/auth";

const User = require("../../../models/User");

const LedgerComposition = require("../../../models/LedgerComposition");
const Ledgers = require("../../../models/Ledgers");

const { body, check, validationResult } = require("express-validator");

// const jwt = require("jsonwebtoken");

export default async function openingbalanceslug(req, res) {
  const { slug } = req.query;

  let url = slug.join("/");
  console.log("slugs", slug.join(","), "url", url);

  let mmy = await authMiddleWare(req, res);

  console.log("verifyAdmin", mmy);

  if (req.method === "POST" && slug[0] === "save") {
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

      //  console.log("req.bodd", req.body);
      let today_now = dd + "-" + mm + "-" + year;

      let debitArray = [];
      let code_descriptionArray = [];
      let creditArray = [];
      let narrationArray = ["Opening Balance"];
      //let type_brArray=[];

      //req.body.groupList.pop();

      let myee = req.body.date_br.split("-");
      let date_final = myee[2] + "-" + myee[1] + "-" + myee[0];
      let date_sorting = myee[0] + "-" + myee[1] + "-" + myee[2];

      for (var i = 0; i < req.body.groupList.length; i++) {
        code_descriptionArray.push(req.body.groupList[i]["name"]);

        debitArray.push(parseFloat(req.body.groupList[i]["debit"]));
        creditArray.push(parseFloat(req.body.groupList[i]["credit"]));

        let code_descrtipionArrayString = JSON.stringify([
          req.body.groupList[i]["name"],
        ]);

        // let debitArrayString = JSON.stringify([
        //   parseFloat(req.body.groupList[i]["debit"]),
        // ]);

        // let creditArrayString = JSON.stringify([
        //   parseFloat(req.body.groupList[i]["credit"]),
        // ]);

        let my = await Ledgers.updateOne(
          {},
          {
            date_for_sorting: date_sorting,
            debit: req.body.groupList[i]["debit"],
            credit: req.body.groupList[i]["credit"],
          },
          {
            new: true,
          }
        )
          .where("_id")
          .equals(req.body.groupList[i]["_id"]);

        if (req.body.groupList.length - 1 === i) {
          // console.log("dff");
          res.status(200).send("done");

          //   await openBalanceDate.replaceOne(
          //     { name: "Open" },
          //     { name: "Open", date_open: date_sorting, date_modified: today_now },
          //     { upsert: true },
          //     function (err, result) {
          //       if (err) {
          //         res.send(err);
          //       } else {
          //         res.status(200).send("done");
          //       }
          //     }
          //   );
        }
      }
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
}
