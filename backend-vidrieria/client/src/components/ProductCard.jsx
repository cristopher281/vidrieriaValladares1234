import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, image_url } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300">
      <Link to={`/products/${id}`}>
        <img className="w-full h-56 object-cover" src={image_url || 'https://via.placeholder.com/400x300'} alt={name} />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-xl font-bold text-gold-dark mt-2">${price ? price.toFixed(2) : '0.00'}</p>
        <div className="mt-4">
          <Link
            to={`/products/${id}`}
            className="w-full text-center bg-gray-800 text-white py-2 rounded-md hover:bg-gold-medium transition duration-300"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
