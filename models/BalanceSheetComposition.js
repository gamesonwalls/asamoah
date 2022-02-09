const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const BalanceSheetCompSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.balance_sheet_comp ||
  mongoose.model("balance_sheet_comp", BalanceSheetCompSchema);
