const { Reactions, Thoughts } = require("../models");

const reactionsController = {
  //add reaction to thought
  addReaction({ params, body }, res) {
    console.log(body);
    Reactions.create(body)
      .then(({ _id }) => {
        return Reactions.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: _id } },
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

  //remove reaction to thought
  removeReaction({ params }, res) {
    Reactions.findOneAndDelete({ _id: params.reactionId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res.status(404).json({ message: "No reaction with this id!" });
        }
        return Thoughts.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
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

module.exports = reactionsController;
