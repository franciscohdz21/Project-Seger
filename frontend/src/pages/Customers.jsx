import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = {
  firstName: '',
  lastName: '',
  cellPhone: '',
  email: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  country: '',
  healthNotes: ''
};

export default function Customers() {
  const [form, setForm] = useState(initialForm);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:3000/customers?q=' + query);
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, [query]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:3000/customers/${editing.id}`, form);
        setMessage('Customer updated successfully.');
      } else {
        await axios.post('http://localhost:3000/customers', form);
        setMessage('Customer added successfully.');
      }
      setError(null);
      setEditing(null);
      setForm(initialForm);
      fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.details || 'Unknown error.');
      setMessage(null);
    }
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
  };

  const handleEdit = customer => {
    setEditing(customer);
    setForm({ ...customer, dateOfBirth: customer.dateOfBirth.split('T')[0] });
  };

  const handleDelete = async () => {
    try {
      console.log("Attempting to delete customer ID:", confirmDelete);
      const res = await axios.delete(`http://localhost:3000/customers/${confirmDelete}`);
      console.log("Delete response:", res.data);
      setConfirmDelete(null);
      fetchCustomers();
      setMessage("Customer deleted successfully.");
      setError(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError(
        err.response?.data?.details ||
        err.response?.data?.error ||
        err.message ||
        "Delete failed: unknown error."
      );
      setMessage(null);
    }
  };

  return (
    <div className="flex gap-6">
      <form className="w-1/3 space-y-3 bg-white p-4 shadow rounded" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold">{editing ? 'Edit' : 'Add'} Customer</h2>
        {['firstName','lastName','cellPhone','email','dateOfBirth','street','city','state','country','healthNotes'].map(field => (
          <input
            key={field}
            type={field === 'dateOfBirth' ? 'date' : 'text'}
            name={field}
            placeholder={field}
            value={form[field] || ''}
            onChange={handleChange}
            required={!['street','healthNotes'].includes(field)}
            className="w-full border p-2 rounded"
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {editing ? 'Update' : 'Add'} Customer
        </button>
      </form>

      <div className="w-2/3">
        <input
          type="text"
          placeholder="Filter by email or phone"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.firstName} {c.lastName}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.cellPhone}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(c)} className="text-blue-600">Edit</button>
                  <button onClick={() => setConfirmDelete(c.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow">
            <p>Are you sure you want to delete this customer?</p>
            <div className="mt-4 space-x-4">
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
              <button onClick={() => setConfirmDelete(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {(message || error) && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg text-white z-50 ${
          message ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {message || `Error: ${error}`}
        </div>
      )}
    </div>
  );
}
