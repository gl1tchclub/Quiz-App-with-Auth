/**
 * @file validation functions for various data entities
 * @author Elizabeth Minty
 */
import Joi from "joi";

const validateRegister = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email().maxDomainSegments(2).required().messages({
      "string.base": "Email must be a string",
      "string.min": "Email must have a minimum length of {#limit}",
      "string.max": "Email must have a maximum length of {#limit}",
    }),
    firstName: Joi.string().min(2).max(50).required().pattern(new RegExp("^[a-zA-Z]$")).messages({

    }),
    lastName: Joi.string().min(2).max(50).required().pattern(new RegExp("^[a-zA-Z]$")).messages({

    }),
    username: Joi.string().min(5).max(10).alphanum().required().messages({

    }),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(16).contains(),

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
