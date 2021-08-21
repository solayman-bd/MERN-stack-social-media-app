const authRoute = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
//register

authRoute.post("/register", async (req, res) => {
  try {
    //generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new userModel({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user to database and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = authRoute;
