const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    f_name: {
      type: String,
      required: true,
    },
    m_name: {
      type: String,
      required: false,
      default: "",
    },
    l_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// mongoose.models = {};
// module.exports = User = mongoose.model("user", UserSchema);

module.exports = mongoose.models.users || mongoose.model("users", UserSchema);
