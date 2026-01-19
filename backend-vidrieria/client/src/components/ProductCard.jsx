import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, image_url } = product;

  return (
    <div className="glass-card rounded-2xl overflow-hidden group">
      <Link to={`/products/${id}`} className="block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
          src={image_url || 'https://via.placeholder.com/400x300'}
          alt={name}
        />
      </Link>
      <div className="p-5 relative">
        <h3 className="text-lg font-display font-semibold text-slate-100 truncate tracking-wide">{name}</h3>
        <p className="text-2xl font-sans font-light text-cyan-ice mt-1 drop-shadow-md">
          ${price ? price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
        </p>
        <div className="mt-4">
          <Link
            to={`/products/${id}`}
            className="block w-full text-center py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium tracking-wider hover:bg-cyan-500/80 hover:border-cyan-400 hover:shadow-neon transition-all duration-300"
          >
            VER DETALLES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
