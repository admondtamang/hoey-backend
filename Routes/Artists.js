const Artist = require("../Models/Artist");
const express = require("express");
const router = express.Router();

router.route("/top").get((req, res, next) => {
  Artist.find({})
    .limit(3)
    .then(songs => {
      res.json(songs);
    })
    .catch(next);
});

router
  .route("/")
  .get((req, res, next) => {
    Artist.find()
      .then(artist => {
        res.json(artist);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    Artist.create(req.body)
      .then(artist => {
        res.json(artist);
      })
      .catch(next);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    Artist.findOne({ _id: req.params.id })
      .then(artist => {
        res.json(artist);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    Artist.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(artist => {
        res.json(artist);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    Artist.findByIdAndDelete(req.params.id)
      .then(artist => {
        res.json(artist);
      })
      .catch(next);
  });

module.exports = router;
