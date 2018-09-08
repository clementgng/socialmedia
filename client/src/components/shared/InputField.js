/* This file is an input form field for things such as other social media website info, etc. */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputField = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      {/*<div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
  </div>*/}
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

// set the default type to text
InputField.defaultProps = {
  type: "text"
};

export default InputField;
