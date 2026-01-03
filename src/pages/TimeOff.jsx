import React, { useState } from 'react';
import { Plus, Clock, FileText, Filter } from 'lucide-react';
import Modal from '../components/Modal';

const TimeOff = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    const [isHalfDay, setIsHalfDay] = useState(false);

    // Mock Requests
    const requests = [
        { id: 1, type: 'Sick Leave', start: '2024-03-10', end: '2024-03-12', days: 3, status: 'Approved' },
        { id: 2, type: 'Casual Leave', start: '2024-02-15', end: '2024-02-16', days: 2, status: 'Rejected' },
        { id: 3, type: 'Paid Time Off', start: '2024-01-01', end: '2024-01-05', days: 5, status: 'Approved' },
        { id: 4, type: 'Sick Leave', start: '2024-04-01', end: '2024-04-01', days: 1, status: 'Pending' },
    ];

    const filteredRequests = filter === 'All'
        ? requests
        : requests.filter(r => r.status === filter);

    return (
        <div className="flex flex-col gap-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl">Time Off</h1>
                    <p className="text-secondary text-sm">Manage your leaves and time off Requests</p>
                </div>
                <button className="btn btn-primary flex gap-2" onClick={() => setModalOpen(true)}>
                    <Plus size={18} /> Request Time Off
                </button>
            </div>

            {/* Balance Cards with Progress Bars */}
            <div className="grid-balance">
                <BalanceCard label="Paid Time Off" used={12} total={20} color="var(--color-primary)" />
                <BalanceCard label="Sick Leave" used={5} total={7} color="#f97316" />
                <BalanceCard label="Casual Leave" used={2} total={5} color="#10b981" />
            </div>

            {/* History Table with Filters */}
            <div className="card p-0 overflow-hidden">
                <div className="table-header flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg">Request History</h3>

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
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Duration</th>
                            <th>Days</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map(req => (
                                <tr key={req.id} className="hover-row">
                                    <td>{req.type}</td>
                                    <td>{req.start} to {req.end}</td>
                                    <td>{req.days} Days</td>
                                    <td><StatusBadge status={req.status} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-muted p-8">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Request Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Request Time Off">
                <form className="flex flex-col gap-4">
                    <div className="form-group">
                        <label className="text-sm text-secondary">Leave Type</label>
                        <select className="input-field">
                            <option>Paid Time Off (PTO)</option>
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                        </select>
                    </div>

                    <div className="grid-2-col">
                        <div className="form-group">
                            <label className="text-sm text-secondary">Start Date</label>
                            <input type="date" className="input-field" />
                        </div>
                        <div className="form-group">
                            <label className="text-sm text-secondary">End Date</label>
                            <input type="date" className="input-field" />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={isHalfDay} onChange={e => setIsHalfDay(e.target.checked)} />
                        <span className="text-sm text-main">Requesting Half Day</span>
                    </label>

                    <div className="bg-muted p-3 rounded text-sm text-secondary">
                        Estimated Days: <strong className="text-main">{isHalfDay ? '0.5' : '---'}</strong>
                    </div>

                    <div className="form-group">
                        <label className="text-sm text-secondary">Reason</label>
                        <textarea rows="3" placeholder="Why do you need time off?" className="input-field"></textarea>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button type="button" className="btn btn-primary">Submit Request</button>
                    </div>
                </form>
            </Modal>

            <style>{`
         .grid-balance {
           display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;
         }
         
         /* Filters */
         .filter-tabs { display: flex; gap: 4px; background: #f1f5f9; padding: 4px; border-radius: 6px; }
         .filter-tab {
           padding: 4px 12px; font-size: 0.85rem; color: var(--color-text-secondary); border-radius: 4px; font-weight: 500;
         }
         .filter-tab:hover { background: rgba(0,0,0,0.05); }
         .filter-tab.active { background: white; color: var(--color-primary); box-shadow: 0 1px 2px rgba(0,0,0,0.1); }

         .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
         .input-field {
            width: 100%; padding: 10px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: inherit;
         }
         /* Table Styles */
         table { border-collapse: separate; border-spacing: 0; width: 100%; }
         
         th {
           background-color: #f8fafc;
           padding: 12px 24px;
           font-weight: 600;
           font-size: 0.85rem;
           color: var(--color-text-secondary);
           border-bottom: 1px solid var(--color-border);
           text-align: left;
         }
         
         td {
           padding: 16px 24px;
           font-size: 0.95rem;
           border-bottom: 1px solid var(--color-border);
           vertical-align: middle;
         }
         
         /* Column Widths */
         th:nth-child(1) { width: 25%; } /* Type */
         th:nth-child(2) { width: 35%; } /* Duration */
         th:nth-child(3) { width: 15%; } /* Days */
         th:nth-child(4) { width: 25%; } /* Status */
         
         .hover-row:hover td { background-color: #f8fafc; }
         
         .text-center { text-align: center; }
         .p-8 { padding: 32px; }
       `}</style>
        </div>
    );
};

const BalanceCard = ({ label, used, total, color }) => {
    const percentage = Math.round((used / total) * 100);

    return (
        <div className="card balance-card flex items-center justify-between">
            <div>
                <span className="balance-label block mb-1">{label}</span>
                <div className="balance-value">
                    <span className="big">{total - used}</span> <span className="total">Days Left</span>
                </div>
                <div className="text-xs text-secondary mt-1">Used: {used} / {total}</div>
            </div>

            {/* Percentage Circle */}
            <div className="progress-circle" style={{
                background: `conic-gradient(${color} ${percentage}%, #e2e8f0 0)`
            }}>
                <div className="inner-circle">{percentage}%</div>
            </div>

            <style>{`
         .balance-card { padding: 24px; }
         .balance-label { font-size: 0.95rem; color: var(--color-text-secondary); font-weight: 500; }
         .balance-value .big { font-size: 2.2rem; font-weight: 700; color: var(--color-text-main); }
         .balance-value .total { font-size: 0.85rem; color: var(--color-text-muted); }
         
         .progress-circle {
           width: 64px; height: 64px; border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
         }
         .inner-circle {
           width: 52px; height: 52px; background: white; border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           font-size: 0.85rem; font-weight: 600; color: var(--color-text-main);
         }
      `}</style>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    let className = 'status-pill ';
    if (status === 'Approved') className += 'present';
    else if (status === 'Rejected') className += 'absent';
    else className += 'late'; // borrowing 'late' style for pending/other

    return <span className={className}>{status}</span>;
}

export default TimeOff;
