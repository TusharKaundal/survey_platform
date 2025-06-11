const Joi = require("joi");

const respondantSchema = Joi.object({
  email: Joi.string().email().allow("").default(""),
  name: Joi.string().allow("").default(""),
  metadata: Joi.object().default({}),
  is_active: Joi.boolean().default(true),
});

module.exports = {
  respondantSchema,
};
