import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/pexels-olly-840996.jpg';

const Landingpage = () => {
  return (
    <div>
      <div
        className="flex flex-col justify-center items-center h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${Image})`,
        }}
      >
        <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl sm:text-3xl font-bold text-green-600 mb-6">
            Welcome to Our Employee Management Portal
          </h1>

          <Link to="/registerpage">
            <button
              className="text-white px-6 py-3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Landingpage;
