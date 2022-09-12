const router = require("express").Router();

const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend,
} = require("../../controllers/users-controller");
// const { create } = require("../../models/users");

// Set up GET all  at /api/uers
router.route("/").get(getAllUsers);

//POST at /api/users
router.route("/").post(createUsers);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUsersById);

//PUT
router.route("/:id").put(updateUsers);

//DELETE
router.route("/:id").delete(deleteUsers);

// ADD friend
router.route("/:userId/friends/:friendId").post(addFriend);

//DELETE friend
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
