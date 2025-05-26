import React from 'react';
import clsx from 'clsx';

export default function Button({ children, variant = 'primary', ...rest }) {
  const base = 'btn transition-transform duration-200 hover:scale-105';
  const map  = {
    primary : 'bg-brand-500 hover:bg-brand-600 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
    danger  : 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <button className={clsx(base, map[variant])} {...rest}>
      {children}
    </button>
  );
}
