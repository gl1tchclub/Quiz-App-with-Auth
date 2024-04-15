/**
 * @file validation functions for various data entities
 * @author Elizabeth Minty
 */
import Joi from "joi";

function stringMsgs(obj) {
  return {
    "string.base": `${obj.type} must be a string.`,
    "string.min": `${obj} must have a minimum length of ${obj.min}.`,
    "string.max": `${obj} must have a maximum length of ${obj.max}.`,
    "string.empty": `${obj} cannot be empty.`,
    "string.email": `Invalid email format. Please provide a valid email address.`,
    "string.tlds": "Only email addresses with .com, .net, or .co.nz domains are allowed.",
    "string.minDomainSegments": "Email domain must have 2 segments.",
    "string.maxDomainSegments": "Email domain must have 2 segments.",
  }
}

const validateRegister = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email({
       minDomainSegments: 2, maxDomainSegments: 2, tlds: { allow: ['com', 'net', 'co.nz'] } 
      })
      .messages(stringMsgs({type: "Email", min: null, max: null})),
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
