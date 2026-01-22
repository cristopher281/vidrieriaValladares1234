import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const services = [
    {
      title: 'Ventanas',
      description: 'Sistemas de ventanas en aluminio y vidrio templado de alta eficiencia.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 6v14h16V6M4 6l8-4 8 4M12 6v14" />
        </svg>
      )
    },
    {
      title: 'Puertas',
      description: 'Puertas de cristal templado y aluminio con cerraduras de seguridad.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Espejos',
      description: 'Espejos decorativos y funcionales cortados a medida exacta.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Decoración',
      description: 'Acabados en vidrio para interiores y exteriores con diseño premium.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-bg-primary">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-ice/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-ice/3 rounded-full blur-[120px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          {/* Tagline */}
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-text-secondary mb-6">
            Expertos en Cristal Premium
          </p>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-accent-white leading-[0.9] tracking-tight">
            Vidriería
            <br />
            <span className="text-gradient">Valladares</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg md:text-xl text-text-secondary font-light max-w-2xl mx-auto leading-relaxed">
            Transformamos tus espacios con soluciones de vidrio y aluminio
            de la más alta calidad. Elegancia que perdura.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Explorar Catálogo
            </Link>
            <a
              href="https://wa.me/50483574654"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Solicitar Cotización
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 border border-border-light rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-text-secondary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 lg:py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-text-muted mb-4">
              Nuestros Servicios
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-accent-white">
              Soluciones integrales en vidrio
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-border-subtle bg-bg-tertiary/50 hover:border-border-light hover:bg-bg-tertiary transition-all duration-500"
              >
                <div className="text-accent-ice/70 group-hover:text-accent-ice transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="mt-6 text-lg font-display font-medium text-accent-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-text-muted mb-4">
                Sobre Nosotros
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-accent-white leading-tight">
                Más de una década creando espacios excepcionales
              </h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                En Vidriería Valladares combinamos artesanía tradicional con tecnología moderna
                para ofrecer soluciones en vidrio que superan expectativas. Cada proyecto es
                una oportunidad de demostrar nuestro compromiso con la excelencia.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-display font-medium text-accent-white">10+</p>
                  <p className="text-sm text-text-muted mt-1">Años de experiencia</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-medium text-accent-white">500+</p>
                  <p className="text-sm text-text-muted mt-1">Proyectos completados</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-medium text-accent-white">100%</p>
                  <p className="text-sm text-text-muted mt-1">Satisfacción</p>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border-subtle overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent-ice/5 flex items-center justify-center border border-border-subtle">
                      <svg className="w-12 h-12 text-accent-ice/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-2xl font-display text-accent-white">Calidad Premium</p>
                    <p className="text-sm text-text-muted mt-2">En cada detalle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 lg:py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-text-muted mb-4">
                Productos Destacados
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-accent-white">
                Lo mejor de nuestro catálogo
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-white transition-colors duration-300 group"
            >
              <span>Ver todo el catálogo</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-2 border-border-light border-t-accent-ice rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-text-secondary">No hay productos disponibles aún.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-medium text-accent-white leading-tight">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Contáctanos hoy y recibe una cotización personalizada sin compromiso.
            Nuestro equipo está listo para ayudarte.
          </p>
          <div className="mt-10">
            <a
              href="https://wa.me/50483574654"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 btn-primary text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.471-.149-.67.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;