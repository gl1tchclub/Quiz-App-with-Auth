/**
 * @file validation functions for various data entities
 * @author Elizabeth Minty
 */
import Joi from "joi";

const validateRegister = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().min(7).max(50).messages({
      "string.base": "Email must be a string",
      "string.min": "Email must have a minimum length of {#limit}",
      "string.max": "Email must have a maximum length of {#limit}",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    repeat_password: Joi.ref("password"),
  });
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};
