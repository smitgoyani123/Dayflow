import React, { useState } from 'react';
import { Plus, Check, X, FileText, Filter, Users, User } from 'lucide-react';
import Modal from '../components/Modal';

const TimeOff = () => {
    // Temporary role state for demo - default to 'employee'
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
            id: Date.now(), // Unique ID
            employeeName: 'Alex Johnson', // Current user
            type: formData.type,
            start: formData.startDate,
            end: formData.endDate,
            days: days,
            status: 'Pending'
        };

        setRequests([newRequest, ...requests]); // Add to top
        setModalOpen(false);
        // Reset form
        setFormData({ type: 'Paid Time Off (PTO)', startDate: '', endDate: '', reason: '', attachment: null });
        setIsHalfDay(false);
    };

    return (
        <div className="flex flex-col gap-8">

            {/* Header & Role Toggle */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-main">Time Off</h1>
                    <p className="text-secondary text-sm mt-1">
                        {userRole === 'admin' ? 'Manage employee leave requests' : 'Manage your leaves and time off Requests'}
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    {/* Improved Role Switcher */}
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                        <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${userRole === 'employee' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50'}`}
                            onClick={() => setUserRole('employee')}
                        >
                            <User size={16} /> Employee
                        </button>
                        <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${userRole === 'admin' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50'}`}
                            onClick={() => setUserRole('admin')}
                        >
                            <Users size={16} /> Admin
                        </button>
                    </div>

                    {userRole === 'employee' && (
                        <button className="btn btn-primary flex gap-2 shadow-lg hover:shadow-xl transition-all" onClick={() => setModalOpen(true)}>
                            <Plus size={18} /> Request Time Off
                        </button>
                    )}
                </div>
            </div>

            {/* CONTENT BASED ON ROLE */}
            {userRole === 'employee' ? (
                <EmployeeView
                    requests={requests.filter(r => r.employeeName === 'Alex Johnson')} // Show only own requests
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

            {/* Request Modal (Reverted to original design + Attachment) */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Request Time Off">
                <form className="flex flex-col gap-5" onSubmit={handleRequestSubmit}>

                    <div className="form-group">
                        <label className="text-sm font-medium text-secondary mb-1 block">Leave Type</label>
                        <select
                            name="type"
                            className="input-field"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            <option>Paid Time Off (PTO)</option>
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                            <option>Unpaid Leave</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="text-sm font-medium text-secondary mb-1 block">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                className="input-field"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-sm font-medium text-secondary mb-1 block">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                className="input-field"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer p-1">
                        <input type="checkbox" className="w-4 h-4 text-primary rounded" checked={isHalfDay} onChange={e => setIsHalfDay(e.target.checked)} />
                        <span className="text-sm text-main font-medium">Requesting Half Day</span>
                    </label>

                    <div className="bg-muted p-4 rounded-lg text-sm text-secondary flex justify-between items-center">
                        <span>Total Days:</span>
                        <strong className="text-main text-lg">
                            {isHalfDay ? '0.5' : calculateDays(formData.startDate, formData.endDate) || 0}
                        </strong>
                    </div>

                    {/* Optional Attachment */}
                    <div className="form-group">
                        <label className="text-sm font-medium text-secondary mb-1 block">Attachment <span className="text-muted text-xs font-normal">(Optional)</span></label>
                        <input type="file" className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                    </div>

                    <div className="form-group">
                        <label className="text-sm font-medium text-secondary mb-1 block">Reason</label>
                        <textarea
                            name="reason"
                            rows="3"
                            placeholder="Why do you need time off?"
                            className="input-field resize-none"
                            value={formData.reason}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                        <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary px-6">Submit Request</button>
                    </div>
                </form>
            </Modal>

            <style>{`
          .grid-balance {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;
          }
          
          /* Filters */
          .filter-tabs { display: flex; gap: 4px; background: #f1f5f9; padding: 4px; border-radius: 8px; }
          .filter-tab {
            padding: 6px 16px; font-size: 0.85rem; color: var(--color-text-secondary); border-radius: 6px; font-weight: 500; transition: all 0.2s;
          }
          .filter-tab:hover { background: rgba(0,0,0,0.05); color: var(--color-text-main); }
          .filter-tab.active { background: white; color: var(--color-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

          .input-field {
             width: 100%; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: inherit; font-size: 0.95rem;
             transition: border-color 0.2s, box-shadow 0.2s;
          }
          .input-field:focus {
             border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); outline: none;
          }

          /* Table Styles */
          table { border-collapse: separate; border-spacing: 0; width: 100%; }
          
          th {
            background-color: #f8fafc;
            padding: 16px 24px;
            font-weight: 600;
            font-size: 0.85rem;
            color: var(--color-text-secondary);
            border-bottom: 2px solid var(--color-border);
            text-align: left;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          td {
            padding: 20px 24px;
            font-size: 0.95rem;
            border-bottom: 1px solid var(--color-border);
            vertical-align: middle;
            color: var(--color-text-main);
          }
          
          .hover-row:hover td { background-color: #f8fafc; cursor: default; }
          .hover-row:last-child td { border-bottom: none; }
          
          .text-center { text-align: center; }
          .p-8 { padding: 32px; }
          
          /* Action Buttons */
          .action-btn {
            width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center;
            border-radius: 8px; cursor: pointer; transition: all 0.2s;
          }
          .action-btn.approve { background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; }
          .action-btn.approve:hover { background: #bbf7d0; transform: translateY(-1px); }
          
          .action-btn.reject { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
          .action-btn.reject:hover { background: #fecaca; transform: translateY(-1px); }

          .bg-primary\\/10 { background-color: rgba(59, 130, 246, 0.1); }
          .text-primary { color: var(--color-primary); }
        `}</style>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const EmployeeView = ({ requests, filter, setFilter }) => {
    const filteredRequests = filter === 'All'
        ? requests
        : requests.filter(r => r.status === filter);

    return (
        <div className="flex flex-col gap-8 fade-in">
            {/* Balance Cards */}
            <div className="grid-balance">
                <BalanceCard label="Paid Time Off" used={12} total={20} color="var(--color-primary)" />
                <BalanceCard label="Sick Leave" used={5} total={7} color="#f97316" />
                <BalanceCard label="Casual Leave" used={2} total={5} color="#10b981" />
            </div>

            {/* History Table */}
            <div className="card p-0 overflow-hidden shadow-sm border border-gray-100">
                <div className="table-header flex justify-between items-center p-6 border-b bg-white">
                    <h3 className="text-lg font-semibold text-main">Request History</h3>
                    <FilterTabs filter={filter} setFilter={setFilter} />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>Name</th>
                                <th style={{ width: '20%' }}>Start Date</th>
                                <th style={{ width: '20%' }}>End Date</th>
                                <th style={{ width: '20%' }}>Type</th>
                                <th style={{ width: '15%' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map(req => (
                                    <tr key={req.id} className="hover-row">
                                        <td>
                                            <div className="font-medium text-main">{req.employeeName}</div>
                                        </td>
                                        <td className="text-secondary">{req.start}</td>
                                        <td className="text-secondary">{req.end}</td>
                                        <td>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {req.type}
                                            </span>
                                        </td>
                                        <td><StatusBadge status={req.status} /></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted p-12">No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AdminView = ({ requests, handleStatusUpdate, filter, setFilter }) => {
    const filteredRequests = filter === 'All'
        ? requests
        : requests.filter(r => r.status === filter);

    return (
        <div className="card p-0 overflow-hidden shadow-sm border border-gray-100 fade-in">
            <div className="table-header flex justify-between items-center p-6 border-b bg-white">
                <h3 className="text-lg font-semibold text-main">All Leave Requests</h3>
                <FilterTabs filter={filter} setFilter={setFilter} />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>Employee</th>
                            <th style={{ width: '15%' }}>From</th>
                            <th style={{ width: '15%' }}>To</th>
                            <th style={{ width: '20%' }}>Type</th>
                            <th style={{ width: '10%' }}>Days</th>
                            <th style={{ width: '10%' }}>Status</th>
                            <th style={{ width: '10%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map(req => (
                                <tr key={req.id} className="hover-row">
                                    <td>
                                        <div className="font-medium text-main">{req.employeeName}</div>
                                    </td>
                                    <td className="text-secondary">{req.start}</td>
                                    <td className="text-secondary">{req.end}</td>
                                    <td>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {req.type}
                                        </span>
                                    </td>
                                    <td>{req.days}</td>
                                    <td><StatusBadge status={req.status} /></td>
                                    <td>
                                        {req.status === 'Pending' ? (
                                            <div className="flex gap-2">
                                                <button
                                                    className="action-btn approve"
                                                    title="Approve"
                                                    onClick={() => handleStatusUpdate(req.id, 'Approved')}
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    className="action-btn reject"
                                                    title="Reject"
                                                    onClick={() => handleStatusUpdate(req.id, 'Rejected')}
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-muted text-sm italic">--</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-muted p-12">No leave requests found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- HELPERS ---

const FilterTabs = ({ filter, setFilter }) => (
    <div className="filter-tabs">
        {['All', 'Approved', 'Pending', 'Rejected'].map(f => (
            <button
                key={f}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
            >
                {f}
            </button>
        ))}
    </div>
);

const BalanceCard = ({ label, used, total, color }) => {
    const percentage = Math.round((used / total) * 100);

    return (
        <div className="card balance-card flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div>
                <span className="balance-label block mb-2 font-medium">{label}</span>
                <div className="balance-value flex items-baseline gap-1">
                    <span className="big">{total - used}</span>
                    <span className="total">Days Left</span>
                </div>
                <div className="text-xs text-secondary mt-2 bg-gray-50 px-2 py-1 rounded inline-block">
                    Used: <strong>{used}</strong> / {total}
                </div>
            </div>

            {/* Percentage Circle */}
            <div className="progress-circle" style={{
                background: `conic-gradient(${color} ${percentage}%, #f1f5f9 0)`
            }}>
                <div className="inner-circle shadow-inner">{percentage}%</div>
            </div>

            <style>{`
         .balance-card { padding: 24px; }
         .balance-label { font-size: 0.95rem; color: var(--color-text-secondary); }
         .balance-value .big { font-size: 2.2rem; font-weight: 700; color: var(--color-text-main); line-height: 1; }
         .balance-value .total { font-size: 0.85rem; color: var(--color-text-muted); }
         
         .progress-circle {
           width: 72px; height: 72px; border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
         }
         .inner-circle {
           width: 58px; height: 58px; background: white; border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           font-size: 0.9rem; font-weight: 600; color: var(--color-text-main);
         }
      `}</style>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    let className = 'status-pill ';
    if (status === 'Approved') className += 'present';
    else if (status === 'Rejected') className += 'absent';
    else className += 'late';

    return <span className={className}>{status}</span>;
}

export default TimeOff;
