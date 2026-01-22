import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      // Take the first 3 products as featured
      setFeaturedProducts(products.slice(0, 3));
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Glass Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-slate-400 tracking-tight drop-shadow-2xl mb-8 leading-tight">
            VIDRIERÍA <br /> VALLADARES
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Transformamos la luz en elegancia. Soluciones en vidrio y aluminio con acabados de primera clase.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/products" className="glass-btn bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-ice border-cyan-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              VER CATÁLOGO
            </Link>
            <Link to="/products?category=espejos" className="glass-btn text-slate-300 hover:text-white">
              ESPEJOS A MEDIDA
            </Link>
          </div>
        </div>
      </div>

      {/* About Us Section (Glass Panel) */}
      <div className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="glass-panel p-12 rounded-3xl md:mx-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold text-white mb-6 tracking-wide">SOBRE NOSOTROS</h2>
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                En Vidriería Valladares, fusionamos artesanía tradicional con diseño moderno. Nos dedicamos a crear espacios luminosos y sofisticados mediante soluciones personalizadas en vidrio y aluminio. Desde ventanas panorámicas hasta acabados arquitectónicos, nuestro compromiso es la perfección y la satisfacción de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-24 pb-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-16 text-glow">
            DESTACADOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <p className="text-slate-400 text-lg mt-4">Cargando destacados...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;