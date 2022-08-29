const router = require("express").Router();

const {
  addReaction,
  removeReaction,
} = require("../../controllers/reactions-controller");

const reactionRoutes = require("./reaction-routes");
const usersRoutes = require("./users-routes");

// /api/reactions/:userId
router.route("/:userId").post(addReaction);

// /api/reactions/:userId/:reactionId
router.route("/:userId/:reactionId").delete(removeReaction);

router.use("/reactions", reactionRoutes);
router.use("/users", usersRoutes);

module.exports = router;
