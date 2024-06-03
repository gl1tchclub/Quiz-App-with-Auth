import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-pink-300 text-pink-500 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">Mintep1 Quiz App</h1>
            <p className="mt-2">© 2024 Mintep1 Quiz App. All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/" className="text-pink-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Return Home</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;