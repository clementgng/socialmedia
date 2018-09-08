/* This file is a select list that user can drop down and scroll */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectList = ({
  name,
  value,
  error,
  info,
  onChange,
  selectOptionsArray
}) => {
  const selectOptions = selectOptionsArray.map(selectOption => (
    <option key={selectOption.label} value={selectOption.value}>
      {selectOption.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selectOptionsArray: PropTypes.array.isRequired
};

export default SelectList;
