import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description || '',
      });
      setImageFile(null);
      setPreviewUrl(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (imageFile) {
      data.append('image', imageFile);
    }
    onSubmit(data);
  };

  const inputStyles = "w-full px-4 py-3 bg-bg-tertiary border border-border-subtle rounded-xl text-accent-white placeholder-text-muted focus:outline-none focus:border-accent-ice/50 focus:ring-1 focus:ring-accent-ice/20 transition-all duration-300";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-primary/90 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-bg-secondary border border-border-subtle rounded-2xl shadow-elevated overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
          <h2 className="text-xl font-display font-medium text-accent-white">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-accent-white hover:bg-bg-tertiary transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left Column: Image Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-secondary">
                Imagen del Producto
              </label>
              <div className="relative group cursor-pointer border-2 border-dashed border-border-subtle rounded-2xl h-64 flex flex-col items-center justify-center bg-bg-tertiary/50 hover:border-accent-ice/30 hover:bg-bg-tertiary transition-all duration-300">
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />

                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-cover rounded-xl" />
                ) : product?.image_url ? (
                  <img
                    src={product.image_url.startsWith('http') ? product.image_url : `http://localhost:3000${product.image_url}`}
                    alt="Current"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-bg-secondary flex items-center justify-center border border-border-subtle">
                      <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-text-secondary text-sm">Click para subir imagen</p>
                    <p className="text-text-muted text-xs mt-1">PNG, JPG hasta 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyles}
                  placeholder="Ej: Espejo Led"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="price">
                  Precio ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={inputStyles}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="category">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Ventanas">Ventanas</option>
                  <option value="Puertas">Puertas</option>
                  <option value="Espejos">Espejos</option>
                  <option value="Decoración">Decoración</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={inputStyles}
              rows="3"
              placeholder="Describe el producto..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-sm font-medium tracking-wider rounded-full border border-border-subtle text-text-secondary hover:text-accent-white hover:border-border-light transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {product ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
