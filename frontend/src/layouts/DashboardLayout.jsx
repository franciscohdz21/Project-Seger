import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav   from '../components/SideNav';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/*  Left sidebar  */}
      <SideNav />

      {/*  Main area  */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />   {/* renders the matched page  */}
      </main>
    </div>
  );
}
