import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideNav() {
  const link   = 'block px-4 py-2 rounded-r-lg transition-colors';
  const active = 'bg-brand-500 text-white shadow-card';

  return (
    <nav className="w-56 bg-base-100 shadow-card flex flex-col gap-1 p-3">
      <NavLink to="/dashboard"
               className={({isActive}) => isActive ? `${link} ${active}` : `${link} hover:bg-brand-50`}>
        Dashboard
      </NavLink>

      <NavLink to="/customers"
               className={({isActive}) => isActive ? `${link} ${active}` : `${link} hover:bg-brand-50`}>
        Customers
      </NavLink>

      <NavLink to="/appointments"
               className={({isActive}) => isActive ? `${link} ${active}` : `${link} hover:bg-brand-50`}>
        Appointments
      </NavLink>

      <NavLink to="/payments"
               className={({isActive}) => isActive ? `${link} ${active}` : `${link} hover:bg-brand-50`}>
        Payments
      </NavLink>
    </nav>
  );
}
