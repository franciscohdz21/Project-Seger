import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

/* ──────────────  30-min slots, 08:00 → 21:00  ────────────── */
const timeSlots = Array.from({ length: 26 }, (_, i) => {
  const hour   = 8 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

export default function Appointments() {
  /* ───── state ───── */
  const [date,        setDate]   = useState(dayjs().format('YYYY-MM-DD'));
  const [appointments,setAppt]   = useState([]);
  const [activeCabin, setCabin]  = useState('1');           // keep if you need Cabin 1/2

  /* ───── fetch appointments (by cabin) ───── */
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/appointments/${activeCabin}`);
      setAppt(res.data);
    } catch (err) { console.error(err); }
  };
  useEffect(() => { fetchAppointments(); }, [date, activeCabin]);

  /* find any appointment at a specific time slot for that date */
  const findBySlot = (slot) =>
    appointments.find(a => a.date.split('T')[0] === date && a.time === slot);

  /* ──────────────  UI  ────────────── */
  return (
    <div className="p-6 space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        {/* title + (optional) cabin tabs */}
        <div className="flex items-center space-x-4">
          <h2 className="font-semibold text-lg">
            Appointments for {dayjs(date).format('D MMMM YYYY')}
          </h2>

          {/* keep tabs if you still use two cabins */}
          <div className="space-x-2">
            {['1','2'].map(c => (
              <button
                key={c}
                onClick={() => setCabin(c)}
                className={`px-4 py-1 rounded ${
                  activeCabin === c ? 'bg-blue-600 text-white'
                                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                Cabin&nbsp;{c}
              </button>
            ))}
          </div>
        </div>

        {/* Change date + Edit / Delete buttons */}
        <div className="flex space-x-2">
          {/* “Change date” -- native calendar behind a styled button */}
        <DatePicker
          selected={dayjs(date).toDate()}
          onChange={(d) => setDate(dayjs(d).format('YYYY-MM-DD'))}
          popperPlacement="bottom-start"
          dateFormat="dd-MM-yyyy"          /* shows day-month-year in picker */
          customInput={
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Change&nbsp;date
            </button>
          }
        />

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Appointment
          </button>
          <button className="bg-red-600  text-white px-4 py-2 rounded hover:bg-red-700">
            Delete Appointment
          </button>
        </div>
      </div>

      {/* Spreadsheet-style table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-blue-200 text-left">
              <th className="border px-2 py-1 w-20">Time</th>
              <th className="border px-2 py-1">First Name</th>
              <th className="border px-2 py-1">Last Name</th>
              <th className="border px-2 py-1">Cellphone</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1 w-16">Total</th>
              <th className="border px-2 py-1">Package</th>
              <th className="border px-2 py-1 w-24">Session #</th>
              <th className="border px-2 py-1">Treatment</th>
              <th className="border px-2 py-1">Sub-treatment</th>
              <th className="border px-2 py-1">Notes</th>
            </tr>
          </thead>

          <tbody>
            {timeSlots.map(slot => {
              const a = findBySlot(slot);
              return (
                <tr key={slot} className="hover:bg-gray-100">
                  <td className="border px-2 py-1">
                    {dayjs(`${date}T${slot}`).format('h:mm A')}
                  </td>
                  <td className="border px-2 py-1">{a?.firstName     || ''}</td>
                  <td className="border px-2 py-1">{a?.lastName      || ''}</td>
                  <td className="border px-2 py-1">{a?.cellPhone     || ''}</td>
                  <td className="border px-2 py-1">{a?.status        || ''}</td>
                  <td className="border px-2 py-1">{a?.total         || ''}</td>
                  <td className="border px-2 py-1">{a?.package       || ''}</td>
                  <td className="border px-2 py-1">{a?.sessionNumber || ''}</td>
                  <td className="border px-2 py-1">{a?.treatment     || ''}</td>
                  <td className="border px-2 py-1">{a?.subTreatment  || ''}</td>
                  <td className="border px-2 py-1">{a?.notes         || ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
