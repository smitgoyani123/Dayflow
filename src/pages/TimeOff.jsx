import React, { useState } from 'react';
import { Plus, Clock, FileText } from 'lucide-react';
import Modal from '../components/Modal';

const TimeOff = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    // Mock Requests
    const requests = [
        { id: 1, type: 'Sick Leave', start: 'Mar 10, 2024', end: 'Mar 12, 2024', days: 3, status: 'Approved' },
        { id: 2, type: 'Casual Leave', start: 'Feb 15, 2024', end: 'Feb 16, 2024', days: 2, status: 'Rejected' },
        { id: 3, type: 'Paid Time Off', start: 'Jan 01, 2024', end: 'Jan 05, 2024', days: 5, status: 'Approved' },
    ];

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

            {/* Balance Cards */}
            <div className="grid-balance">
                <div className="card balance-card">
                    <span className="balance-label">Paid Time Off</span>
                    <div className="balance-value">
                        <span className="big">12</span> <span className="total">/ 20</span>
                    </div>
                    <p className="text-xs text-secondary">Days Available</p>
                </div>
                <div className="card balance-card">
                    <span className="balance-label">Sick Leave</span>
                    <div className="balance-value">
                        <span className="big">5</span> <span className="total">/ 7</span>
                    </div>
                    <p className="text-xs text-secondary">Days Available</p>
                </div>
            </div>

            {/* History Table */}
            <div className="card p-0 overflow-hidden">
                <div className="table-header p-4 border-b">
                    <h3 className="text-lg">Request History</h3>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th align="left">Type</th>
                            <th align="left">Duration</th>
                            <th align="left">Days</th>
                            <th align="left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req.id} className="hover-row">
                                <td>{req.type}</td>
                                <td>{req.start} - {req.end}</td>
                                <td>{req.days} Days</td>
                                <td><StatusBadge status={req.status} /></td>
                            </tr>
                        ))}
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
           display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;
         }
         .balance-card { padding: 20px; }
         .balance-label { font-size: 0.9rem; color: var(--color-text-secondary); font-weight: 500; }
         .balance-value { margin: 8px 0; }
         .balance-value .big { font-size: 2rem; font-weight: 700; color: var(--color-text-main); }
         .balance-value .total { font-size: 1.1rem; color: var(--color-text-muted); }

         .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
         .input-field {
            width: 100%; padding: 10px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: inherit;
         }
         .table-header { padding: 16px 24px; border-bottom: 1px solid var(--color-border); }
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
