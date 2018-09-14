// validation/post.js -- Validation for submitting a post
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Validate and Check the required fields for the profile: Handle, status
  data.postContents = !isEmpty(data.postContents) ? data.postContents : "";

  if (!validator.isLength(data.postContents, { min: 1 })) {
    errors.postContents = "Please submit more than 1 character";
  }

  if (validator.isEmpty(data.postContents)) {
    errors.postContents = "we need something here";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
