const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const profitLossSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.profit_loss ||
  mongoose.model("profit_loss", profitLossSchema);
