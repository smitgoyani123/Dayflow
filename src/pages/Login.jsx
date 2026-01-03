import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/employees');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="logo-placeholder">
            <div className="logo-icon">D</div>
            <span className="logo-text">Dayflow</span>
          </div>
          <h1 className="text-xl">Sign In</h1>
          <p className="text-muted text-sm">Welcome back to your workspace</p>
        </div>

        {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

        <form className="auth-form flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-sm text-secondary">Login ID or Email</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Enter your ID or Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="text-sm text-secondary">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Sign In
          </button>
        </form>

        <div className="auth-footer text-center text-sm">
          <p className="text-muted">
            Don't have an account? <a href="/signup" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Sign Up</a>
          </p>
        </div>
      </div>

      <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-bg);
          padding: 16px;
        }
        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .auth-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .logo-placeholder {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--color-primary);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .logo-text {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--color-text-main);
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 4px;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--color-text-muted);
        }
        .input-field {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: var(--color-primary);
        }
        .auth-footer {
          margin-top: 16px;
        }
        .text-center { text-align: center; }
      `}</style>
    </div>
  );
};

export default Login;
