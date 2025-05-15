import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TimeSlot({ time, appointments }) {
  const appt = appointments.find(a => a.time === time);
  return (
    <div className="border p-2 h-12">
      {appt ? `${appt.treatment} - ${appt.customerId}` : ''}
    </div>
  );
}

export default function Appointments() {
  const [tab, setTab] = useState('cabin1');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/appointments/${tab}`)
      .then(res => setAppointments(res.data));
  }, [tab]);

  const timeSlots = Array.from({ length: 26 }, (_, i) => {
    const h = Math.floor(i / 2) + 8;
    const m = i % 2 === 0 ? '00' : '30';
    return `${h}:${m}`;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <div className="mb-4 space-x-2">
        <button onClick={() => setTab('cabin1')} className={`px-4 py-2 ${tab === 'cabin1' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Cabin 1
        </button>
        <button onClick={() => setTab('cabin2')} className={`px-4 py-2 ${tab === 'cabin2' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Cabin 2
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {timeSlots.map(time => (
          <TimeSlot key={time} time={time} appointments={appointments} />
        ))}
      </div>
    </div>
  );
}
