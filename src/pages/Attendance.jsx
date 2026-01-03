import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Clock, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
    // 1. STATE
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState([]);
    const [stats, setStats] = useState({ present: 0, leaves: 0, total: 0 });
    const [loading, setLoading] = useState(true);

    // Status & Timer State
    const [status, setStatus] = useState('Idle'); // Idle, CheckedIn, CheckedOut
    const [checkInTime, setCheckInTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState('00:00:00');

    const token = localStorage.getItem('token');

    // 2. HELPER: Formatters
    const getMonthName = (date) => date.toLocaleString('default', { month: 'short' });
    const getFullDate = (date) => `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    // Format Seconds to HH:MM:SS
    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    // 3. API FETCHING
    const fetchHistory = async () => {
        try {
            const res = await fetch('/api/attendance/my', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();

            // Filter by month locally for now
            const filtered = data.filter(d => {
                const date = new Date(d.date);
                return date.getMonth() === viewDate.getMonth() && date.getFullYear() === viewDate.getFullYear();
            });

            // Map to UI format
            const mapped = filtered.map(d => ({
                id: d._id,
                date: new Date(d.date).toLocaleDateString(),
                checkIn: d.checkIn ? new Date(d.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-',
                checkOut: d.checkOut ? new Date(d.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-',
                workHours: d.totalHours ? `${d.totalHours} hrs` : '-',
                status: d.status
            }));
            setAttendanceData(mapped);

            // Calc Stats
            const present = filtered.filter(d => d.status === 'Present' || d.status === 'Half-day').length;
            const leaves = filtered.filter(d => d.status === 'Leave').length; // Need Leave integration to be accurate
            setStats({ present, leaves, total: filtered.length });

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatus = async () => {
        try {
            const res = await fetch('/api/attendance/status', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setStatus(data.status);
            if (data.checkInTime) setCheckInTime(new Date(data.checkInTime));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [viewDate, status]); // Refetch history when month changes or status updates

    useEffect(() => {
        fetchStatus();
    }, []);

    // 4. TIMER LOGIC
    useEffect(() => {
        let interval;
        if (status === 'CheckedIn' && checkInTime) {
            interval = setInterval(() => {
                const now = new Date();
                const diff = now - checkInTime;
                setElapsedTime(formatDuration(diff));
            }, 1000);
        } else {
            setElapsedTime('00:00:00');
        }
        return () => clearInterval(interval);
    }, [status, checkInTime]);


    // 5. HANDLERS
    const handleCheckIn = async () => {
        try {
            const res = await fetch('/api/attendance/checkin', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Check-in failed');

            const data = await res.json();
            setStatus('CheckedIn');
            setCheckInTime(new Date(data.checkIn));
            fetchHistory(); // Refresh table
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCheckOut = async () => {
        try {
            const res = await fetch('/api/attendance/checkout', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Check-out failed');

            setStatus('CheckedOut');
            setCheckInTime(null);
            fetchHistory(); // Refresh table
        } catch (err) {
            alert(err.message);
        }
    };

    // Navigation
    const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

    // Dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    return (
        <div className="attendance-page">
            <div className="page-header">
                <div className="header-left">
                    <h1 className="page-title">Attendance</h1>
                    <p className="page-subtitle">Track your daily work hours</p>
                </div>

                {/* CHECK IN/OUT ACTION AREA */}
                <div className="action-area">
                    {status === 'CheckedIn' ? (
                        <div className="timer-box active">
                            <div className="timer-display">
                                <Clock size={16} className="animate-pulse" />
                                <span>{elapsedTime}</span>
                            </div>
                            <button className="btn-action check-out" onClick={handleCheckOut}>
                                <LogOut size={18} /> Check Out
                            </button>
                        </div>
                    ) : (
                        <div className="timer-box">
                            <button
                                className="btn-action check-in"
                                onClick={handleCheckIn}
                                disabled={status === 'CheckedOut'}
                            >
                                <LogIn size={18} /> {status === 'CheckedOut' ? 'Done for Today' : 'Check In'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="toolbar-grid">
                <div className="nav-group">
                    <button className="icon-btn" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
                    <button className="icon-btn" onClick={handleNextMonth}><ChevronRight size={20} /></button>
                </div>

                <div className="month-picker-container" style={{ position: 'relative' }}>
                    <div className="month-picker-box" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <span>{getMonthName(viewDate)} {viewDate.getFullYear()}</span>
                        <ChevronDown size={14} className="opacity-50" />
                    </div>
                    {isDropdownOpen && (
                        <div className="month-dropdown">
                            {months.map((m, index) => (
                                <div key={m} className={`month-option ${viewDate.getMonth() === index ? 'selected' : ''}`}
                                    onClick={() => { setViewDate(new Date(viewDate.getFullYear(), index, 1)); setIsDropdownOpen(false); }}
                                >
                                    {m}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="sk-stat-card stat-green">
                    <span className="sk-stat-label">Present</span>
                    <span className="sk-stat-value">{stats.present}</span>
                </div>
                {/* <div className="sk-stat-card stat-red">
                    <span className="sk-stat-label">Leaves</span>
                    <span className="sk-stat-value">{stats.leaves}</span>
                </div> */}
                <div className="sk-stat-card stat-blue">
                    <span className="sk-stat-label">Total Days</span>
                    <span className="sk-stat-value">{stats.total}</span>
                </div>
            </div>

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
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                        ) : attendanceData.length > 0 ? (
                            attendanceData.map((row) => (
                                <tr key={row.id}>
                                    <td className="font-medium">{row.date}</td>
                                    <td>{row.checkIn}</td>
                                    <td>{row.checkOut}</td>
                                    <td>{row.workHours}</td>
                                    <td>
                                        <span className={`status-pill ${row.status}`}>{row.status}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>No attendance records for this month.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
                .attendance-page { width: 100%; display: flex; flex-direction: column; gap: 24px; padding-bottom: 40px; }
                .page-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 4px; }
                .page-title { font-size: 1.75rem; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.2; }
                .page-subtitle { color: #64748b; font-size: 0.95rem; margin-top: 4px; }

                /* Action Area & Timer */
                .action-area { display: flex; align-items: center; }
                .timer-box { display: flex; align-items: center; gap: 16px; background: white; padding: 6px; border-radius: 12px; border: 1px solid #e2e8f0; }
                .timer-box.active { border-color: #bbf7d0; background: #f0fdf4; }
                
                .timer-display { 
                    font-family: monospace; font-size: 1.2rem; font-weight: 700; color: #166534; 
                    padding: 0 12px; display: flex; align-items: center; gap: 8px;
                }
                .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }

                .btn-action {
                    display: flex; align-items: center; gap: 8px;
                    padding: 10px 20px; border-radius: 8px; border: none;
                    font-weight: 600; cursor: pointer; transition: all 0.2s;
                }
                .check-in { background: #0f172a; color: white; }
                .check-in:hover { background: #1e293b; }
                .check-in:disabled { background: #94a3b8; cursor: not-allowed; }
                
                .check-out { background: #ef4444; color: white; }
                .check-out:hover { background: #dc2626; }

                /* Toolbar */
                .toolbar-grid { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
                .nav-group { display: flex; gap: 8px; }
                .icon-btn { width: 42px; height: 42px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #334155; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
                .icon-btn:hover { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }

                .month-picker-container { position: relative; }
                .month-picker-box { height: 42px; padding: 0 12px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
                .month-picker-box:hover { background: #f8fafc; border-color: #cbd5e1; }
                .month-dropdown { position: absolute; top: 110%; left: 0; width: 160px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 50; max-height: 240px; overflow-y: auto; }
                .month-option { padding: 10px 16px; font-size: 0.9rem; color: #334155; cursor: pointer; transition: background 0.1s; }
                .month-option:hover { background: #f8fafc; color: var(--color-primary); }
                .month-option.selected { background: #f1f5f9; font-weight: 600; color: var(--color-primary); }

                /* Stats Cards */
                .sk-stat-card { height: 42px; padding: 0 12px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
                .sk-stat-label { font-size: 0.85rem; font-weight: 500; }
                .sk-stat-value { font-size: 1rem; font-weight: 700; }
                .stat-green { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
                .stat-red { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
                .stat-blue { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }

                /* Date Box */
                .date-box-container { display: flex; margin-top: 8px; }
                .date-box { background: white; border: 1px solid #e2e8f0; border-left: 4px solid var(--color-primary); padding: 8px 16px; border-radius: 4px; font-weight: 600; color: #0f172a; font-size: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

                /* Table */
                .table-container { background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
                .attendance-table { width: 100%; border-collapse: collapse; }
                .attendance-table th { text-align: left; padding: 16px 24px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
                .attendance-table td { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.95rem; }
                .attendance-table tr:last-child td { border-bottom: none; }
                .font-medium { font-weight: 600; color: #0f172a; }

                .status-pill { display: inline-block; padding: 2px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
                .status-pill.Present { background: #dcfce7; color: #15803d; }
                .status-pill.Half-day { background: #fef9c3; color: #854d0e; }
                .status-pill.Absent { background: #fee2e2; color: #b91c1c; }
                .status-pill.Leave { background: #f1f5f9; color: #475569; }

            `}</style>
        </div>
    );
};

export default Attendance;
