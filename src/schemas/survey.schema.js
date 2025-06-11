const Joi = require("joi");

const questionSchema = Joi.object({
  id: Joi.string().required(),
  question: Joi.string().required().trim(),
  type: Joi.string()
    .valid(
      "short-text",
      "long-text",
      "single-choice",
      "multiple-choice",
      "rating",
      "nps"
    )
    .required(),
  options: Joi.array().items(Joi.string()),
  required: Joi.boolean().default(false),
});

const surveySchema = Joi.object({
  user_id: Joi.string().required(),
  title: Joi.string().required().trim(),
  description: Joi.string().default(""),
  status: Joi.string().valid("draft", "active", "completed").default("draft"),
  questions: Joi.array().items(questionSchema).min(1).required(),
  published_at: Joi.date().allow(null),
});

module.exports = {
  surveySchema,
  questionSchema,
};
