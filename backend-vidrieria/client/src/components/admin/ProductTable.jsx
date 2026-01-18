import React from 'react';
import Button from '../Button';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Imagen</th>
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Precio</th>
            <th className="py-3 px-6 text-left">Categoría</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-4 px-6">
                <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="py-4 px-6 font-semibold">{product.name}</td>
              <td className="py-4 px-6">${product.price.toFixed(2)}</td>
              <td className="py-4 px-6">{product.category}</td>
              <td className="py-4 px-6 text-center">
                <Button onClick={() => onEdit(product)} className="mr-2">
                  Editar
                </Button>
                <Button onClick={() => onDelete(product.id)} className="bg-red-600 hover:bg-red-700">
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
