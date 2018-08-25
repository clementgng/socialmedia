const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.firstName, { min: 1, max: 30 })) {
    errors.firstName = "First Name must be between 1 and 30 characters";
  }
  if (!validator.isAlpha(data.firstName)) {
    errors.firstName = "First name is required";
  }

  if (!validator.isLength(data.lastName, { min: 1, max: 30 })) {
    errors.lastName = "Last Name must be between 1 and 30 characters";
  }
  if (!validator.isAlpha(data.lastName)) {
    errors.lastName = "Last name is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "These passwords don't match. Please try again.";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
