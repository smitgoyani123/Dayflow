import React, { useState } from 'react';
import { Plus, Check, X, FileText, Filter, Users, User } from 'lucide-react';
import Modal from '../components/Modal';

const TimeOff = () => {
    // Temporary role state for demo
    const [userRole, setUserRole] = useState('employee'); // 'admin' | 'employee'

    // Shared State
    const [isModalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState('All');

    // Employee Specific Form State
    const [isHalfDay, setIsHalfDay] = useState(false);
    const [formData, setFormData] = useState({
        type: 'Paid Time Off (PTO)',
        startDate: '',
        endDate: '',
        reason: '',
        attachment: null
    });

    // Mock Data
    const [requests, setRequests] = useState([
        { id: 1, employeeName: 'Alex Johnson', type: 'Sick Leave', start: '2024-03-10', end: '2024-03-12', days: 3, status: 'Approved' },
        { id: 2, employeeName: 'Maria Garcia', type: 'Casual Leave', start: '2024-02-15', end: '2024-02-16', days: 2, status: 'Rejected' },
        { id: 3, employeeName: 'Alex Johnson', type: 'Paid Time Off', start: '2024-01-01', end: '2024-01-05', days: 5, status: 'Approved' },
        { id: 4, employeeName: 'John Doe', type: 'Sick Leave', start: '2024-04-01', end: '2024-04-01', days: 1, status: 'Pending' },
        { id: 5, employeeName: 'Alex Johnson', type: 'Unpaid Leave', start: '2024-04-10', end: '2024-04-12', days: 3, status: 'Pending' },
    ]);

    // Actions
    const handleStatusUpdate = (id, newStatus) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        ));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const s = new Date(start);
        const e = new Date(end);
        const diffTime = Math.abs(e - s);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        let days = isHalfDay ? 0.5 : calculateDays(formData.startDate, formData.endDate);
        const newRequest = {
            id: Date.now(),
            employeeName: 'Alex Johnson',
            type: formData.type,
            start: formData.startDate,
            end: formData.endDate,
            days: days,
            status: 'Pending'
        };
        setRequests([newRequest, ...requests]);
        setModalOpen(false);
        setFormData({ type: 'Paid Time Off (PTO)', startDate: '', endDate: '', reason: '', attachment: null });
        setIsHalfDay(false);
    };

    return (
        <div className="timeoff-page">

            {/* 1. Header Section */}
            <div className="page-header-row">
                <div className="header-text">
                    <h1 className="page-title">Time Off</h1>
                    <p className="page-subtitle">
                        {userRole === 'admin' ? 'Manage employee leave requests' : 'Manage your leaves and time off Requests'}
                    </p>
                </div>

                <div className="header-actions">
                    {/* Role Switcher */}
                    <div className="role-segments">
                        <button
                            className={`segment-btn ${userRole === 'employee' ? 'active' : ''}`}
                            onClick={() => setUserRole('employee')}
                        >
                            <User size={16} /> Employee
                        </button>
                        <button
                            className={`segment-btn ${userRole === 'admin' ? 'active' : ''}`}
                            onClick={() => setUserRole('admin')}
                        >
                            <Users size={16} /> Admin
                        </button>
                    </div>

                    {userRole === 'employee' && (
                        <button className="btn-primary" onClick={() => setModalOpen(true)}>
                            <Plus size={18} /> Request Time Off
                        </button>
                    )}
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="page-content">
                {userRole === 'employee' ? (
                    <EmployeeView
                        requests={requests.filter(r => r.employeeName === 'Alex Johnson')}
                        filter={filter}
                        setFilter={setFilter}
                    />
                ) : (
                    <AdminView
                        requests={requests}
                        handleStatusUpdate={handleStatusUpdate}
                        filter={filter}
                        setFilter={setFilter}
                    />
                )}
            </div>

            {/* Request Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Request Time Off">
                <form className="modal-form" onSubmit={handleRequestSubmit}>

                    <div className="form-group">
                        <label>Leave Type</label>
                        <select name="type" value={formData.type} onChange={handleInputChange}>
                            <option>Paid Time Off (PTO)</option>
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                            <option>Unpaid Leave</option>
                        </select>
                    </div>

                    <div className="form-row-2">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <label className="checkbox-row">
                        <input type="checkbox" checked={isHalfDay} onChange={e => setIsHalfDay(e.target.checked)} />
                        <span>Requesting Half Day</span>
                    </label>

                    <div className="summary-box">
                        <span>Total Days:</span>
                        <strong>{isHalfDay ? '0.5' : calculateDays(formData.startDate, formData.endDate) || 0}</strong>
                    </div>

                    <div className="form-group">
                        <label>Reason</label>
                        <textarea
                            name="reason" rows="3" placeholder="Why do you need time off?"
                            value={formData.reason} onChange={handleInputChange} required
                        ></textarea>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn-primary">Submit Request</button>
                    </div>
                </form>
            </Modal>

            <style>{`
                /* --- Layout Structure --- */
                .timeoff-page {
                    width: 100%;
                    display: flex; flex-direction: column; gap: 32px;
                    padding-bottom: 40px;
                }
                
                /* Header */
                .page-header-row {
                    display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;
                }
                .page-title { font-size: 1.75rem; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.2; }
                .page-subtitle { color: #64748b; font-size: 0.95rem; margin-top: 4px; }

                .header-actions { display: flex; align-items: center; gap: 16px; }

                /* Role Switcher */
                .role-segments {
                    display: flex; background: white; padding: 4px; border-radius: 8px;
                    border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                }
                .segment-btn {
                    display: flex; align-items: center; gap: 8px;
                    padding: 8px 16px; font-size: 0.9rem; font-weight: 500;
                    border-radius: 6px; border: none; background: transparent;
                    color: #64748b; cursor: pointer; transition: all 0.2s;
                }
                .segment-btn:hover { color: #0f172a; }
                .segment-btn.active {
                    background: #eff6ff; color: var(--color-primary); font-weight: 600;
                }

                /* Primary Button */
                .btn-primary {
                    display: flex; align-items: center; gap: 8px;
                    background: var(--color-primary); color: white;
                    padding: 10px 20px; border-radius: 8px; border: none;
                    font-weight: 600; cursor: pointer; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
                    transition: transform 0.1s;
                }
                .btn-primary:active { transform: translateY(1px); }

                /* --- Content Sections --- */
                .page-content { display: flex; flex-direction: column; gap: 24px; }

                /* Grid for Balance Cards */
                .balance-grid {
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
                    gap: 24px;
                }

                /* Table Card Container */
                .table-card {
                    background: white; border: 1px solid #e2e8f0;
                    border-radius: 12px; overflow: hidden;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                    display: flex; flex-direction: column;
                }
                .table-header-row {
                    padding: 24px; border-bottom: 1px solid #e2e8f0;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .table-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; }

                /* Filter Tabs */
                .filter-group { display: flex; gap: 4px; background: #f8fafc; padding: 4px; border-radius: 8px; border: 1px solid #e2e8f0; }
                .filter-chip {
                    padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; border: none;
                    background: transparent; color: #64748b; font-weight: 500; cursor: pointer;
                }
                .filter-chip:hover { color: #0f172a; }
                .filter-chip.active { background: white; color: var(--color-primary); font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

                /* Table Styles */
                .table-wrapper { width: 100%; overflow-x: auto; }
                table { width: 100%; border-collapse: collapse; min-width: 600px; }
                th {
                    text-align: left; padding: 16px 24px; background: #f8fafc;
                    font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em;
                    border-bottom: 1px solid #e2e8f0;
                }
                td {
                    padding: 20px 24px; border-bottom: 1px solid #f1f5f9;
                    font-size: 0.95rem; color: #334155; vertical-align: middle;
                }
                tr:last-child td { border-bottom: none; }
                tr:hover td { background: #fcfcfc; }

                .emp-name { font-weight: 600; color: #0f172a; }
                .date-text { color: #64748b; font-feature-settings: "tnum"; }
                
                /* Pills & Badges */
                .type-pill {
                    display: inline-block; padding: 4px 10px; border-radius: 100px;
                    font-size: 0.8rem; font-weight: 500; background: #f1f5f9; color: #475569;
                }
                .status-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 4px 10px; border-radius: 100px; font-size: 0.8rem; font-weight: 600;
                }
                .status-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; }
                
                .status-Approved { background: #dcfce7; color: #15803d; } .status-Approved::before { background: #15803d; }
                .status-Pending { background: #fef9c3; color: #a16207; } .status-Pending::before { background: #a16207; }
                .status-Rejected { background: #fee2e2; color: #b91c1c; } .status-Rejected::before { background: #b91c1c; }

                /* Modal Form */
                .modal-form { display: flex; flex-direction: column; gap: 20px; }
                .form-group { display: flex; flex-direction: column; gap: 6px; }
                .form-group label { font-size: 0.9rem; font-weight: 500; color: #475569; }
                .form-group select, .form-group input, .form-group textarea {
                    padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px;
                    font-size: 0.95rem; outline: none; transition: border 0.2s;
                }
                .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--color-primary); }
                
                .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                
                .checkbox-row { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; color: #0f172a; }
                .checkbox-row input { width: 16px; height: 16px; accent-color: var(--color-primary); }

                .summary-box {
                    background: #f8fafc; padding: 12px 16px; border-radius: 8px;
                    display: flex; justify-content: space-between; align-items: center;
                    font-size: 0.9rem; color: #64748b;
                }
                .summary-box strong { color: #0f172a; font-size: 1.1rem; }

                .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px; }
                .btn-outline {
                    padding: 10px 20px; background: white; border: 1px solid #cbd5e1;
                    border-radius: 8px; font-weight: 600; color: #475569; cursor: pointer;
                }
                .btn-outline:hover { background: #f8fafc; color: #0f172a; }

            `}</style>
        </div>
    );
};

// --- Sub-Components ---

const EmployeeView = ({ requests, filter, setFilter }) => {
    const filtered = filter === 'All' ? requests : requests.filter(r => r.status === filter);
    return (
        <>
            <div className="balance-grid">
                <BalanceCard label="Paid Time Off (PTO)" used={12} total={20} color="var(--color-primary)" />
                <BalanceCard label="Sick Leave" used={5} total={7} color="#f97316" />
                <BalanceCard label="Casual Leave" used={2} total={5} color="#10b981" />
            </div>

            <div className="table-card">
                <div className="table-header-row">
                    <h3 className="table-title">Request History</h3>
                    <FilterGroup filter={filter} setFilter={setFilter} />
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Type</th>
                                <th style={{ width: '25%' }}>Duration</th>
                                <th style={{ width: '25%' }}>Dates</th>
                                <th style={{ width: '20%' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? filtered.map(req => (
                                <tr key={req.id}>
                                    <td><span className="type-pill">{req.type}</span></td>
                                    <td><span className="font-medium">{req.days} Days</span></td>
                                    <td><div className="date-text">{req.start} → {req.end}</div></td>
                                    <td><span className={`status-badge status-${req.status}`}>{req.status}</span></td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No requests found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

const AdminView = ({ requests, handleStatusUpdate, filter, setFilter }) => {
    const filtered = filter === 'All' ? requests : requests.filter(r => r.status === filter);
    return (
        <div className="table-card">
            <div className="table-header-row">
                <h3 className="table-title">All Leave Requests</h3>
                <FilterGroup filter={filter} setFilter={setFilter} />
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>Employee</th>
                            <th style={{ width: '20%' }}>Type</th>
                            <th style={{ width: '25%' }}>Dates</th>
                            <th style={{ width: '10%' }}>Days</th>
                            <th style={{ width: '10%' }}>Status</th>
                            <th style={{ width: '10%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? filtered.map(req => (
                            <tr key={req.id}>
                                <td><div className="emp-name">{req.employeeName}</div></td>
                                <td><span className="type-pill">{req.type}</span></td>
                                <td><div className="date-text">{req.start} <br /><span style={{ fontSize: '0.85em' }}>to {req.end}</span></div></td>
                                <td><span className="font-medium">{req.days}</span></td>
                                <td><span className={`status-badge status-${req.status}`}>{req.status}</span></td>
                                <td>
                                    {req.status === 'Pending' && (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => handleStatusUpdate(req.id, 'Approved')}
                                                style={{ padding: '6px', background: '#dcfce7', border: 'none', borderRadius: '6px', color: '#15803d', cursor: 'pointer' }}
                                                title="Approve"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(req.id, 'Rejected')}
                                                style={{ padding: '6px', background: '#fee2e2', border: 'none', borderRadius: '6px', color: '#b91c1c', cursor: 'pointer' }}
                                                title="Reject"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No pending requests.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const BalanceCard = ({ label, used, total, color }) => {
    const percentage = Math.round((used / total) * 100);
    return (
        <div style={{
            background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
            <div>
                <h4 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '8px' }}>{label}</h4>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', lineHeight: 1 }}>{total - used}</span>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>left</span>
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#64748b', background: '#f8fafc', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>
                    Used: <strong>{used}</strong>/{total}
                </div>
            </div>
            <div style={{
                width: '64px', height: '64px', borderRadius: '50%', background: `conic-gradient(${color} ${percentage}%, #f1f5f9 0)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div style={{ width: '52px', height: '52px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', color: '#334155' }}>
                    {percentage}%
                </div>
            </div>
        </div>
    );
};

const FilterGroup = ({ filter, setFilter }) => (
    <div className="filter-group">
        {['All', 'Approved', 'Pending', 'Rejected'].map(f => (
            <button
                key={f}
                className={`filter-chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
            >
                {f}
            </button>
        ))}
    </div>
);

export default TimeOff;
