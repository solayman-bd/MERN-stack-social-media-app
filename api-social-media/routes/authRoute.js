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

//login
authRoute.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    !user && res.status(404).send("User Not Found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).send("Password is incorrect");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(error);
  }
});

module.exports = authRoute;
