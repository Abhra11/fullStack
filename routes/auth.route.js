const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/auth.model");
// require("dotenv").config();

const authRoute = express();
authRoute.use(express.json());

authRoute.post("/register", (req, res) => {
  const { email, pass, name } = req.body;
  // const saltRounds = process.env.saltRounds;
  try {
    bcrypt.hash(pass, 4, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, pass: hash, name });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

authRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "shhhhh");
          res.send({ msg: "Login Succ", token: token });
        } else {
          res.send("Wrong Creds");
        }
      });
    }
  } catch (err) {
    console.log(err);
    console.log("Wrong Creds");
  }
});

module.exports = { authRoute };
