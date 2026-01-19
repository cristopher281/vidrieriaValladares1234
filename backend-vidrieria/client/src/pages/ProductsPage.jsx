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
      const allProducts = await getProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display font-bold text-white tracking-wider drop-shadow-lg mb-4 text-glow">
          CATÁLOGO
        </h1>
        <p className="text-xl text-slate-300 font-light font-sans tracking-wide">
          Explora nuestra colección de cristal premium
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-6 py-2.5 rounded-full font-medium tracking-wider transition-all duration-300 border ${selectedCategory === 'All'
              ? 'bg-cyan-ice text-slate-900 border-cyan-ice shadow-neon scale-105'
              : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/30'
            }`}
        >
          TODOS
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full font-medium tracking-wider transition-all duration-300 border ${selectedCategory === category
                ? 'bg-cyan-ice text-slate-900 border-cyan-ice shadow-neon scale-105'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/30'
              }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-ice"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 glass-panel rounded-2xl">
              <p className="text-2xl text-slate-300 font-light">
                No se encontraron productos en esta categoría.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;