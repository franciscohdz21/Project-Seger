import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/payments').then(res => setPayments(res.data));
  }, []);

  const filtered = payments.filter(p =>
    p.method.toLowerCase().includes(filter.toLowerCase()) ||
    p.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      <input
        type="text"
        placeholder="Filter by method or status"
        className="border p-2 mb-4 w-full"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Method</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Total Paid</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.method}</td>
              <td className="border p-2">{p.status}</td>
              <td className="border p-2">${p.totalPaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
