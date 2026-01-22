import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', variant = 'primary', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';

  const variants = {
    primary: 'border border-transparent text-white bg-cyan-600 hover:bg-cyan-500 hover:shadow-neon focus:ring-cyan-500',
    secondary: 'border border-white/20 text-slate-200 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 hover:text-white backdrop-blur-sm focus:ring-slate-500',
    danger: 'border border-transparent text-white bg-red-600/80 hover:bg-red-500 hover:shadow-lg focus:ring-red-500',
    glass: 'glass-btn text-cyan-ice hover:text-white',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
