import React from 'react';
import Button from '../Button';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-slate-300">
        <thead className="glass-panel text-xs uppercase font-medium text-cyan-ice tracking-wider border-none">
          <tr>
            <th className="px-6 py-4 bg-white/5 border-b border-white/10 rounded-tl-xl text-center">Imagen</th>
            <th className="px-6 py-4 bg-white/5 border-b border-white/10">Nombre</th>
            <th className="px-6 py-4 bg-white/5 border-b border-white/10">Precio</th>
            <th className="px-6 py-4 bg-white/5 border-b border-white/10">Categoría</th>
            <th className="px-6 py-4 bg-white/5 border-b border-white/10 rounded-tr-xl text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 text-center">
                <div className="h-12 w-12 rounded-lg overflow-hidden border border-white/10 mx-auto">
                  {product.image_url ? (
                    <img src={`http://localhost:3000${product.image_url}`} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-slate-800 flex items-center justify-center text-xs">N/A</div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-white">{product.name}</td>
              <td className="px-6 py-4 font-mono text-cyan-200">L. {product.price.toFixed(2)}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900/50 text-cyan-200 border border-cyan-700/50">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <Button onClick={() => onEdit(product)} variant="secondary" className="!px-3 !py-1 text-xs">
                    Editar
                  </Button>
                  <Button onClick={() => onDelete(product.id)} variant="danger" className="!px-3 !py-1 text-xs">
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-slate-500 italic">
                No hay productos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
