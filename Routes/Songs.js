const express = require("express");
const Song = require("../Models/Songs");
const router = express.Router();
const fs = require("fs");
const auth = require("../auth");

router.route("/play/:link").get((req, res, next) => {
  res.writeHead(200, { "Content-Type": "audio/mp3" });
  let rs = fs.createReadStream("./public/uploads/songs/" + req.params.link);
  rs.pipe(res);
});

// Generate Top songs
router.route("/top").get((req, res, next) => {
  Song.find({})
    .populate({
      path: "album",
      populate: {
        path: "artist",
        model: "Artist"
      }
    })
    .limit(3)
    .then(songs => {
      res.json(songs);
      x;
    })
    .catch(next);
});

// Display songs
router
  .route("/")
  .get((req, res, next) => {
    Song.find()
      .populate({
        path: "album",
        populate: {
          path: "artist",
          model: "Artist"
        }
      })
      .then(songs => {
        res.json(songs);
      })
      .catch(next);
  })

  .post((req, res, next) => {
    Song.create(req.body)
      .then(song => {
        res.statusCode = 201;
        res.json(song);
      })
      .catch(next);
  })

  .put((req, res) => {
    res.status = 405;
  })
  .delete((req, res, next) => {
    res.status = 405;
  });

// Generate songs based on albums
router
  .route("/album/:id")
  .get((req, res, next) => {
    Song.find({ album: req.params.id })
      .populate({
        path: "album",
        populate: {
          path: "artist",
          model: "Artist"
        }
      })
      .then(song => {
        res.json(song);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    Song.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(Song => {
        res.json(Song);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    Song.findByIdAndDelete(req.params.id)
      .then(Song => {
        res.json(Song);
      })
      .catch(next);
  });

// To count the number of song played
router.route("/counter/:id").put((req, res, next) => {
  Song.findByIdAndUpdate({ _id: req.params.id }, { $inc: { played: 1 } })
    .then(song => {
      res.json(song);
    })
    .catch(next);
});

// Get one song
router
  .route("/:id")
  .get((req, res, next) => {
    Song.findById(req.params.id)
      .then(song => {
        res.json(song);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    Song.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(song => {
        res.json(song);
      })
      .catch(next);
  });

// Get song comment by user

router
  .route("/:id/comments")
  .get((req, res, next) => {
    Song.findOne({ _id: req.params.id })
      .then(song => {
        res.json(song.comments);
      })
      .catch(next);
  })

  .post(auth.verifyUser, (req, res, next) => {
    Song.findOne({ _id: req.params.id }).then(song => {
      song.comments.push(req.body);
      song
        .save()
        .then(song => {
          res.json(song.comments);
        })
        .catch(next);
    });
  });

router
  .route("/:id/comments/:cid")
  .get((req, res, next) => {
    Song.findOne({ _id: req.params.id }).then(song => {
      let comment = song.comments.id(req.params.cid);
      res.json(comment);
    });
  })

  .put((req, res, next) => {
    Song.findOne({ _id: req.params.id }).then(song => {
      let comment = song.comments.id(req.params.cid);
      comment.comment = req.body.comment;
      song.save().then(() => {
        res.json(comment);
      });
    });
  })

  .delete((req, res, next) => {
    Song.findOne({ _id: req.params.id }).then(song => {
      song.comments.pull(req.params.cid);
      song.save().then(song => {
        res.json(song.comments);
      });
    });
  });
module.exports = router;
