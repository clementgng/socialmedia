const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // Validate and Check the required fields for the profile: Handle, status
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!validator.isLength(data.handle, { min: 1, max: 40 })) {
    errors.handle = "Handle must be between 1-40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Please specify a job title";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Please specify your skills";
  }
  if (validator.isEmpty(data.industry)) {
    errors.industry = "Please specify the industry you work in";
  }

  // Validate and Check if the website and social media links are valid URLs
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(data.githubusername)) {
    if (!validator.isURL(data.githubusername)) {
      errors.githubusername = "Not a valid URL";
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
