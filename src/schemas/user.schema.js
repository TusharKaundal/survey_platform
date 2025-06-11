const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().required().email().trim(),
  password: Joi.string().required().min(6),
  name: Joi.string().required().trim(),
  is_active: Joi.boolean().default(true),
});

module.exports = {
  userSchema,
};
