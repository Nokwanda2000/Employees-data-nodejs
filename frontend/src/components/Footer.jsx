import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10 ">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:text-green-400">About Us</a>
          <a href="#" className="hover:text-green-400">Services</a>
          <a href="#" className="hover:text-green-400">Contact</a>
          <a href="#" className="hover:text-green-400">Privacy Policy</a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Employeesportal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
