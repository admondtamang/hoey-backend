const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const router = express.Router();
const auth = require("../auth");

router.get("/", (req, res, next) => {
  User.find().then(user => {
    res.json(user);
  });
});

router.post("/signup", (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      throw new Error("Could not hash!");
    }
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash
    })
      .then(user => {
        let token = jwt.sign({ _id: user._id }, process.env.SECERET);
        res.json({
          status: "Signup success!",
          token: token,
          admin: user.admin
        });
      })
      .catch(next);
  });
});
// Delete user
router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id).then(user => {
    res.json(user);
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user == null) {
        let err = new Error("User not found!");
        err.status = 401;
        return next(err);
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              let err = new Error("Password does not match!");
              err.status = 401;
              return next(err);
            }
            let token = jwt.sign({ _id: user._id }, process.env.SECERET);
            res.json({
              status: "Login success!",
              token: token,
              admin: user.admin
            });
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.get("/me", auth.verifyUser, (req, res, next) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    image: req.user.image,
    email: req.user.email,
    admin: req.user.admin,
    image: req.user.image
  });
});

router.put("/me", auth.verifyUser, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
    .then(user => {
      res.json({
        _id: user._id,
        username: user.username,
        image: user.image
      });
    })
    .catch(next);
});

router
  .route("/favourite")
  .get(auth.verifyUser, (req, res, next) => {
    User.findById(req.user._id)
      .populate({
        path: "songs",
        populate: {
          path: "album",
          model: "Album",
          populate: {
            path: "artist",
            model: "Artist"
          }
        }
      })
      .then(user => {
        res.json(user);
      });
  })
  .post(auth.verifyUser, (req, res, next) => {
    req.user.songs.push(req.body.songId);
    req.user.save().then(user => {
      res.json(req.user);
    });
  });

router.route("/favourite/:id").delete(auth.verifyUser, (req, res, next) => {
  User.findById(req.user._id).then(user => {});
});

module.exports = router;
