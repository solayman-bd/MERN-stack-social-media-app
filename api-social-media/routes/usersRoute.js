const usersRoute = require("express").Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
//update user
usersRoute.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});
//delete user
usersRoute.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await userModel.deleteOne({ _id: req.params.id });
      console.log("Working");
      res.status(200).json("Account has been deleted successfully");
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).json("You can delete only your account");
  }
});
//get a users

usersRoute.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow a user

usersRoute.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);

      const currentUser = await userModel.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.body.userId } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You have already followed the user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});
//unfollow a user

usersRoute.get("/", (req, res) => {
  res.send("Users Route is working");
});

module.exports = usersRoute;
