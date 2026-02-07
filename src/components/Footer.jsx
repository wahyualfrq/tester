import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5 bg-dark">
      <p>&copy; {new Date().getFullYear()} Portofolioo. All rights reserved.</p>
      <p className="mt-2">Built with React, Tailwind & Framer Motion</p>
    </footer>
  );
};

export default Footer;
