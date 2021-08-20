const mongoose = require("mongoose");
const mongooseConnection = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (result) {
      console.log("Connection Established");
    }
  } catch (err) {
    console.log("Error", err);
  }
};
module.exports = mongooseConnection;
