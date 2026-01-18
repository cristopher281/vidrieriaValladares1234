import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-gold-medium">Vidrieria Valladares</h3>
            <p className="max-w-md mt-2">Creando soluciones en vidrio con calidad y estilo.</p>
          </div>
          <div className="flex mt-4 md:mt-0">
            {/* Social media links can be added here */}
            <a href="#" className="mx-2 text-gray-400 hover:text-gold-light">
              {/* Replace with actual social media icons */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* Example Icon (Facebook) */}
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Vidrieria Valladares. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
