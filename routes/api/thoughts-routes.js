const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThought,
  removeThought,
} = require("../../controllers/thoughts-controller");

router.route("/").get(getAllThoughts);

router.route("/:thoughtId").get(getThoughtsById);

router.route("/:thoughtId").post(addThought);

router.route("/:thoughtId").delete(removeThought);

//

module.exports = router;
