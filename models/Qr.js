const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String,
    },

    url_id: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    records: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.qr || mongoose.model("qr", qrSchema);
