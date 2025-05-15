import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Weather</h3>
          <p>Querétaro: 24°C, partly cloudy</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Latest News</h3>
          <ul className="list-disc pl-5">
            <li>Project Seger v1.0 launched 🎉</li>
            <li>Appointments module now supports 2 cabins</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
