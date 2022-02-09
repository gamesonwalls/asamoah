const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const openBalanceDateSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
    },
    date_open: {
      type: String,
      required: true,
    },
    date_modified: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

openBalanceDateSchema.plugin(AutoIncrement, {
  id: "order_seq10",
  inc_field: "id",
});
module.exports = openBalanceDate = mongoose.model(
  "openBalanceDate",
  openBalanceDateSchema
);
