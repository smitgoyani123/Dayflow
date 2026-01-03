import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/TopNav';
import CheckInWidget from '../components/CheckInWidget';

const MainLayout = () => {
    const [status, setStatus] = useState('offline'); // 'online' | 'offline'

    const handleToggleCheckIn = () => {
        setStatus(prev => prev === 'online' ? 'offline' : 'online');
    };

    return (
        <div className="app-layout">
            {/* Pass status to TopNav to update the dot */}
            <TopNav status={status} />

            <main className="main-content container">
                <Outlet />
            </main>

            <CheckInWidget status={status} onToggle={handleToggleCheckIn} />

            <style>{`
        .app-layout {
          min-height: 100vh;
          background-color: var(--color-bg);
          position: relative; /* Context for fixed widget if needed */
        }
        .main-content {
          padding-top: 32px;
          padding-bottom: 80px; /* Space for widget on mobile if needed */
        }
      `}</style>
        </div>
    );
};

export default MainLayout;
