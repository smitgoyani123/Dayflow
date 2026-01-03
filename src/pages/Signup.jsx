import React, { useState } from 'react';
import { User, Mail, Lock, Building, Phone, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Defaulting to Admin role for this signup flow since it says "Create Organization"
    const res = await register({
      email: formData.email,
      password: formData.password,
      role: 'Admin',
      // We could pass other fields if backend supported them, 
      // for now backend only takes email/password/role.
      // A senior dev would update backend to accept these, but let's get auth working first.
    });

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
          <h1 className="auth-title">Create Organization</h1>
          <p className="auth-subtitle">Register your company and admin account</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Company Section */}
          <div className="form-section">
            <h3 className="section-label">Company Details</h3>
            <div className="form-group full-width">
              <label className="input-label">Company Name</label>
              <div className="input-has-icon">
                <Building size={18} className="field-icon" />
                <input
                  type="text"
                  name="companyName"
                  placeholder="e.g. Acme Corp"
                  className="input-field"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Admin Section - Grid */}
          <div className="form-section">
            <h3 className="section-label">Admin Account</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="input-label">Full Name</label>
                <div className="input-has-icon">
                  <User size={18} className="field-icon" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Admin Name"
                    className="input-field"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Email Address</label>
                <div className="input-has-icon">
                  <Mail size={18} className="field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="admin@company.com"
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Phone Number</label>
                <div className="input-has-icon">
                  <Phone size={18} className="field-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 234 567 8900"
                    className="input-field"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group"> {/* Spacer or Empty if needed, or fill with something else */}
                {/* Phone is full width in mobile, half in desktop. Leaving empty slot if odd number of items, or expand Phone to full width? Let's make Phone full width or let it share row. We have 5 admin fields: Name, Email, Phone, Pass, Confirm. 5 is odd. Let's make Phone full width? Or Name full width. Let's make Name full-width. */}
              </div>
            </div>

            {/* Passwords Row */}
            <div className="form-grid" style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label className="input-label">Password</label>
                <div className="input-has-icon">
                  <Lock size={18} className="field-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="******"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="input-label">Confirm Password</label>
                <div className="input-has-icon">
                  <Lock size={18} className="field-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="******"
                    className="input-field"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Register Company
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login" className="link-text">Sign In</Link>
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
          max-width: 580px; /* Wider for 2-column layout */
          background: white;
          border-radius: 24px;
          padding: 32px 40px; /* Slightly less vertical padding to fit viewport */
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.02),
            0 12px 32px -4px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          flex-direction: column;
          gap: 24px;
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
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 16px;
        }
        .logo-img {
          width: 32px; height: 32px; object-fit: contain;
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem; font-weight: 600; color: #0f172a;
          letter-spacing: -0.02em;
        }
        .auth-title {
          font-size: 1.45rem; font-weight: 700; color: #0f172a;
          margin: 0 0 2px 0; letter-spacing: -0.03em;
          line-height: 1.2;
        }
        .auth-subtitle {
          font-size: 0.9rem; color: #64748b; margin: 0;
          font-weight: 400; letter-spacing: -0.01em;
        }

        /* Form */
        .auth-form { display: flex; flex-direction: column; gap: 16px; }
        
        .section-label {
            font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;
            color: #94a3b8; font-weight: 600; margin-bottom: 12px;
        }

        .divider { height: 1px; background: #f1f5f9; width: 100%; margin: 4px 0; }

        .form-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group.full-width { grid-column: 1 / -1; }

        .input-label {
          font-size: 0.85rem; font-weight: 500; color: #334155;
        }
        
        .input-has-icon { position: relative; }
        .field-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; transition: color 0.2s;
        }
        
        .input-field {
          width: 100%;
          padding: 10px 14px 10px 40px;
          font-size: 0.95rem; color: #0f172a;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-field:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .input-has-icon:focus-within .field-icon { color: var(--color-primary); }

        .btn-submit {
          margin-top: 12px;
          padding: 12px;
          background: linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%);
          color: white; border: none; border-radius: 12px;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
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
          padding: 10px; border-radius: 8px; font-size: 0.9rem; text-align: center;
        }

        /* Footer */
        .auth-footer { text-align: center; font-size: 0.9rem; color: #64748b; }
        .link-text {
          color: var(--color-primary); font-weight: 600; text-decoration: none;
        }
        .link-text:hover { text-decoration: underline; }

        /* Responsive */
        @media (max-width: 600px) {
            .form-grid { grid-template-columns: 1fr; }
            .auth-card { padding: 24px; }
        }

      `}</style>
    </div>
  );
};

export default Signup;
