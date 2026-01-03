import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const CheckInWidget = ({ status, onToggle }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const isCheckedIn = status === 'online';

    return (
        <div className="check-in-widget card">
            <div className="widget-header">
                <div className="flex flex-col">
                    <span className="text-xs text-muted">Current Time</span>
                    <span className="text-xl">{formatTime(time)}</span>
                </div>

                {isCheckedIn && (
                    <div className="status-badge green">
                        <span className="dot"></span> Checked In
                    </div>
                )}
            </div>

            <button
                className={`btn action-btn ${isCheckedIn ? 'btn-checkout' : 'btn-checkin'}`}
                onClick={onToggle}
            >
                {isCheckedIn ? 'Check Out' : 'Check In'}
            </button>

            {isCheckedIn && (
                <p className="timer-text">Since 09:00 AM</p>
            )}

            <style>{`
        .check-in-widget {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 200px;
          padding: 16px;
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 100px;
          font-weight: 500;
        }
        .status-badge.green {
          background-color: #dcfce7;
          color: #166534;
        }
        .dot {
          width: 6px;
          height: 6px;
          background-color: currentColor;
          border-radius: 50%;
        }

        .action-btn {
          width: 100%;
          padding: 10px;
          font-weight: 600;
        }
        .btn-checkin {
          background-color: var(--color-primary);
          color: white;
        }
        .btn-checkin:hover {
          background-color: var(--color-primary-hover);
        }
        .btn-checkout {
          background-color: white;
          border: 1px solid var(--color-status-red);
          color: var(--color-status-red);
        }
        .btn-checkout:hover {
          background-color: #fef2f2;
        }

        .timer-text {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-align: center;
        }
      `}</style>
        </div>
    );
};

export default CheckInWidget;
