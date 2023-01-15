const express = require("express");

require("dotenv").config();
const { connection } = require("./configs/db");
const { authRoute } = require("./routes/auth.route");
const { noteRoute } = require("./routes/note.route");
const { authenticator } = require("./middlewares/authenticator.middleware");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/auth", authRoute);

app.use(authenticator);
app.use("/notes", noteRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
  console.log(`Port is running ${process.env.port}`);
});
