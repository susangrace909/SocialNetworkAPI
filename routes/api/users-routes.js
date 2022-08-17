const router = require("express").Router();

const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../../controllers/users-controller");
const { create } = require("../../models/users");

// Set up GET all and POST at /api/uers
router.route("/").get(getAllUsers).post(createUsers);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUsersById).put(updateUsers).delete(deleteUsers);

module.exports = router;
