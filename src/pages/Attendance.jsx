import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const Attendance = () => {
    // Mock Data - Enhanced with Status
    const attendanceData = [
        { date: '2024-03-01', status: 'Absent', checkIn: '-', checkOut: '-', workHours: '-' },
        { date: '2024-03-02', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '9h 00m' },
        { date: '2024-03-03', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '9h 00m' },
        { date: '2024-03-04', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '9h 00m' },
        { date: '2024-03-05', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '9h 00m' },
        { date: '2024-03-06', status: 'Late', checkIn: '09:30 AM', checkOut: '06:30 PM', workHours: '9h 00m' },
    ];

    const [isAdminView, setIsAdminView] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-700';
            case 'Absent': return 'bg-red-100 text-red-700';
            case 'Late': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="attendance-page">

            {/* Header Section */}
            <div className="page-header">
                <div className="header-left">
                    <h1 className="page-title">Attendance Log</h1>
                    <p className="page-subtitle">View attendance history and work hours</p>
                </div>
                <div className="header-right">
                    <label className="admin-toggle">
                        <input
                            type="checkbox"
                            checked={isAdminView}
                            onChange={() => setIsAdminView(!isAdminView)}
                        />
                        <span>Admin View</span>
                    </label>
                    <button className="date-picker-btn">
                        <Calendar size={18} />
                        <span>March 2024</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Present</div>
                    <div className="stat-value">12</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Absent</div>
                    <div className="stat-value">2</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Late Arrival</div>
                    <div className="stat-value">1</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total Hours</div>
                    <div className="stat-value">104h</div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="table-container">
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Work Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((row, index) => (
                            <tr key={index}>
                                <td className="font-medium">{row.date}</td>
                                <td>
                                    <span className={`status-pill ${getStatusColor(row.status)}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td>{row.checkIn}</td>
                                <td>{row.checkOut}</td>
                                <td>{row.workHours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .attendance-page {
                    width: 100%;
                    display: flex; flex-direction: column; gap: 32px;
                }

                /* Header */
                .page-header {
                    display: flex; justify-content: space-between; align-items: flex-start;
                }
                .page-title {
                    font-size: 1.75rem; font-weight: 700; color: #0f172a;
                    margin-bottom: 4px;
                }
                .page-subtitle { color: #64748b; font-size: 0.95rem; }

                .header-right { display: flex; align-items: center; gap: 24px; }
                
                .admin-toggle {
                    display: flex; align-items: center; gap: 8px; 
                    font-size: 0.9rem; color: #64748b; cursor: pointer;
                }
                .date-picker-btn {
                    display: flex; align-items: center; gap: 8px;
                    padding: 10px 16px;
                    background: white; border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-weight: 600; color: #1e293b;
                    cursor: pointer; transition: all 0.2s;
                }
                .date-picker-btn:hover { border-color: #cbd5e1; background: #f8fafc; }

                /* Stats Grid */
                .stats-grid {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
                }
                .stat-card {
                    background: white; border: 1px solid #e2e8f0;
                    border-radius: 16px; padding: 24px;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }
                .stat-label { color: #64748b; font-size: 0.9rem; margin-bottom: 8px; }
                .stat-value { font-size: 2rem; font-weight: 700; color: #0f172a; }

                /* Table */
                .table-container {
                    background: white; border: 1px solid #e2e8f0;
                    border-radius: 16px; overflow: hidden;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }
                .attendance-table { width: 100%; border-collapse: collapse; }
                
                .attendance-table th {
                    text-align: left; padding: 16px 24px;
                    background: #f8fafc; border-bottom: 1px solid #e2e8f0;
                    color: #64748b; font-weight: 600; font-size: 0.9rem;
                }
                .attendance-table td {
                    padding: 20px 24px;
                    border-bottom: 1px solid #f1f5f9;
                    color: #1e293b; font-size: 0.95rem;
                }
                .attendance-table tr:last-child td { border-bottom: none; }
                
                .font-medium { font-weight: 500; }

                /* Status Pills */
                .status-pill {
                    display: inline-block; padding: 6px 16px;
                    border-radius: 100px; font-size: 0.85rem; font-weight: 600;
                }
                .text-green-700 { color: #15803d; } .bg-green-100 { background: #dcfce7; }
                .text-red-700 { color: #b91c1c; } .bg-red-100 { background: #fee2e2; }
                .text-orange-700 { color: #c2410c; } .bg-orange-100 { background: #ffedd5; }
                .text-gray-700 { color: #374151; } .bg-gray-100 { background: #f3f4f6; }

            `}</style>
        </div>
    );
};

export default Attendance;
