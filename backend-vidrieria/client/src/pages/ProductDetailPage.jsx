import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Detalle del Producto</h1>
      <p>Mostrando detalles para el producto con ID: {id}</p>
      {/* Product details will be fetched and displayed here */}
    </div>
  );
};

export default ProductDetailPage;
