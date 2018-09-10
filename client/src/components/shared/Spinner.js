// Displkay a spinner while pages are loading
import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "150px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
