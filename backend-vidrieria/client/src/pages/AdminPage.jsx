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
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData, token);
    } else {
      await createProduct(formData, token);
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
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
        <div>
          <Button onClick={handleCreate} className="mr-4">
            Crear Producto
          </Button>
          <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-70h00">
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />

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
  );
};

export default AdminPage;