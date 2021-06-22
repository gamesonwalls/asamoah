const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const RoomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
  },
  room_participants: {
    type: Number,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },

  date_added: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
  },
});

// module.exports= Administrator = mongoose.model('admin',RoomSchema);

// RoomSchema.plugin(AutoIncrement, {
//   id: "booking_seq",
//   inc_field: "booking_id",
// });

mongoose.models = {};
module.exports = Room = mongoose.model("room", RoomSchema);
