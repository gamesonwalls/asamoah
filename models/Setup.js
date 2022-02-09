const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const setUpSchema = new mongoose.Schema(
  {
    setup_id: {
      type: Number,
      unique: true,
    },
    active_state: {
      type: String,
    },
    area: {
      type: String,
      required: true,
    },
    area_shortcut: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    country_shortcut: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    ip_address: {
      type: String,
    },
    local: {
      type: String,
      required: true,
    },
    local_shortcut: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

setUpSchema.model = {};
module.exports = Setup = mongoose.model("setup", setUpSchema);
