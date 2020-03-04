const express = require("express");
const Playlist = require("../Models/Playlist");

const router = experss.router();

router
  .route("/")
  .get((req, res, next) => {
    Playlist.find()
      .then(playlist => {
        res.json(playlist);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    Playlist.create(req.body)
      .then(playlist => {
        res.json(playlist);
      })
      .catch(next);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    Playlist.findOne({ _id: req.params.id })
      .then(playlist => {
        res.json(playlist);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    Playlist.findByIdAndDelete(req.params.id)
      .then(playlist => {
        res.json(playlist);
      })
      .catch(next);
  });

module.exports = router;
