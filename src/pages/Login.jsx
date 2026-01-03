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
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-wrapper">
            <img src="/dayflow-logo.png" alt="Dayflow Logo" className="logo-img" />
            <span className="logo-text">DayFlow</span>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your workspace</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-label">Email Address or Employee ID</label>
            <div className="input-has-icon">
              <User size={20} className="field-icon" />
              <input
                type="text"
                placeholder="email@company.com or EMP1234"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="input-has-icon">
              <Lock size={20} className="field-icon" />
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <a href="/signup" className="link-text">Create an account</a>
          </p>
        </div>
      </div>

      <style>{`
        .auth-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('/auth-bg.jpg') no-repeat center center fixed;
          background-size: cover;
          padding: 20px;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.02),
            0 12px 32px -4px rgba(0, 0, 0, 0.08); /* Premium deep shadow */
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          flex-direction: column;
          gap: 32px;
          animation: slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .auth-header {
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .logo-wrapper {
          display: flex; align-items: center; gap: 8px; /* Slightly tighter gap */
          margin-bottom: 20px; /* Reduced from 24px */
        }
        .logo-img {
          width: 36px; height: 36px; object-fit: contain; /* Slightly smaller logo */
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem; font-weight: 600; color: #0f172a; /* Slightly lighter weight */
          letter-spacing: -0.02em;
        }
        .auth-title {
          font-size: 1.6rem; font-weight: 700; color: #0f172a;
          margin: 0 0 2px 0; letter-spacing: -0.03em;
          line-height: 1.2;
        }
        .auth-subtitle {
          font-size: 0.95rem; color: #64748b; margin: 0;
          font-weight: 400; letter-spacing: -0.01em;
        }

        /* Form */
        .auth-form { display: flex; flex-direction: column; gap: 20px; }
        
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .input-label {
          font-size: 0.9rem; font-weight: 500; color: #334155;
        }
        
        .input-has-icon { position: relative; }
        .field-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; transition: color 0.2s;
        }
        
        .input-field {
          width: 100%;
          padding: 12px 16px 12px 44px; /* Space for icon */
          font-size: 1rem; color: #0f172a;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-field:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .input-field:focus + .field-icon { color: var(--color-primary); } /* Select sibling icon if possible, but structure prevents css selection easily without reordering. React handles focus state usually, but pure css pseudo-class works better on input. */
        .input-field:focus ~ .field-icon { color: var(--color-primary); } /* Correct sibling selector if icon is AFTER input */
        /* Since icon is BEFORE, we can't select it with sibling. We'll stick to simple css or use focus-within on wrapper */
        .input-has-icon:focus-within .field-icon { color: var(--color-primary); }

        .btn-submit {
          margin-top: 8px;
          padding: 14px;
          background: linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%);
          color: white; border: none; border-radius: 12px;
          font-size: 1rem; font-weight: 600; cursor: pointer;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          transition: transform 0.1s, box-shadow 0.2s;
        }
        .btn-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 16px rgba(37, 99, 235, 0.4);
        }
        .btn-submit:active { transform: translateY(0); }

        .error-banner {
          background: #fef2f2; border: 1px solid #fee2e2; color: #dc2626;
          padding: 12px; border-radius: 8px; font-size: 0.9rem; text-align: center;
        }

        /* Footer */
        .auth-footer { text-align: center; font-size: 0.95rem; color: #64748b; }
        .link-text {
          color: var(--color-primary); font-weight: 600; text-decoration: none;
        }
        .link-text:hover { text-decoration: underline; }

      `}</style>
    </div>
  );
};

export default Login;
