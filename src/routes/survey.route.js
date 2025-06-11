const express = require("express");
const { auth } = require("../middleware/auth");
const Survey = require("../models/survey.model");
const { getSurveys } = require("../controllers/surveys.controller");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { status, page = 1, limit = 10, search } = req.query;
  console.log(status, page, limit, search);
  const filter = { user_id: req.user.user_id };
  if (status) {
    filter.status = status;
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  const surveys = await Survey.find(filter);
  console.log(surveys);
  res.status(200).json({
    message: "Surveys fetched successfully",
  });
});

router.post("/", auth, getSurveys);

router.get("/:id", auth, (req, res) => {
  res.status(200).json({
    message: "Survey fetched successfully",
  });
});

router.put("/:id", auth, (req, res) => {
  res.status(200).json({
    message: "Survey updated successfully",
  });
});

router.delete("/:id", auth, (req, res) => {
  res.status(200).json({
    message: "Survey deleted successfully",
  });
});

router.post("/:id/publish", auth, (req, res) => {
  res.status(200).json({
    message: "Survey published successfully",
  });
});

router.post("/:id/unpublish", auth, (req, res) => {
  res.status(200).json({
    message: "Survey unpublished successfully",
  });
});

module.exports = router;
