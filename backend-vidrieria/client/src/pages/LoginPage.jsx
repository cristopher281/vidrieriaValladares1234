import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-bg-secondary rounded-2xl border border-border-subtle p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-medium text-accent-white">
              Iniciar Sesión
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Accede al panel de administración
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="email">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-bg-tertiary border border-border-subtle rounded-xl text-accent-white placeholder-text-muted focus:outline-none focus:border-accent-ice/50 focus:ring-1 focus:ring-accent-ice/20 transition-all duration-300"
                placeholder="admin@ejemplo.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-bg-tertiary border border-border-subtle rounded-xl text-accent-white placeholder-text-muted focus:outline-none focus:border-accent-ice/50 focus:ring-1 focus:ring-accent-ice/20 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
                  <span>Iniciando...</span>
                </>
              ) : (
                <span>Iniciar Sesión</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-text-muted">
          © {new Date().getFullYear()} Vidriería Valladares
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
