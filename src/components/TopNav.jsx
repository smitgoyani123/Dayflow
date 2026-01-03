import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

const TopNav = ({ status = 'offline' }) => {
    return (
        <nav className="top-nav">
            <div className="container nav-content">

                {/* Left: Logo */}
                <div className="nav-logo">
                    <div className="logo-icon-sm">D</div>
                    <span className="logo-text-sm">Dayflow</span>
                </div>

                {/* Center: Tabs */}
                <div className="nav-tabs">
                    <NavLink to="/employees" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Employees
                    </NavLink>
                    <NavLink to="/attendance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Attendance
                    </NavLink>
                    <NavLink to="/time-off" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Time Off
                    </NavLink>
                </div>

                {/* Right: User Widget */}
                <div className="nav-user">
                    <div className={`status-dot ${status === 'online' ? 'status-green' : 'status-red'}`}></div>
                    <div className="avatar-wrapper dropdown-trigger">
                        <div className="avatar">
                            <User size={20} />
                        </div>

                        {/* Dropdown (Simple CSS Hover or could be a state) */}
                        <div className="dropdown-menu">
                            <NavLink to="/profile/me" className="dropdown-item">My Profile</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink to="/login" className="dropdown-item text-red">Log Out</NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .top-nav {
          height: 64px;
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logo-icon-sm {
          width: 24px;
          height: 24px;
          background: var(--color-primary);
          color: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
        }
        .logo-text-sm {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--color-text-main);
        }
        
        .nav-tabs {
          display: flex;
          gap: 24px;
          height: 100%;
        }
        .nav-link {
          display: flex;
          align-items: center;
          height: 100%;
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .nav-link:hover {
          color: var(--color-primary);
        }
        .nav-link.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }

        .nav-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .status-green { background-color: var(--color-status-green); box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2); }
        .status-red { background-color: var(--color-status-red); box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2); }

        .avatar-wrapper {
          position: relative;
          cursor: pointer;
        }
        .avatar {
          width: 36px;
          height: 36px;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
        }
        
        /* Dropdown Logic */
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          width: 160px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          display: none;
          flex-direction: column;
          padding: 4px 0;
        }
        .avatar-wrapper:hover .dropdown-menu {
          display: flex;
        }
        .dropdown-item {
          padding: 8px 16px;
          font-size: 0.9rem;
          color: var(--color-text-main);
          transition: background 0.1s;
        }
        .dropdown-item:hover {
          background-color: var(--color-bg);
        }
        .dropdown-divider {
          height: 1px;
          background-color: var(--color-border);
          margin: 4px 0;
        }
        .text-red {
          color: var(--color-status-red);
        }
      `}</style>
        </nav>
    );
};

export default TopNav;
