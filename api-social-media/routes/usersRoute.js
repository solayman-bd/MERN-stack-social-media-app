const usersRoute = require("express").Router();

usersRoute.get("/", (req, res) => {
  res.send("user route is working");
});
module.exports = usersRoute;
