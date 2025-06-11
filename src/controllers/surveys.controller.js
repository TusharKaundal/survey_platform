const Survey = require("../models/survey.model");
const { catchAsync } = require("../utils/catchAsync");

const getSurveys = catchAsync(async (req, res) => {
  const { title, description, questions } = req.body;
  const survey = await Survey.create({
    user_id: req.user.user_id,
    title,
    description,
    questions,
  });
  const response = {
    title: survey.title,
    description: survey.description,
    questions: survey.questions,
  };
  res.status(200).json(response);
});

module.exports = { getSurveys };
