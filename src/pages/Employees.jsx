import React from 'react';
import { Search, Plane, Plus } from 'lucide-react';
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
            case 'present': return (
                <div className="status-dot-container green" title="Present">
                    <div className="status-dot green-fill" />
                </div>
            );
            case 'leave': return (
                <div className="status-dot-container blue" title="On Leave">
                    <Plane size={14} className="plane-icon" />
                </div>
            );
            case 'absent': return (
                <div className="status-dot-container yellow" title="Absent">
                    <div className="status-dot yellow-fill" />
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="page-container flex flex-col gap-6">

            {/* Toolbar: NEW Button + Search */}
            <div className="toolbar-header">
                <button className="btn-new">NEW</button>

                <div className="search-wrapper">
                    <input type="text" placeholder="Search" className="search-input" />
                    <Search size={16} className="search-icon" />
                </div>
            </div>

            {/* Employee Grid */}
            <div className="employee-grid">
                {employees.map((emp) => (
                    <Link to={`/profile/${emp.id}`} key={emp.id} className="card employee-card">

                        {/* Left Box: Avatar */}
                        <div className="card-avatar">
                            <img src={emp.image} alt={emp.name} />
                        </div>

                        {/* Middle Box: Info */}
                        <div className="card-info">
                            <div className="emp-name">{emp.name}</div>
                            <div className="emp-role">{emp.role}</div>
                        </div>

                        {/* Right Box: Status (Absolute top-right to match spec "Top-right corner") */}
                        <div className="card-status">
                            {getStatusIcon(emp.status)}
                        </div>

                    </Link>
                ))}
            </div>

            <style>{`
        .page-container { width: 100%; }
        
        /* Toolbar */
        .toolbar-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 8px 0; border-bottom: 2px solid #f1f5f9; margin-bottom: 24px;
        }
        .btn-new {
            background-color: #a855f7; /* Purple accent */
            color: white; border: none; padding: 10px 28px; font-weight: 700;
            border-radius: 6px; cursor: pointer; letter-spacing: 0.5px;
            box-shadow: 0 4px 6px -1px rgba(168, 85, 247, 0.4);
            transition: transform 0.1s;
        }
        .btn-new:active { transform: scale(0.98); }

        .search-wrapper { position: relative; width: 320px; }
        .search-input {
            width: 100%; padding: 10px 16px; padding-right: 40px;
            border: 2px solid #e2e8f0; border-radius: 100px;
            outline: none; background: white; font-size: 0.9rem;
            transition: border-color 0.2s;
        }
        .search-input:focus { border-color: #a855f7; }
        .search-icon {
            position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--color-text-muted);
        }

        /* Grid - Compacter cards to fit more in row and minimize gaps */
        .employee-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;
        }
        
        /* Card Styles - Doubled Size */
        .employee-card {
            position: relative; 
            background: white;
            border: 1px solid var(--color-border);
            border-radius: 16px; 
            padding: 32px; /* Doubled padding */
            display: flex; align-items: center; gap: 32px; /* Doubled gap */
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: all 0.2s ease-in-out;
            text-decoration: none; color: inherit;
            min-height: 140px; /* Increased height significantly */
        }
        
        .employee-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border-color: #e2e8f0;
        }

        /* Avatar - Square and Larger */
        .card-avatar {
            width: 80px; height: 80px; flex-shrink: 0;
            border-radius: 12px; /* Square with rounded corners */
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        .card-avatar img { width: 100%; height: 100%; object-fit: cover; }

        /* Info - Scaled up text */
        .card-info {
            display: flex; flex-direction: column; justify-content: center;
            overflow: hidden;
            flex: 1;
        }
        .emp-name {
            font-weight: 700; font-size: 1.4rem; color: var(--color-text-main);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .emp-role {
            font-size: 1.1rem; color: var(--color-text-secondary); margin-top: 6px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Status Top Right */
        .card-status {
            position: absolute; top: 16px; right: 16px;
        }
        
        /* Status Dot Styles */
        .status-dot-container {
            width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
            border-radius: 50%;
            position: relative;
        }
        
        /* Blink/Pulse Animations */
        @keyframes blink-green {
            0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); opacity: 1; }
            50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); opacity: 0.8; }
            100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); opacity: 1; }
        }
        @keyframes blink-yellow {
            0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); opacity: 1; }
            50% { box-shadow: 0 0 0 6px rgba(234, 179, 8, 0); opacity: 0.8; }
            100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); opacity: 1; }
        }

        .status-dot-container.green { 
            background-color: #dcfce7;
            animation: blink-green 3s infinite;
        }
        .status-dot-container.yellow { 
            background-color: #fef9c3;
            animation: blink-yellow 3s infinite;
        }
        .status-dot-container.blue { background-color: #dbeafe; } /* No blink for leave usually, or add if wanted */

        .status-dot { width: 10px; height: 10px; border-radius: 50%; }
        .status-dot.green-fill { background-color: #22c55e; }
        .status-dot.yellow-fill { background-color: #ca8a04; }
        .plane-icon { color: #2563eb; transform: rotate(-45deg); display:block;}

      `}</style>
        </div>
    );
};

export default Employees;
