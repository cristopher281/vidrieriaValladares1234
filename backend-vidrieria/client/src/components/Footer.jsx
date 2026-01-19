import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 backdrop-blur-md bg-slate-900/80 border-t border-white/10 relative z-40">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-2xl font-display font-bold text-white tracking-widest drop-shadow-md">
              VIDRIERÍA VALLADARES
            </h3>
            <p className="max-w-md mt-4 text-slate-400 font-light">
              Creando soluciones en vidrio con calidad inigualable y estilo atemporal.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-ice hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-neon transition-all duration-300 group">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-slate-500 font-light tracking-wide text-sm">
            &copy; {new Date().getFullYear()} Vidriería Valladares. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Designed with <span className="text-cyan-900">Glassmorphism</span> Luxury Style
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
