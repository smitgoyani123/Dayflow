import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const Attendance = () => {
    // Mock Data based on the wireframe
    const attendanceData = [
        { date: '28/10/2025', checkIn: '10:00', checkOut: '19:00', workHours: '09:00', extraHours: '01:00' },
        { date: '29/10/2025', checkIn: '10:00', checkOut: '19:00', workHours: '09:00', extraHours: '01:00' },
        { date: '30/10/2025', checkIn: '10:00', checkOut: '19:00', workHours: '09:00', extraHours: '01:00' },
        { date: '31/10/2025', checkIn: '09:45', checkOut: '18:45', workHours: '09:00', extraHours: '01:00' },
        { date: '01/11/2025', checkIn: '10:15', checkOut: '19:15', workHours: '09:00', extraHours: '01:00' },
    ];

    const [currentMonth, setCurrentMonth] = useState('Oct');

    return (
        <div className="attendance-page">
            <h1 className="page-title">Attendance</h1>

            {/* Toolbar Section */}
            <div className="toolbar">
                <div className="nav-controls">
                    <button className="icon-btn"><ChevronLeft size={20} /></button>
                    <button className="icon-btn"><ChevronRight size={20} /></button>
                </div>
                
                <div className="month-selector">
                    <span>{currentMonth}</span>
                    <ChevronDown size={14} />
                </div>

                <div className="stat-card">
                    <span className="stat-label">Count of days present</span>
                    {/* Value placeholder if needed, purely visual as per sketch text */}
                </div>

                <div className="stat-card">
                    <span className="stat-label">Leaves count</span>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Total working days</span>
                </div>
            </div>

            <div className="date-header">
                22,October 2025
            </div>

            {/* Table Section */}
            <div className="table-container">
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Work Hours</th>
                            <th>Extra hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.date}</td>
                                <td>{row.checkIn}</td>
                                <td>{row.checkOut}</td>
                                <td>{row.workHours}</td>
                                <td>{row.extraHours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .attendance-page {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    padding: 0 10px;
                }

                .page-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                    border: 1px solid var(--color-text-main);
                    padding: 10px 15px;
                    border-radius: 4px; /* Slight radius for "sketchy" feel or just clean box */
                    background: white;
                    width: 100%;
                }

                .toolbar {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .nav-controls {
                    display: flex;
                    gap: 8px;
                }

                .icon-btn {
                    width: 40px;
                    height: 40px;
                    border: 1px solid var(--color-text-main);
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    cursor: pointer;
                    color: var(--color-text-main);
                }

                .month-selector {
                    height: 40px;
                    min-width: 100px;
                    border: 1px solid var(--color-text-main);
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border-radius: 4px;
                    padding: 0 12px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .stat-card {
                    height: 40px;
                    padding: 0 16px;
                    border: 1px solid var(--color-text-secondary); /* Lighter border for these maybe? Sketch shows same weight */
                    border: 1px solid var(--color-text-muted); 
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 2px;
                    font-size: 0.9rem;
                    color: var(--color-text-main);
                    white-space: nowrap;
                }

                .date-header {
                    margin-top: 10px;
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: var(--color-text-main);
                }

                .table-container {
                    width: 100%;
                    border-top: 2px solid var(--color-text-main); /* Strong line as per sketch */
                }

                .attendance-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .attendance-table th {
                    text-align: left;
                    padding: 12px 0;
                    border-bottom: 2px solid var(--color-text-main); /* Header separator */
                    font-weight: 600;
                    color: var(--color-text-main);
                }
                
                /* Column widths based on visual weight */
                .attendance-table th:nth-child(1) { width: 25%; }
                .attendance-table th:nth-child(2) { width: 20%; }
                .attendance-table th:nth-child(3) { width: 20%; }
                .attendance-table th:nth-child(4) { width: 20%; }
                .attendance-table th:nth-child(5) { width: 15%; text-align: right; }
                .attendance-table td:nth-child(5) { text-align: right; }

                .attendance-table td {
                    padding: 16px 0;
                    border-bottom: 1px solid var(--color-border);
                    color: var(--color-text-main);
                    font-size: 1rem;
                }

                /* Vertical lines like in the sketch (optional, but requested 'like this') */
                .attendance-table th:not(:last-child),
                .attendance-table td:not(:last-child) {
                    border-right: 1px solid var(--color-text-main);
                    padding-right: 12px;
                }
                .attendance-table th:not(:first-child),
                .attendance-table td:not(:first-child) {
                    padding-left: 12px;
                }

            `}</style>
        </div>
    );
};

export default Attendance;
