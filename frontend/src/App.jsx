import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from "./layouts/DashboardLayout";

// pages
import Dashboard        from './pages/Dashboard';
import Customers        from './pages/Customers';
import Appointments from './pages/Appointments';
import Payments         from './pages/Payments';

export default function App() {
  return (
    <Routes>
      {/* layout wrapper */}
      <Route element={<DashboardLayout />}>
        <Route path="/"            element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/customers"   element={<Customers />} />
        <Route path="/appointments"element={<Appointments />} />
        <Route path="/payments"    element={<Payments />} />
      </Route>

      {/* fallback 404 outside layout */}
      <Route path="*" element={<h1 className="p-6 text-2xl">404 – Page not found</h1>} />
    </Routes>
  );
}
