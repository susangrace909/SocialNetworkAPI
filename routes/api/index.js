const router = require("express").Router();
const usersRoutes = require("./users-routes");
const thoughtRoutes = require("./thoughts-routes");

// add prefix of `/users` to routes created in `user-routes.js`
router.use("/users", usersRoutes);

router.use("/thoughts", thoughtRoutes);

module.exports = router;
