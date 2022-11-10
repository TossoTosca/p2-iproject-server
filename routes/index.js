const router = require("express").Router();
const user = require("./user");
const news = require('./news')
const error = require("../middlewares/errorHandler");

router.use("/", user);
router.use("/news", news)
router.use(error);

module.exports = router;