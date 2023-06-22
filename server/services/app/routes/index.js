const express = require("express");
const router = express.Router();
const publicRouter = require("./public");
const adminRouter = require("./admin");

router.use("/public", publicRouter);
router.use(adminRouter);
module.exports = router;
