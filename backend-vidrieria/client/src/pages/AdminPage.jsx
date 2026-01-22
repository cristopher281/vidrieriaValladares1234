import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, signOut } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ProductTable from '../components/admin/ProductTable';
import ProductForm from '../components/admin/ProductForm';
import Button from '../components/Button';
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
    <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Panel de Administración</h1>
            <p className="text-slate-400">Gestiona tu inventario con elegancia.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleCreate} variant="primary">
              + Nuevo Producto
            </Button>
            <Button onClick={handleSignOut} variant="danger">
              Cerrar Sesión
            </Button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden p-6">
          <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

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