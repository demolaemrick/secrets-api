const { check, validationResult } = require("express-validator");

const loginValidationRules = () => {
  return [
    // email address validation
    check("email")
      .notEmpty()
      .withMessage("Email address is required")
      .normalizeEmail()
      .isEmail()
      .withMessage("Must be a valid email"),
    // password validation
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 7 })
      .withMessage("Password must be minimum 7 length")
      .matches(/(?=.*?[A-Z])/)
      .withMessage("Password must contain at least one Uppercase")
      .matches(/(?=.*?[a-z])/)
      .withMessage("Password must contain at least one Lowercase")
      .matches(/(?=.*?[0-9])/)
      .withMessage("Password must contain one Number")
      .matches(/(?=.*?[#?!@$%^&*-])/)
      .withMessage("Password must contain at least one special character")
      .not()
      .matches(/^$|\s+/)
      .withMessage("White space is not allowed"),
  ];
};

const registerValidationRules = () => {
  return [
    // name validation
    check("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .matches(/^[a-zA-Z ]*$/)
      .withMessage("Only Characters with white space are allowed"),
    // email address validation
    check("email")
      .notEmpty()
      .withMessage("Email address is required")
      .normalizeEmail()
      .isEmail()
      .withMessage("Must be a valid email"),
    // password validation
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 7 })
      .withMessage("Password must be minimum 7 length")
      .matches(/(?=.*?[A-Z])/)
      .withMessage("Password must contain at least one Uppercase")
      .matches(/(?=.*?[a-z])/)
      .withMessage("Password must contain at least one Lowercase")
      .matches(/(?=.*?[0-9])/)
      .withMessage("Password must contain one Number")
      .matches(/(?=.*?[#?!@$%^&*-])/)
      .withMessage("Password must contain at least one special character")
      .not()
      .matches(/^$|\s+/)
      .withMessage("White space is not allowed"),
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  let invalidData = errors.mapped();
  return res.status(400).json({
    errors: invalidData,
  });
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  validate,
};
