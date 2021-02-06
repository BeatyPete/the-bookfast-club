const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes");
const readListRoutes = require("./readlist-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/readlist", readListRoutes);

module.exports = router;
