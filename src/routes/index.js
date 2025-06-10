const express = require("express");
const authRoute = require("./auth.route");

const router = express();

router.use("/auth", authRoute);

module.exports = router;
