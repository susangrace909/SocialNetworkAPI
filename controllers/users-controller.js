const { Users } = require("../models");

const usersController = {
  // GET ALL users
  getAllUsers(req, res) {
    Users.find({})
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        return res.sendStatus(400);
      });
  },

  // GET INDIVIDUAL users
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .then((dbUsersData) => {
        //if no users found, send 404
        if (!dbUsersData) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        return res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  //POST users
  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(400).json(err));
  },

  //PUT users
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //DELETE users
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = usersController;
