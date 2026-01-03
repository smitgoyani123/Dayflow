import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

import MainLayout from './layout/MainLayout';
import Employees from './pages/Employees';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import TimeOff from './pages/TimeOff';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/profile/:id" element={<Profile />} />
            {/* Profile/me alias if needed, or redirect */}
            <Route path="/profile/me" element={<Profile />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/time-off" element={<TimeOff />} />
            <Route path="/" element={<Navigate to="/employees" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
