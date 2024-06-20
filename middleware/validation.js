/**
 * @file validation functions for various data entities
 * @author Elizabeth Minty
 */
import Joi from "joi";
import moment from "moment/moment.js";

const passRegex = /^(?=.*\d)(?=.*[\W_]).{8,16}$/;
const nameRegex = /^[a-zA-Z].{2,50}$/;
const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

const endDateGreaterThanStartDate = (startDate, endDate) => {
  // Convert dates to moment objects for comparison
  const startMoment = moment(startDate, 'DD/MM/YYYY');
  const endMoment = moment(endDate, 'DD/MM/YYYY');

  // Check if endDate is greater than startDate
  if (!endMoment.isAfter(startMoment)) {
    return Joi.valid(null).message(stringMsgs({type: "endDate"}));
  }

  // Check if endDate is within 5 days from startDate
  const maxEndDate = startMoment.clone().add(5, 'days');
  if (!endMoment.isSameOrBefore(maxEndDate)) {
    return Joi.valid(null).message(stringMsgs({type: "endDate"}));
  }

  return endDate;
};

function stringMsgs(obj) {
  let patternMsg = "";
  if (obj.type != "Password" && obj.type != "Date") {
    patternMsg = `${obj.type} must be between ${obj.min} and ${obj.max} characters and contain letters only.`;
  } else if (obj.type == "endDate") {
    patternMsg = `End date must be greater than the start date and end no longer than 5 days later.`;
  } else if (obj.type == "startDate") {
    patternMsg = "Start date has to be greater than today's date";
  } 
  else {
    patternMsg = `${obj.type} must be between ${obj.min} and ${obj.max} characters and contain at least one numeric character and one special character`;
  }
  return {
    "string.base": `${obj.type} must be a string.`,
    "string.min": `${obj.type} must have a minimum length of ${obj.min}.`,
    "string.max": `${obj.type} must have a maximum length of ${obj.max}.`,
    "string.empty": `${obj.type} cannot be empty.`,
    "string.email": `Invalid email format. Please provide a valid email address.`,
    "tlds.allow":
      "Only email addresses with .com, .net, or .co.nz domains are allowed.",
    "string.minDomainSegments": "Email domain must have 2 segments.",
    "string.maxDomainSegments": "Email domain must have 2 segments.",
    "string.alphanum": `${obj.type} must contain only letters and numbers.`,
    "string.pattern.base": patternMsg,
  };
}

const validateRegister = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 2,
        tlds: false,
      })
      .messages(stringMsgs({ type: "Email", min: null, max: null })),
    firstName: Joi.string()
      .min(2)
      .max(50)
      .regex(nameRegex)
      .messages(stringMsgs({ type: "First Name", min: 2, max: 50 })),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .regex(nameRegex)
      .messages(stringMsgs({ type: "Last Name", min: 2, max: 50 })),
    username: Joi.string()
      .min(5)
      .max(10)
      .alphanum()
      .messages(stringMsgs({ type: "Username", min: 5, max: 10 })),
    password: Joi.string()
      .regex(passRegex)
      .messages(stringMsgs({ type: "Password", min: 8, max: 16 })),
    confirm_password: Joi.string().valid(Joi.ref("password")).messages({
      "any.only": "Confirm password does not match given password",
      "string.base": "Password must be a string",
    }),
    role: Joi.string().valid("ADMIN_USER", "BASIC_USER").messages({
      "any.only": "Role must be either BASIC_USER or ADMIN_USER",
    }),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

const validateQuiz = (req, res, next) => {
  const quizSchema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(30)
      .regex(nameRegex)
      .messages(stringMsgs({ type: "Quiz Name", min: 5, max: 30 })),
    startDate: Joi.date()
      .min("now")
      .regex(dateRegex)
      .messages(stringMsgs({ type: "startDate" })),
    endDate: Joi.date()
    .min(startDate)
    .max()
    .regex(dateRegex)
    .custom((value, helpers) => {
      const startDate = helpers.state.ancestors[0].startDate;
      return endDateGreaterThanStartDate(startDate, value);
    }),
  });

  const { error } = quizSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

export { validateRegister, validateQuiz };
