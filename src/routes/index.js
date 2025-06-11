const express = require("express");
const authRoute = require("./auth.route");
const surveyRoute = require("./survey.route");

const router = express();

router.use("/auth", authRoute);
router.use("/surveys", surveyRoute);

module.exports = router;
