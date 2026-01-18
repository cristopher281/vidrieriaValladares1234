import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gold-medium">
            <Link to="/">Vidrieria Valladares</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-gold-light transition duration-300">
              Inicio
            </Link>
            <Link to="/products" className="text-gray-300 hover:text-gold-light transition duration-300">
              Productos
            </Link>
            <Link to="/admin" className="text-gray-300 hover:text-gold-light transition duration-300">
              Admin
            </Link>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button will be added later */}
            <button className="text-gray-300 hover:text-gold-light focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
