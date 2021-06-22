const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  student_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  gender: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  token: {
    type: String,
  },

  message: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },

  status: {
    type: String,
  },

  date_added: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
  },
});

// module.exports= Administrator = mongoose.model('admin',BookingSchema);

// BookingSchema.plugin(AutoIncrement, {
//   id: "booking_seq",
//   inc_field: "booking_id",
// });

mongoose.models = {};
module.exports = Booking = mongoose.model("booking", BookingSchema);
