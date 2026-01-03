import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const Attendance = () => {
    // 1. STATE: Current Date Context (defaults to Oct 2025 as per sketch, or Today)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date(2025, 9, 1)); // For Month Navigation

    // 2. HELPER: Formatters
    const getMonthName = (date) => date.toLocaleString('default', { month: 'short' });
    const getFullDate = (date) => `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    // 3. NAVIGATION HANDLERS
    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };
    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    // 4. MOCK DATA GENERATOR (Simulates fetching data for the viewDate month)
    const generateDataForMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const data = [];

        // Generate ~5-10 rows near the start of the month for demo
        for (let i = 1; i <= 5; i++) {
            const dayStr = i.toString().padStart(2, '0');
            const monthStr = (month + 1).toString().padStart(2, '0');
            // Check-in logic variation
            let checkIn = '10:00';
            let checkOut = '19:00';
            let extra = '01:00';
            let work = '09:00';

            // Random variation
            if (i % 3 === 0) { checkIn = '10:15'; checkOut = '19:15'; }
            if (i % 4 === 0) { checkIn = '09:45'; checkOut = '18:45'; }

            data.push({
                date: `${dayStr}/${monthStr}/${year}`,
                checkIn, checkOut, workHours: work, extraHours: extra
            });
        }
        return data;
    };

    const attendanceData = generateDataForMonth(viewDate);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(viewDate.getFullYear(), monthIndex, 1);
        setViewDate(newDate);
        setIsDropdownOpen(false);
    };

    return (
        <div className="attendance-page">
            <div className="page-header">
                <div className="header-left">
                    <h1 className="page-title">Attendance</h1>
                </div>
            </div>

            <div className="toolbar-grid">
                <div className="nav-group">
                    <button className="icon-btn" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
                    <button className="icon-btn" onClick={handleNextMonth}><ChevronRight size={20} /></button>
                </div>

                <div className="month-picker-container" style={{ position: 'relative' }}>
                    <div
                        className="month-picker-box"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span>{getMonthName(viewDate)}</span>
                        <ChevronDown size={14} className="opacity-50" />
                    </div>

                    {isDropdownOpen && (
                        <div className="month-dropdown">
                            {months.map((m, index) => (
                                <div
                                    key={m}
                                    className={`month-option ${viewDate.getMonth() === index ? 'selected' : ''}`}
                                    onClick={() => handleMonthSelect(index)}
                                >
                                    {m}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Cards - Compact Horizontal */}
                <div className="sk-stat-card stat-green">
                    <span className="sk-stat-label">Days Present</span>
                    <span className="sk-stat-value">19</span>
                </div>
                <div className="sk-stat-card stat-red">
                    <span className="sk-stat-label">Leaves</span>
                    <span className="sk-stat-value">02</span>
                </div>
                <div className="sk-stat-card stat-blue">
                    <span className="sk-stat-label">Total Days</span>
                    <span className="sk-stat-value">22</span>
                </div>
            </div>

            {/* BOXED Date Display as requested */}
            <div className="date-box-container">
                <div className="date-box">
                    Today: {getFullDate(currentDate)}
                </div>
            </div>

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
                                <td className="font-medium">{row.date}</td>
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
                    width: 100%;
                    display: flex; flex-direction: column; gap: 24px;
                }

                /* Header */
                .page-header {
                    margin-bottom: 4px;
                }
                .page-title {
                    font-size: 1.5rem; font-weight: 700; color: #0f172a;
                }

                /* Toolbar Grid to hold buttons and stats */
                .toolbar-grid {
                    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
                }

                .nav-group { display: flex; gap: 8px; }

                .icon-btn {
                    width: 42px; height: 42px;
                    background: white; border: 1px solid #e2e8f0;
                    border-radius: 8px; /* Smooth corners */
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: #334155; transition: all 0.2s;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                }
                .icon-btn:hover { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }

                .month-picker-container { position: relative; }
                .month-picker-box {
                    height: 42px; padding: 0 12px;
                    background: white; border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    display: flex; align-items: center; gap: 8px;
                    font-weight: 600; min-width: auto; /* Allow shrink */
                    cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                }
                .month-picker-box:hover { background: #f8fafc; border-color: #cbd5e1; }

                .month-dropdown {
                    position: absolute; top: 110%; left: 0; width: 140px; /* Specific width */
                    background: white; border: 1px solid #e2e8f0;
                    border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    z-index: 50; max-height: 240px; overflow-y: auto;
                }
                .month-option {
                    padding: 10px 16px; font-size: 0.9rem; color: #334155;
                    cursor: pointer; transition: background 0.1s;
                }
                .month-option:hover { background: #f8fafc; color: var(--color-primary); }
                .month-option.selected { background: #f1f5f9; font-weight: 600; color: var(--color-primary); }

                /* Sketch-Specific Stats Cards (Compact) */
                .sk-stat-card {
                    height: 42px; padding: 0 12px; /* Match Month Box */
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: space-between; gap: 8px;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                    min-width: auto; /* Allow shrink */
                }
                .sk-stat-label { font-size: 0.85rem; font-weight: 500; }
                .sk-stat-value { font-size: 1rem; font-weight: 700; }

                /* Colors */
                .stat-green { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
                .stat-red { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
                .stat-blue { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }

                /* Date Box (New) */
                .date-box-container {
                     display: flex; margin-top: 8px;
                }
                .date-box {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-left: 4px solid var(--color-primary); /* Accent placement */
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-weight: 600; color: #0f172a;
                    font-size: 1rem;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }

                /* Table (Premium) */
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
                
                .font-medium { font-weight: 600; color: #0f172a; }
                
                .text-muted { color: #94a3b8; font-weight: 400; font-size: 1.25rem; }
            `}</style>
        </div>
    );
};

export default Attendance;
