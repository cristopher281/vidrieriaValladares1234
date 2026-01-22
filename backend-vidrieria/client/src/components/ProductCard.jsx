import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, image_url, category } = product;

  return (
    <div className="group card-premium overflow-hidden">
      {/* Image Container */}
      <Link to={`/products/${id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'}
          alt={name}
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        {category && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium tracking-wider uppercase bg-bg-primary/80 backdrop-blur-sm text-text-secondary border border-border-subtle rounded-full">
            {category}
          </span>
        )}

        {/* View Icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-12 h-12 rounded-full bg-accent-white/10 backdrop-blur-sm flex items-center justify-center border border-accent-white/20">
            <svg className="w-5 h-5 text-accent-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-display font-medium text-accent-white truncate">
          {name}
        </h3>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-xs text-text-muted uppercase tracking-wider">Desde</span>
            <p className="text-2xl font-light text-accent-white">
              <span className="text-sm text-text-secondary">$</span>
              {price ? price.toLocaleString('en-US', { minimumFractionDigits: 0 }) : '0'}
            </p>
          </div>

          <Link
            to={`/products/${id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-accent-white transition-colors duration-300 group/btn"
          >
            <span>Ver más</span>
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
