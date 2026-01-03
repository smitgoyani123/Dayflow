import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const Attendance = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    // Mock Attendance Data
    const attendanceData = Array.from({ length: 15 }, (_, i) => ({
        date: `2024-03-${i + 1}`,
        checkIn: '09:00 AM',
        checkOut: '06:00 PM',
        status: i % 7 === 0 ? 'Absent' : i % 5 === 0 ? 'Late' : 'Present',
        hours: '9h 00m'
    }));

    return (
        <div className="flex flex-col gap-6">

            {/* Header & Actions */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl">Attendance Log</h1>
                    <p className="text-secondary text-sm">View attendance history and work hours</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Admin Toggle */}
                    <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                        <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                        Admin View
                    </label>

                    <div className="date-picker-placeholder card flex items-center gap-2 px-3 py-2 text-sm">
                        <Calendar size={16} /> March 2024
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid-summary">
                <div className="card summary-card">
                    <span className="label">Present</span>
                    <span className="value text-green">12</span>
                </div>
                <div className="card summary-card">
                    <span className="label">Absent</span>
                    <span className="value text-red">2</span>
                </div>
                <div className="card summary-card">
                    <span className="label">Late Arrival</span>
                    <span className="value text-orange">1</span>
                </div>
                <div className="card summary-card">
                    <span className="label">Total Hours</span>
                    <span className="value">104h</span>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="card p-0 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th align="left">Date</th>
                            <th align="left">Status</th>
                            <th align="left">Check In</th>
                            <th align="left">Check Out</th>
                            <th align="left">Work Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((row, idx) => (
                            <tr key={idx} className="hover-row">
                                <td>{row.date}</td>
                                <td>
                                    <span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
                                </td>
                                <td>{row.status === 'Absent' ? '-' : row.checkIn}</td>
                                <td>{row.status === 'Absent' ? '-' : row.checkOut}</td>
                                <td>{row.status === 'Absent' ? '-' : row.hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
        .grid-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .summary-card {
          padding: 16px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .summary-card .label { font-size: 0.85rem; color: var(--color-text-secondary); }
        .summary-card .value { font-size: 1.5rem; font-weight: 700; color: var(--color-text-main); }
        
        .p-0 { padding: 0; }
        .overflow-hidden { overflow: hidden; }
        .w-full { width: 100%; }
        
        table { border-collapse: collapse; width: 100%; }
        th {
          background-color: #f8fafc;
          padding: 16px 24px;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          border-bottom: 1px solid var(--color-border);
        }
        td {
          padding: 16px 24px;
          font-size: 0.95rem;
          border-bottom: 1px solid var(--color-border);
        }
        .hover-row:hover { background-color: #f1f5f9; }
        
        .status-pill {
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .status-pill.present { background-color: #dcfce7; color: #166534; }
        .status-pill.absent { background-color: #fee2e2; color: #991b1b; }
        .status-pill.late { background-color: #ffedd5; color: #9a3412; }
      `}</style>
        </div>
    );
};

export default Attendance;
