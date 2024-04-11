/**
 * @file validation functions for various data entities
 * @author Elizabeth Minty
 */
import Joi from "joi";

// function stringMsgs(type) {
//   return {
//     "string.base": `${type} must be a string`,
//     "string.min": `${type} must have a minimum length of`,
//     "string.max": `${type} must have a maximum length of`,
//   }
// }

const validateRegister = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email({
       minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co.nz'] } 
      })
      .maxDomainSegments(2).custom(value => {
        if(!value.includes(username))
          throw new Error("Email must contain ");
      })
        .messages({
      "string.base": "Email must be a string",
    }),
    firstName: Joi.string().min(2).max(50).pattern(new RegExp("^[a-zA-Z]$")).messages({
      
    }),
    lastName: Joi.string().min(2).max(50).pattern(new RegExp("^[a-zA-Z]$")).messages({

    }),
    username: Joi.string().min(5).max(10).alphanum().messages({

    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(16).contains(),

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
