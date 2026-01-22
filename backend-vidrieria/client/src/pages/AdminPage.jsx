import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, signOut } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ProductTable from '../components/admin/ProductTable';
import ProductForm from '../components/admin/ProductForm';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      await deleteProduct(id, token);
      fetchProducts();
    }
  };

  const handleSubmit = async (formData) => {
    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, formData, token);
    } else {
      result = await createProduct(formData, token);
    }

    if (result.error) {
      alert('Error al guardar el producto: ' + (result.error.message || result.error));
      console.error('Error in save:', result.error);
      return;
    }

    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 p-8 bg-bg-secondary rounded-2xl border border-border-subtle">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-display font-medium text-accent-white">
                Panel de Administración
              </h1>
              <p className="mt-2 text-text-secondary">
                Gestiona el inventario de productos
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Producto
              </button>
              <button
                onClick={handleSignOut}
                className="px-6 py-3 text-sm font-medium tracking-wider rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-bg-secondary rounded-2xl border border-border-subtle overflow-hidden">
          <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;