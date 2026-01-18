import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

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
      {/* Hero Section */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Bienvenido a <span className="text-gold-medium">Vidrieria Valladares</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Calidad y elegancia en cada corte.
          </p>
          <div className="mt-8">
            <Link to="/products">
              <Button>Ver Nuestro Catálogo</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sobre Nosotros</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            En Vidrieria Valladares, nos dedicamos a transformar espacios con soluciones de vidrio innovadoras y de alta calidad. Desde ventanas y puertas hasta espejos y decoraciones personalizadas, nuestro equipo de expertos está comprometido con la excelencia y la satisfacción del cliente.
          </p>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-3">No hay productos destacados en este momento.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;