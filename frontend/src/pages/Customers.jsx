import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/customers').then(res => setCustomers(res.data));
  }, []);

  const filtered = customers.filter(c =>
    c.email.toLowerCase().includes(filter.toLowerCase()) ||
    c.cellPhone.includes(filter)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <input
        type="text"
        placeholder="Filter by email or phone"
        className="border p-2 mb-4 w-full"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td className="border p-2">{c.firstName} {c.lastName}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.cellPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
