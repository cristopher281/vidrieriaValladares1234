import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Header */}
        <thead>
          <tr className="border-b border-border-subtle">
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider uppercase text-text-muted">
              Imagen
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider uppercase text-text-muted">
              Nombre
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider uppercase text-text-muted">
              Precio
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider uppercase text-text-muted">
              Categoría
            </th>
            <th className="px-6 py-4 text-center text-xs font-medium tracking-wider uppercase text-text-muted">
              Acciones
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-border-subtle">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-bg-tertiary/50 transition-colors duration-200">
              {/* Image */}
              <td className="px-6 py-4">
                <div className="h-12 w-12 rounded-lg overflow-hidden border border-border-subtle bg-bg-tertiary">
                  {product.image_url ? (
                    <img
                      src={product.image_url.startsWith('http') ? product.image_url : `http://localhost:3000${product.image_url}`}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-text-muted text-xs">
                      N/A
                    </div>
                  )}
                </div>
              </td>

              {/* Name */}
              <td className="px-6 py-4">
                <span className="font-medium text-accent-white">{product.name}</span>
              </td>

              {/* Price */}
              <td className="px-6 py-4">
                <span className="font-mono text-accent-ice">
                  ${product.price?.toFixed(2) || '0.00'}
                </span>
              </td>

              {/* Category */}
              <td className="px-6 py-4">
                <span className="inline-flex px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-accent-ice/10 text-accent-ice border border-accent-ice/20">
                  {product.category || 'Sin categoría'}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="px-4 py-2 text-xs font-medium tracking-wider rounded-full border border-border-subtle text-text-secondary hover:text-accent-white hover:border-border-light transition-all duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="px-4 py-2 text-xs font-medium tracking-wider rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {/* Empty State */}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center mb-4 border border-border-subtle">
                    <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-text-secondary">No hay productos registrados</p>
                  <p className="text-sm text-text-muted mt-1">Crea tu primer producto para comenzar</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
