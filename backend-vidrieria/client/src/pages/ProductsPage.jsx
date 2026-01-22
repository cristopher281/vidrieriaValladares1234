import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['Ventanas', 'Puertas', 'Espejos', 'Decoración'];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-text-muted mb-4">
            Nuestra Colección
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-accent-white">
            Catálogo
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
            Explora nuestra selección de productos premium en vidrio y aluminio
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2.5 text-sm font-medium tracking-wider rounded-full border transition-all duration-300 ${selectedCategory === 'All'
                  ? 'bg-accent-white text-bg-primary border-accent-white'
                  : 'bg-transparent text-text-secondary border-border-subtle hover:border-border-light hover:text-accent-white'
                }`}
            >
              Todos
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 text-sm font-medium tracking-wider rounded-full border transition-all duration-300 ${selectedCategory === category
                    ? 'bg-accent-white text-bg-primary border-accent-white'
                    : 'bg-transparent text-text-secondary border-border-subtle hover:border-border-light hover:text-accent-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-2 border-border-light border-t-accent-ice rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {/* Products Count */}
              <p className="text-sm text-text-muted mb-8">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center border border-border-subtle">
                <svg className="w-10 h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-accent-white mb-2">
                No hay productos en esta categoría
              </h3>
              <p className="text-text-secondary">
                Prueba seleccionando otra categoría o vuelve más tarde.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-6 btn-secondary"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-medium text-accent-white">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mt-4 text-text-secondary">
            Contáctanos y te ayudamos a encontrar la solución perfecta para tu proyecto.
          </p>
          <a
            href="https://wa.me/50483574654"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 btn-primary"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;