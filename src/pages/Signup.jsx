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
      <div className="auth-card card">
        <div className="auth-header">
          <div className="logo-placeholder">
            <div className="logo-icon">D</div>
            <span className="logo-text">Dayflow</span>
          </div>
          <h1 className="text-xl">Create Organization</h1>
          <p className="text-muted text-sm">Register your company and admin account</p>
        </div>

        {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

        <form className="auth-form flex flex-col gap-4" onSubmit={handleSubmit}>

          {/* Company Details */}
          <div className="form-section">
            <h3 className="section-title">Company Details</h3>

            <div className="form-group">
              <label className="text-sm text-secondary">Company Name</label>
              <div className="input-wrapper">
                <Building size={18} className="input-icon" />
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
            {/* 
                        <div className="form-group">
                            <label className="text-sm text-secondary">Company Logo</label>
                            <div className="file-upload-wrapper">
                                <Upload size={18} className="input-icon" />
                                <span className="text-sm text-muted">Upload Logo (PNG, JPG)</span>
                                <input type="file" className="file-input" />
                            </div>
                        </div> */}
          </div>

          <div className="divider"></div>

          {/* Admin Details */}
          <div className="form-section">
            <h3 className="section-title">Admin Account</h3>

            <div className="form-group">
              <label className="text-sm text-secondary">Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
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
              <label className="text-sm text-secondary">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
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
              <label className="text-sm text-secondary">Phone Number</label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
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

            <div className="form-row">
              <div className="form-group">
                <label className="text-sm text-secondary">Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
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
                <label className="text-sm text-secondary">Confirm</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
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

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            Register Company
          </button>
        </form>

        <div className="auth-footer text-center text-sm">
          <p className="text-muted">
            Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Sign In</Link>
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
          padding: 24px;
        }
        .auth-card {
          width: 100%;
          max-width: 480px; /* Slightly wider for signup */
          padding: 32px;
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
          margin-bottom: 16px;
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
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .section-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-main);
          margin-bottom: 4px;
        }
        .divider {
          height: 1px;
          background-color: var(--color-divider);
          margin: 4px 0;
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
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: var(--color-primary);
        }
        
        .file-upload-wrapper {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          gap: 12px;
        }
        .file-input {
          display: none; /* Hide default input, implementation detail */
        }
        
        .form-row {
          display: flex;
          gap: 12px;
        }
        .form-row .form-group {
          flex: 1;
        }

        .auth-footer {
          margin-top: 8px;
        }
        .text-center { text-align: center; }
      `}</style>
    </div>
  );
};

export default Signup;
