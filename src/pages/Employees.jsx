import React from 'react';
import { Search, MapPin, Plane, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Employees = () => {
    // Mock Data
    const employees = [
        { id: 1, name: 'Alex Johnson', role: 'Software Engineer', dept: 'Engineering', status: 'present', image: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Sarah Wilson', role: 'Product Designer', dept: 'Design', status: 'leave', image: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Michael Chen', role: 'Product Manager', dept: 'Product', status: 'present', image: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Emily Davis', role: 'HR Manager', dept: 'Human Resources', status: 'absent', image: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'David Kim', role: 'Frontend Dev', dept: 'Engineering', status: 'present', image: 'https://i.pravatar.cc/150?u=5' },
        { id: 6, name: 'Lisa Pat', role: 'Marketing', dept: 'Growth', status: 'present', image: 'https://i.pravatar.cc/150?u=6' },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'present': return <div className="status-indicator online"></div>;
            case 'leave': return <Plane size={16} className="text-orange" />;
            case 'absent': return <div className="status-indicator absent"></div>;
            default: return null;
        }
    };

    return (
        <div className="page-container flex flex-col gap-4">

            {/* Page Header */}
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1 className="text-2xl">Employees</h1>
                    <p className="text-muted text-sm">Manage your team and view attendance</p>
                </div>
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search employees..." className="search-input" />
                </div>
            </div>

            {/* Stats Row (Optional, consistent with dashboard feel) */}
            <div className="stats-grid">
                <div className="card stat-card">
                    <span className="stat-label">Total Employees</span>
                    <span className="stat-value">24</span>
                </div>
                <div className="card stat-card">
                    <span className="stat-label">Present Today</span>
                    <span className="stat-value text-green">18</span>
                </div>
                <div className="card stat-card">
                    <span className="stat-label">On Leave</span>
                    <span className="stat-value text-orange">3</span>
                </div>
                <div className="card stat-card">
                    <span className="stat-label">Absent</span>
                    <span className="stat-value text-red">1</span>
                </div>
            </div>

            {/* Employee Grid */}
            <div className="employee-grid">
                {employees.map((emp) => (
                    <Link to={`/profile/${emp.id}`} key={emp.id} className="card employee-card">
                        <div className="card-status top-right">
                            {getStatusIcon(emp.status)}
                        </div>

                        <div className="emp-avatar">
                            <img src={emp.image} alt={emp.name} />
                        </div>

                        <div className="emp-info text-center">
                            <h3 className="text-lg">{emp.name}</h3>
                            <p className="text-sm text-secondary">{emp.role}</p>
                            <span className="badge">{emp.dept}</span>
                        </div>

                        <div className="emp-footer">
                            <span className="text-xs text-muted">ID: DAY{emp.id + 2020}00{emp.id}</span>
                        </div>
                    </Link>
                ))}
            </div>

            <style>{`
        .page-container {
          width: 100%;
        }
        .page-header {
          margin-bottom: 16px;
        }
        .search-bar {
          position: relative;
          width: 300px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-muted);
        }
        .search-input {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          outline: none;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stat-label { color: var(--color-text-secondary); font-size: 0.9rem; }
        .stat-value { font-size: 2rem; font-weight: 700; color: var(--color-text-main); }
        .text-green { color: var(--color-status-green); }
        .text-orange { color: #f97316; }
        .text-red { color: var(--color-status-red); }

        .employee-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .employee-card {
          position: relative;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .employee-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .card-status {
          position: absolute;
          top: 16px;
          right: 16px;
        }
        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .status-indicator.online { background-color: var(--color-status-green); }
        .status-indicator.absent { background-color: var(--color-status-yellow); }

        .emp-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          background: var(--color-bg);
        }
        .emp-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badge {
          display: inline-block;
          margin-top: 8px;
          padding: 4px 12px;
          background-color: var(--color-bg);
          border-radius: 100px;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          font-weight: 500;
        }
        .emp-footer {
          margin-top: 8px;
        }
      `}</style>
        </div>
    );
};

export default Employees;
