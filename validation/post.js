const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Validate and Check the required fields for the profile: Handle, status
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = "Posts can have up to 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text is required in posts";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
