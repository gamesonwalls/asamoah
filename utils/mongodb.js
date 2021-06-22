const mongoose = require("mongoose");

// const config = require("config");

//console.log("config",config)

const connectDB = async () => {
  try {
    const mongoDb = await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err.message);
    //Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
