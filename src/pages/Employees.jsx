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
                <button className="btn-new">
                    <Plus size={18} />
                    <span>Add New Employee</span>
                </button>

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
            display: flex; align-items: center; gap: 8px;
            background-color: var(--color-primary); /* Use primary blue instead of purple */
            color: white; border: none; padding: 10px 20px; font-weight: 600;
            border-radius: 8px; cursor: pointer; font-size: 0.95rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* Subtle shadow */
            transition: all 0.2s ease;
        }
        .btn-new:hover { 
            background-color: #1d4ed8; /* Slightly darker blue */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .btn-new:active { transform: translateY(1px); }

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
        
        /* Card Styles - Premium Visual Elevation */
        .employee-card {
            position: relative; 
            background: linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%); /* Subtle gradient/texture */
            border: 1px solid rgba(226, 232, 240, 0.8); /* Low contrast border */
            border-radius: 20px; /* Increased radius */
            padding: 32px;
            display: flex; align-items: center; gap: 32px;
            /* Layered shadows for depth */
            box-shadow: 
                0 4px 6px -1px rgba(0, 0, 0, 0.02), 
                0 2px 4px -1px rgba(0, 0, 0, 0.02);
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); /* 200ms smooth transition */
            text-decoration: none; color: inherit;
            min-height: 140px;
        }
        
        .employee-card:hover {
            transform: translateY(-4px); /* Subtle lift */
            /* Enhanced shadow on hover */
            box-shadow: 
                0 20px 25px -5px rgba(0, 0, 0, 0.05), 
                0 10px 10px -5px rgba(0, 0, 0, 0.01);
            border-color: rgba(203, 213, 225, 0.8); /* Slightly clearer border on hover */
        }

        /* Avatar - Premium Treatment */
        .card-avatar {
            width: 80px; height: 80px; flex-shrink: 0;
            border-radius: 20px; /* Slight squiggle/rounded sq logic */
            overflow: hidden;
            /* Premium 'Picture Frame' Style */
            border: 2px solid #ffffff; /* Inner white border for clean separation */
            display: block; /* Ensure block layout for shadow */
            box-shadow: 0 0 0 1px #cbd5e1, 0 2px 4px rgba(0,0,0,0.05); /* Outer slate ring + depth shadow */
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .card-avatar img { width: 100%; height: 100%; object-fit: cover; }

        /* Info - Typography Refinement */
        .card-info {
            display: flex; flex-direction: column; justify-content: center;
            overflow: hidden;
            flex: 1;
            gap: 4px; /* Tighter gap */
        }
        .emp-name {
            font-weight: 700; font-size: 1.25rem; color: #1e293b; /* Reduced from 1.4rem */
            letter-spacing: -0.02em; line-height: 1.3;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .emp-role {
            font-size: 0.95rem; color: #64748b; margin-top: 2px; /* Reduced margin */
            font-weight: 500; letter-spacing: 0.01em;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Status Top Right */
        .card-status {
            position: absolute; top: 20px; right: 20px;
        }
        
        /* Status Dot Styles - Soft Glow */
        .status-dot-container {
            width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
            border-radius: 50%;
            position: relative;
            /* Base glow for all */
            box-shadow: 0 0 0 1px rgba(255,255,255,0.8);
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

        @keyframes blink-blue {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); opacity: 1; }
            50% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); opacity: 0.8; }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); opacity: 1; }
        }

        .status-dot-container.green { 
            background-color: #dcfce7;
            animation: blink-green 3s infinite;
        }
        .status-dot-container.yellow { 
            background-color: #fef9c3;
            animation: blink-yellow 3s infinite;
        }
        .status-dot-container.blue { 
            background-color: #dbeafe; 
            animation: blink-blue 3s infinite; /* Added blink animation */
        }

        .status-dot { width: 10px; height: 10px; border-radius: 50%; }
        .status-dot.green-fill { background-color: #22c55e; }
        .status-dot.yellow-fill { background-color: #ca8a04; }
        /* Tilted plane icon - Default is already tilted Top-Right */
        .plane-icon { color: #2563eb; display:block; }

      `}</style>
        </div>
    );
};

export default Employees;
