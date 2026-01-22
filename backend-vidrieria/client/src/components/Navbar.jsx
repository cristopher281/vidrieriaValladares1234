import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glass navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'INICIO', path: '/' },
    { name: 'CATÁLOGO', path: '/productos' },
    { name: 'ADMIN', path: '/admin', protected: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`mx-auto max-w-7xl px-6 transition-all duration-300 ${scrolled ? 'glass-panel rounded-full' : ''}`}>
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="relative group">
              <span className="text-2xl font-bold font-display tracking-[0.2em] text-white group-hover:text-cyan-ice transition-colors duration-300">
                VIDRIERÍA VALLADARES
              </span>
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent group-hover:w-full transition-all duration-500"></div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 group ${isActive(link.path) ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute inset-0 bg-white/5 rounded-lg -z-10 blur-sm"></span>
                  )}
                  <span className={`absolute bottom-0 left-1/2 w-0 h-px bg-cyan-400 transform -translate-x-1/2 transition-all duration-300 ${isActive(link.path) ? 'w-1/2' : 'group-hover:w-full'}`}></span>
                </Link>
              </React.Fragment>
            ))}

            {/* CTA Button Example (if needed) */}
            <Link to="/productos" className="hidden lg:inline-block glass-btn text-sm text-cyan-ice border-cyan-500/30 hover:bg-cyan-500/20">
              Solicitar Cotización
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors duration-300 focus:outline-none"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="glass-panel rounded-2xl p-4 space-y-2">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-center font-medium tracking-wide transition-all duration-300 ${isActive(link.path)
                    ? 'bg-cyan-500/20 text-cyan-ice shadow-neon border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
