import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav   from '../components/SideNav';

/**
 * DashboardLayout
 * ───────────────
 * • full-height flex row
 * • left: SideNav
 * • right: main panel on a light “base-200” background
 *   (defined in tailwind.config.js)
 * • adds vertical spacing between stacked pages (space-y-6)
 */
export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-base-200 text-gray-800">
      {/*  ▸ Left sidebar  */}
      <SideNav />

      {/*  ▸ Main content area  */}
      <main className="flex-1 p-6 space-y-6">
        {/* Each routed page will render here */}
        <Outlet />
      </main>
    </div>
  );
}
