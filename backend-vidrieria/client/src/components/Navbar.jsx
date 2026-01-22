import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/products' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? 'py-4 bg-bg-primary/95 backdrop-blur-lg border-b border-border-subtle'
        : 'py-6 bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-display font-medium text-accent-white tracking-tight">
                Vidriería
              </span>
              <span className="text-xs lg:text-sm font-sans text-text-secondary tracking-[0.3em] uppercase -mt-1">
                Valladares
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${isActive(link.path)
                    ? 'text-accent-white bg-accent-white/5'
                    : 'text-text-secondary hover:text-accent-white'
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-ice rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/50483574654"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Cotizar Ahora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-accent-white transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-px' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-px' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-80 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 space-y-1 border-t border-border-subtle">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-base font-medium tracking-wide transition-all duration-300 rounded-xl ${isActive(link.path)
                    ? 'text-accent-white bg-accent-white/5'
                    : 'text-text-secondary hover:text-accent-white hover:bg-accent-white/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/50483574654"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-center btn-primary text-sm"
            >
              Cotizar Ahora
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
