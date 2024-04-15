/**
 * @file validation functions for various data entities
 * @author Elizabeth Minty
 */
import Joi from "joi";

const passRegex = /^(?=.*\d)(?=.*[\W_]).{8,16}$/;
const nameRegex = /^[a-zA-Z]$/;

function stringMsgs(obj) {
  let patternMsg;
  if (obj.type != "Password") {
     patternMsg = `${obj.type} must contain letters only.`
  }
  else {
    patternMsg = `${obj.type} must contain at least one numeric character and one special character`
  }
  return {
    "string.base": `${obj.type} must be a string.`,
    "string.min": `${obj} must have a minimum length of ${obj.min}.`,
    "string.max": `${obj} must have a maximum length of ${obj.max}.`,
    "string.empty": `${obj} cannot be empty.`,
    "string.email": `Invalid email format. Please provide a valid email address.`,
    "string.tlds": "Only email addresses with .com, .net, or .co.nz domains are allowed.",
    "string.minDomainSegments": "Email domain must have 2 segments.",
    "string.maxDomainSegments": "Email domain must have 2 segments.",
    "string.alphanum": `${obj.type} must contain only letters and numbers.`,
    "string.pattern.base": patternMsg,
  }
}

const validateRegister = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email({
       minDomainSegments: 2, maxDomainSegments: 2, tlds: { allow: ['com', 'net', 'co.nz'] } 
      })
      .messages(stringMsgs({type: "Email", min: null, max: null})),
    firstName: Joi.string().min(2).max(50).regex(nameRegex).messages(stringMsgs({type: "First Name", min: 2, max: 50})),
    lastName: Joi.string().min(2).max(50).regex(nameRegex).messages(stringMsgs({type: "Last Name", min: 2, max: 50})),
    username: Joi.string().min(5).max(10).alphanum().messages(stringMsgs({type: "Username", min: 5, max: 10})),
    password: Joi.string().regex(passRegex).min(8).max(16).messages(stringMsgs({type: "Password", min: 8, max: 16})),
    confirm_password: Joi.any().valid(Joi.ref("password").required()).messages({ 
      "any.required": "Please confirm password",
      "any.valid": "Confirm password does not match given password",
    }),
  });
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};
