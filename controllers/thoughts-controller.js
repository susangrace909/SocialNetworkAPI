// import models
const { Thoughts, Users } = require("../models");

// add thought
const thoughtsController = {
  // GET ALL thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        return res.sendStatus(400);
      });
  },

  // GET INDIVIDUAL thoughts
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.thoughtId })
      .then((dbUsersData) => {
        //if no users found, send 404
        if (!dbUsersData) {
          res.status(404).json({ message: "No thoughts found with this id!" });
          return;
        }
        return res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },
  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        return Thoughts.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
  // remove thought
  removeThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return Thoughts.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
