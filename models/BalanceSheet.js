const mongoose = require("mongoose");

const BalanceSheetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.balance_sheet ||
  mongoose.model("balance_sheet", BalanceSheetSchema);
