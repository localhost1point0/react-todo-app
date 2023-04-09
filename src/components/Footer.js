import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      © {currentYear} React Todo App. All rights reserved.
    </footer>
  );
};

export default Footer;
