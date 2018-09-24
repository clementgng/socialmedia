// validation/experience.js -- Validation for adding a user's experience to their profile
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Validate and Check the required fields for the profile: Handle, status
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title is required";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "Start date is required";
  }
  if (validator.isEmpty(data.to) && data.current == false) {
    errors.to = "Select an end date or check Current Job";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
