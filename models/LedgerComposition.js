const mongoose = require("mongoose");

const LedgerCompositionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    income_expense_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// LedgerCompositionSchema.model = {};

module.exports =
  mongoose.models.ledgercomposition ||
  mongoose.model("ledgercomposition", LedgerCompositionSchema);
