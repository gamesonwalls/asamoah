const mongoose = require("mongoose");

const LedgersCodesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    income_balance: {
      type: String,
      required: true,
    },
    p_l_b_s: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ledgers_codes ||
  mongoose.model("ledgers_codes", LedgersCodesSchema);
