//external import
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");

//internal import
const mongooseConnection = require("./utils");
const usersRoute = require("./routes/usersRoute");

const app = express();
dotenv.config();

const port = process.env.PORT || 8800;

mongooseConnection();

//middleware
app.use(express.json());
app.use(helmet());
app.use("/api/users", usersRoute);

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.listen(port, () => {
  console.log(`Backend is running to port ${port}`);
});
