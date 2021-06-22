const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

  token: {
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

mongoose.models = {};
// module.exports= Administrator = mongoose.model('user',UserSchema);

// UserSchema.plugin(AutoIncrement, { id: "reg_seq", inc_field: "user_id" });
module.exports = Users = mongoose.model("user", UserSchema);
