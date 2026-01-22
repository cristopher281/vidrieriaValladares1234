import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex flex-col">
              <span className="text-2xl font-display font-medium text-accent-white tracking-tight">
                Vidriería
              </span>
              <span className="text-sm font-sans text-text-secondary tracking-[0.3em] uppercase -mt-1">
                Valladares
              </span>
            </div>
            <p className="mt-6 text-text-secondary font-light leading-relaxed max-w-md">
              Más de una década transformando espacios con soluciones premium en vidrio y aluminio.
              Calidad, elegancia y compromiso en cada proyecto.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm text-text-muted mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-text-secondary hover:text-accent-white transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-text-secondary hover:text-accent-white transition-colors duration-300">
                  Catálogo
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/50483574654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-white transition-colors duration-300"
                >
                  Cotización
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm text-text-muted mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/50483574654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-white transition-colors duration-300 group"
                >
                  <svg className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.471-.149-.67.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>+504 8357-4654</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © {currentYear} Vidriería Valladares. Todos los derechos reservados.
          </p>
          <p className="text-xs text-text-muted">
            Honduras 🇭🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
