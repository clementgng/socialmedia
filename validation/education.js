// validation/education.js -- Validation for adding a user's education to their profile
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Validate and Check the required fields for the profile: Handle, status
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.major = !isEmpty(data.major) ? data.major : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School is required";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }
  if (validator.isEmpty(data.major)) {
    errors.major = "Major is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
