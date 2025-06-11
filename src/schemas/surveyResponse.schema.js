const Joi = require("joi");

const surveyResponseSchema = Joi.object({
  survey_id: Joi.string().required(),
  respondent_id: Joi.string().required(),
  answers: Joi.object().required(),
  completed_at: Joi.date().default(() => new Date()),
  ip_address: Joi.string().allow(null),
  user_agent: Joi.string().allow(null),
});

module.exports = {
  surveyResponseSchema,
};
