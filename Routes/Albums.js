const Album = require("../Models/Album");
const express = require("express");
const router = express.Router();
router
  .route("/")
  .get((req, res, next) => {
    Album.find()
      .populate({ path: "artist" })
      .then(Album => {
        res.json(Album);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    Album.create(req.body)
      .then(album => {
        res.json(album);
      })
      .catch(next);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    Album.findOne({ _id: req.params.id })
      .then(album => {
        res.json(album);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    Album.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(album => {
        res.json(album);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    Album.findByIdAndDelete(req.params.id)
      .then(album => {
        res.json(album);
      })
      .catch(next);
  });

module.exports = router;
