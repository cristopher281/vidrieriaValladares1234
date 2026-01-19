import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b-0 rounded-b-xl mx-auto px-6 py-3 max-w-7xl inset-x-0 mt-4">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="text-2xl font-display font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          <Link to="/">VIDRIERÍA VALLADARES</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium tracking-wider">
          <Link to="/" className="text-slate-200 hover:text-cyan-ice transition-colors duration-300">
            INICIO
          </Link>
          <Link to="/products" className="text-slate-200 hover:text-cyan-ice transition-colors duration-300">
            CATÁLOGO
          </Link>
          <Link to="/admin" className="px-5 py-2 glass-card rounded-full text-white hover:bg-white/10 transition-all duration-300">
            ADMIN
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-200 hover:text-cyan-ice focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 font-sans text-center bg-slate-900/90 rounded-xl p-4 border border-white/10 backdrop-blur-md">
          <Link to="/" className="block text-slate-200 hover:text-cyan-ice" onClick={() => setIsOpen(false)}>
            INICIO
          </Link>
          <Link to="/products" className="block text-slate-200 hover:text-cyan-ice" onClick={() => setIsOpen(false)}>
            CATÁLOGO
          </Link>
          <Link to="/admin" className="block text-slate-200 hover:text-cyan-ice" onClick={() => setIsOpen(false)}>
            ADMIN
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
