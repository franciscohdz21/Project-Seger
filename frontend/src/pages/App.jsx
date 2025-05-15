import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Customers from './Customers';
import Payments from './Payments';
import Appointments from './Appointments';
import Settings from './Settings';

export default function App() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <h1 className="text-xl font-bold mb-6">Project Seger</h1>
        <nav className="space-y-3">
          <Link to="/" className="block hover:underline">Dashboard</Link>
          <Link to="/customers" className="block hover:underline">Customers</Link>
          <Link to="/payments" className="block hover:underline">Payments</Link>
          <Link to="/appointments" className="block hover:underline">Appointments</Link>
          <Link to="/settings" className="block hover:underline text-gray-400 cursor-not-allowed" onClick={e => e.preventDefault()}>
            Settings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
