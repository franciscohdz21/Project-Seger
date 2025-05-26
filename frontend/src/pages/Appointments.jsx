import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import Button from '../components/Button';

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
  const [selectedSlot, setSelectedSlot] = useState(null);

  /* ───── fetch appointments (by cabin) ───── */
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/appointments/${activeCabin}`);
      setAppt(res.data);
    } catch (err) { console.error(err); }
  };

  const getAppointmentAtTime = (slot) => {
    return appointments.find(
      (a) => a.date.split('T')[0] === date && a.time === slot
    );
  };

  useEffect(() => { 
    fetchAppointments();
    setSelectedSlot(null);
  }, [date, activeCabin]);

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
                onClick={() => {
                  setCabin(c);   // switch cabin
                  setSelectedSlot(null);   // clear highlighted row
                }}
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

        {/* EDIT button */}
        <button
          disabled={!selectedSlot}                              // ← disable when nothing selected
          className={`px-4 py-2 rounded transition ${
            selectedSlot
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-300 text-white cursor-not-allowed'
          }`}
          onClick={() => {
            if (!selectedSlot) return;
            const appt = getAppointmentAtTime(selectedSlot);
            openEditModal(appt);                                // your existing modal
          }}
        >
          Edit Appointment
        </button>

        {/* DELETE button */}
        <button
          disabled={!selectedSlot}
          className={`px-4 py-2 rounded transition ${
            selectedSlot
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-red-300 text-white cursor-not-allowed'
          }`}
          onClick={() => {
            if (!selectedSlot) return;
            const appt = getAppointmentAtTime(selectedSlot);
            openDeleteConfirm(appt);                            // your delete handler
          }}
        >
          Delete Appointment
        </button>

        </div>
      </div>

      {/* Spreadsheet-style table */}
      <div className="card shadow-card bg-base-100 p-4 overflow-x-auto">
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
            {timeSlots.map(time => {
              const appt       = getAppointmentAtTime(time);   // ← you already have this helper
              const isSelected = selectedSlot === time;

              return (
                <tr
                  key={time}
                  onClick={() => setSelectedSlot(time)}         // ① click = select
                  className={`cursor-pointer hover:bg-gray-100 ${
                    isSelected ? 'bg-yellow-200' : ''
                  }`}
                >
                  <td className="border px-2 py-1">
                    {dayjs(`${date}T${time}`).format('h:mm A')}
                  </td>
                  <td className="border px-2 py-1">{appt?.firstName     || ''}</td>
                  <td className="border px-2 py-1">{appt?.lastName      || ''}</td>
                  <td className="border px-2 py-1">{appt?.cellPhone     || ''}</td>
                  <td className="border px-2 py-1">{appt?.status        || ''}</td>
                  <td className="border px-2 py-1">{appt?.total         || ''}</td>
                  <td className="border px-2 py-1">{appt?.package       || ''}</td>
                  <td className="border px-2 py-1">{appt?.sessionNumber || ''}</td>
                  <td className="border px-2 py-1">{appt?.treatment     || ''}</td>
                  <td className="border px-2 py-1">{appt?.subTreatment  || ''}</td>
                  <td className="border px-2 py-1">{appt?.notes         || ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
