import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', variant = 'primary', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wider rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-accent-white text-bg-primary hover:shadow-glow hover:scale-105 focus:ring-accent-white',
    secondary: 'border border-border-light text-text-secondary bg-transparent hover:bg-accent-white/5 hover:border-accent-white/30 hover:text-accent-white focus:ring-border-light',
    danger: 'border border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10 hover:border-red-500/50 focus:ring-red-500',
    ghost: 'text-text-secondary hover:text-accent-white focus:ring-transparent',
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
