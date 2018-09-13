// validation/post.js -- Validation for submitting a post
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Validate and Check the required fields for the profile: Handle, status
  data.postContents = !isEmpty(data.postContents) ? data.postContents : "";

  if (!validator.isLength(data.postContents, { min: 1, max: 300 })) {
    errors.postContents = "Posts can have up to 300 characters";
  }

  if (validator.isEmpty(data.postContents)) {
    errors.postContents = "Please write some text to submit a post";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
