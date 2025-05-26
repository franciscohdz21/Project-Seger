import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideNav() {
  const base   = 'block px-4 py-2 hover:bg-gray-200';
  const active = 'bg-blue-600 text-white';

  return (
    <nav className="w-48 border-r h-screen space-y-1">
      <NavLink to="/dashboard"    className={({isActive}) => isActive ? `${base} ${active}` : base}>Dashboard</NavLink>
      <NavLink to="/customers"    className={({isActive}) => isActive ? `${base} ${active}` : base}>Customers</NavLink>
      <NavLink to="/appointments" className={({isActive}) => isActive ? `${base} ${active}` : base}>Appointments</NavLink>
      <NavLink to="/payments"     className={({isActive}) => isActive ? `${base} ${active}` : base}>Payments</NavLink>
    </nav>
  );
}

