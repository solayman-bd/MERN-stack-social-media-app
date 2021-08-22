const mongoose = require("mongoose");
const mongooseConnection = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    if (result) {
      console.log("Database connection established");
    }
  } catch (err) {
    console.log("Error", err);
  }
};
module.exports = mongooseConnection;
