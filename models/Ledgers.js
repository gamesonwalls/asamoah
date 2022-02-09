const mongoose = require("mongoose");

const LedgersSchema = new mongoose.Schema(
  {
    voucher_num: {
      type: String,
      unique: true,
    },
    date_transaction: {
      type: String,
      required: true,
    },
    date_added: {
      type: String,
      required: true,
    },
    date_for_sorting: {
      type: String,
      required: true,
    },
    bank_cash: {
      type: String,
      required: true,
    },
    narration: {
      type: String,
      required: true,
    },
    cheque_num: {
      type: String,
    },

    received_from_or_paid_to: {
      type: String,
      default: null,
    },
    debit: {
      type: String,
    },
    credit: {
      type: String,
    },
    total: {
      type: String,
      default: null,
    },
    code_description: {
      type: String,
      required: true,
    },

    type_of_bank: {
      type: String,
    },

    receipt_payment: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ledgers || mongoose.model("ledgers", LedgersSchema);
