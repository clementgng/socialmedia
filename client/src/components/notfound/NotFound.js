// NotFound.js -- redirect user to a notfound page is they end up at invalid URL
import React from "react";

export default () => {
  return (
    <div className="lead text-center">
      <h1 className="display-4">Page Not Found</h1>
      <p>The page you were looking for does not exist.</p>
    </div>
  );
};

//export default NotFound;
