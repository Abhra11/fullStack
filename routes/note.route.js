const express = require("express");
// const { UserModel } = require("../models/auth.model");
const noteRoute = express();
const { NoteModel } = require("../models/Note.model");

noteRoute.use(express.json());
noteRoute.get("/", async (req, res) => {
  const user = await NoteModel.find();
  res.send(user);
});

noteRoute.post("/create", async (req, res) => {
  const payload = req.body;
  // console.log(payload);
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send("Note Created");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Wrong" });
  }
});

noteRoute.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  const note = await NoteModel.findOne({ _id: ID });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  // console.log(userID_making_req);
  // console.log(userID_in_note);
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: ID }, payload);
      res.send("Updated Note");
    }
  } catch (err) {
    console.log(err);
  }
});

noteRoute.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  const note = await NoteModel.findOne({ _id: ID });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_note) {
      res.send("You are not authorised");
    } else {
      await NoteModel.findByIdAndDelete({ _id: ID });
      res.send("Deleted Note");
    }
  } catch (err) {
    res.send("Error");
    console.log(err);
  }
});
module.exports = { noteRoute };
