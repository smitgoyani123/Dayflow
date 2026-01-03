import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { User, Clock, Check, Loader2, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TopNav = ({ status = 'offline', onToggleCheckIn }) => {
  const { user } = useAuth();
  const [checkInTime, setCheckInTime] = useState(null);

  useEffect(() => {
    if (status === 'online' && !checkInTime) {
      setCheckInTime(new Date());
    } else if (status === 'offline') {
      setCheckInTime(null);
    }
  }, [status]);

  return (
    <nav className="top-nav">
      <div className="container nav-content">

        {/* Left Section: Logo + Separator + Tabs */}
        <div className="nav-left">
          {/* Logo */}
          <div className="nav-logo">
            <img
              src={user?.employeeDetails?.companyLogo || "/dayflow-logo.png"}
              alt="Logo"
              className={`logo-img ${user?.employeeDetails?.companyLogo ? 'company-logo-main' : ''}`}
            />
            <span className="logo-text">DayFlow</span>
          </div>

          <div className="nav-divider"></div>

          {/* Main Navigation Tabs */}
          <div className="nav-tabs">
            <NavLink to="/employees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              Employees
            </NavLink>
            <NavLink to="/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              Attendance
            </NavLink>
            <NavLink to="/time-off" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              Time Off
            </NavLink>
          </div>
        </div>

        {/* Right Section: Actions (Check-In + Profile) */}
        <div className="nav-right">

          {/* Check-In Control */}
          <CheckInPill
            status={status}
            onToggle={onToggleCheckIn}
            checkInTime={checkInTime}
          />

          {/* Profile Dropdown */}
          <div className="profile-wrapper">
            <div className="avatar-trigger">
              <div className="avatar-img">
                <User size={20} />
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="dropdown-menu">
              <div className="dropdown-header">Overview</div>
              <NavLink to="/profile/me" className="dropdown-link">My Profile</NavLink>
              <div className="dropdown-sep" />
              <NavLink to="/login" className="dropdown-link text-red">Log Out</NavLink>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* Navbar Layout */
        .top-nav {
          height: 64px;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          position: sticky; top: 0; z-index: 100;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        }
        .nav-content {
          height: 100%; display: flex; align-items: center; justify-content: space-between;
        }

        /* Left Section */
        .nav-left { display: flex; align-items: center; height: 100%; }

        .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .logo-img {
          width: 32px; height: 32px; object-fit: contain;
        }
        .logo-text { 
           font-family: 'Outfit', sans-serif; /* accessible if imported in index.html, else falls back */
           font-weight: 700; 
           font-size: 1.25rem; 
           color: #0f172a; 
           letter-spacing: -0.03em; 
        } /* Premium, darker, tighter */

        .nav-divider { 
          width: 1px; height: 20px; background-color: #e2e8f0; 
          margin: 0 24px; 
        }

        /* Tabs */
        .nav-tabs { display: flex; gap: 24px; height: 100%; }
        .nav-item {
          position: relative;
          display: flex; align-items: center;
          height: 100%;
          font-size: 0.95rem; font-weight: 500; color: #64748b; /* Muted gray */
          text-decoration: none; transition: color 0.15s ease;
        }
        .nav-item:hover { color: #0f172a; } /* Darker on hover */

        .nav-item.active {
          color: var(--color-primary);
          font-weight: 600;
        }
        /* Active Indicator removed as per request */
        .nav-item.active::after {
          content: none;
        }

        /* Right Section - Tighter spacing and vertical centering */
        .nav-right { display: flex; align-items: center; gap: 10px; }

        /* Profile Styles */
        .profile-wrapper { position: relative; }
        .avatar-trigger { cursor: pointer; }
        .avatar-img {
          width: 36px; height: 36px; 
          background-color: #f1f5f9; border: 1px solid #e2e8f0;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: #64748b; transition: all 0.2s;
        }
        .avatar-trigger:hover .avatar-img { border-color: #cbd5e1; color: #0f172a; }

        .dropdown-menu {
          position: absolute; top: 120%; right: 0; width: 180px;
          background: white; border: 1px solid #e2e8f0;
          border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-top: 2px solid transparent; 
          display: none; flex-direction: column; padding: 6px; z-index: 50;
        }
        /* Invisible bridge to prevent closing on hover gap */
        .dropdown-menu::before {
            content: '';
            position: absolute;
            top: -20px; /* Bridge the gap to the trigger */
            left: 0;
            width: 100%;
            height: 20px;
            background: transparent;
        }
        .profile-wrapper:hover .dropdown-menu { display: flex; }

        .dropdown-header {
           padding: 8px 12px; font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;
        }
        .dropdown-link {
          padding: 8px 12px; font-size: 0.9rem; color: #334155; 
          border-radius: 4px; text-decoration: none; transition: background 0.1s;
        }
        .dropdown-link:hover { background-color: #f8fafc; color: var(--color-primary); }
        .dropdown-sep { height: 1px; background-color: #e2e8f0; margin: 4px 0; }
        .text-red { color: #ef4444; }
        .text-red:hover { background-color: #fef2f2; color: #dc2626; }

        .company-logo-main {
            height: 32px; width: auto !important; max-width: 140px;
            object-fit: contain;
        }

      `}</style>
    </nav>
  );
};

/* --- Check-In Pill Component --- */
const CheckInPill = ({ status, onToggle, checkInTime }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  const isCheckedIn = status === 'online';

  const formatTime = (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (isCheckedIn) setIsDropdownOpen(!isDropdownOpen);
    else performAction();
  };

  const performAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      onToggle();
      setIsLoading(false);
      setIsDropdownOpen(false);
    }, 600);
  };

  return (
    <div className="checkin-container" ref={containerRef}>
      <button
        className={`pill-btn ${isCheckedIn ? 'active' : 'inactive'} ${isLoading ? 'loading' : ''}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        {/* Icon */}
        <div className="pill-icon">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> :
            isCheckedIn ? <Check size={16} /> : <Clock size={16} />}
        </div>

        {/* Text */}
        <div className="pill-text">
          {isCheckedIn ? (
            <>Checked In <span className="pill-subtext">· {formatTime(checkInTime)}</span></>
          ) : 'Check In'}
        </div>

        {/* Status Dot */}
        <div className={`pill-dot ${isCheckedIn ? 'green' : 'red'}`} />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && isCheckedIn && (
        <div className="pill-dropdown">
          <button className="pill-action" onClick={performAction}>
            <LogOut size={16} /> Check Out
          </button>
        </div>
      )}

      <style>{`
                .checkin-container { position: relative; }

                .pill-btn {
                    display: flex; align-items: center; gap: 10px;
                    padding: 8px 16px;
                    border-radius: 100px;
                    font-size: 0.85rem; font-weight: 600;
                    border: 1px solid transparent; cursor: pointer;
                    transition: all 0.2s ease;
                }

                /* Inactive: White bg, gray text, red dot */
                .pill-btn.inactive {
                    background: white; border-color: #e2e8f0; color: #475569;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }
                .pill-btn.inactive:hover { background: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
                .pill-btn.inactive .pill-icon { color: #94a3b8; }

                /* Active: Green tint, green text, green dot */
                .pill-btn.active {
                    background: #f0fdf4; border-color: #bbf7d0; color: #166534;
                }
                .pill-btn.active:hover { background: #dcfce7; }
                
                .pill-text { display: flex; align-items: center; gap: 5px; }
                .pill-subtext { font-weight: 400; opacity: 0.8; font-size: 0.8em; }

                /* Dots */
                .pill-dot { width: 8px; height: 8px; border-radius: 50%; }
                .pill-dot.red { background: #ef4444; }
                .pill-dot.green { background: #22c55e; box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2); }

                /* Dropdown */
                .pill-dropdown {
                    position: absolute; top: calc(100% + 8px); right: 0;
                    background: white; border: 1px solid #e2e8f0;
                    border-radius: 8px; padding: 4px;
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                    min-width: 140px;
                }
                .pill-action {
                    display: flex; align-items: center; gap: 8px;
                    width: 100%; padding: 8px 12px;
                    border: none; background: transparent;
                    color: #ef4444; font-size: 0.9rem; font-weight: 500;
                    border-radius: 4px; cursor: pointer; text-align: left;
                }
                .pill-action:hover { background: #fef2f2; }
                
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
    </div>
  );
};

export default TopNav;
