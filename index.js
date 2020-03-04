const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const userRouter = require("./Routes/users");
const songRouter = require("./Routes/Songs");
const uploadRouter = require("./Routes/upload");

// Admin
const artistRouter = require("./Routes/Artists");
const albumRouter = require("./Routes/Albums");
const dotenv = require("dotenv").config();
const auth = require("./auth");
const cors = require("cors");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

let mydb;
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(
    db => {
      console.log("Successfully connected to MongodB server");
      mydb = db;
    },
    err => console.log(err)
  );

app.use("/users", userRouter);
app.use("/upload", uploadRouter);
app.use("/songs", songRouter);

// Admin
app.use("/admin/artists", artistRouter);
app.use("/admin/albums", albumRouter);
// app.use(auth.verifyUser);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at localhost:${process.env.PORT}`);
});
