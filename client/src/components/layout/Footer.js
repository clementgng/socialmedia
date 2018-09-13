/* Footer.js footer using bootstrap
If this was a real website for a company like linkedin, would include links to about or careers page, etc
Since this is just for fun, just use a copyright instead :)
*/

import React from "react";

const Footer = props => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      TestApp &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
