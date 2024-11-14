import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import LOGO from '../assets/'

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col mx-auto py-2 ">
      <nav className="flex justify-between items-center py-4 pl-5 fixed w-full z-10 top-0 ">
        {/* Brand Logo */}
        <div className="text-2xl text-blue-500 font-bold hover:text-green-500 py-5">
          <Link to="/">DUT</Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button 
            className="focus:outline-none" 
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`fixed inset-0 pr-20 bg-white md:flex md:static md:bg-transparent md:flex-row md:space-x-4 transition-transform transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:translate-y-0`}>
          <li className=''>
            <Link 
              to="/" 
              className={`font-medium hover:text-green-500 ${location.pathname === '/' ? 'text-green-500' : 'text-blue-500'} block md:inline p-4`}
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              Home
            </Link>
          </li>
          <li className=''>
            <Link 
              to="/registerpage" 
              className={`font-medium hover:text-green-500 ${location.pathname === '/registerpage' ? 'text-green-500' : 'text-blue-500'} block md:inline p-4`}
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              Register
            </Link>
          </li>
          {/* <li>
            <Link 
              to="/employeespage" 
              className={`font-medium hover:text-green-500 ${location.pathname === '/employeespage' ? 'text-green-500' : 'text-blue-500'} block md:inline p-4`}
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              Employees
            </Link>
          </li> */}
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="mt-16">
        {/* Add your main content here */}
      </div>
    </div>
  );
}
