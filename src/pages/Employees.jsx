import React, { useState, useEffect } from 'react';
import { Search, Plane, Plus, Loader, X, Save } from 'lucide-react'; // Added X and Save icons
import { Link } from 'react-router-dom';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        department: '',
        salary: '',
        dateOfJoining: '',
        address: '',
        phoneNumber: ''
    });
    const [modalError, setModalError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/employees', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }

            const data = await response.json();
            setEmployees(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSaveEmployee = async (e) => {
        e.preventDefault();
        setSaving(true);
        setModalError('');

        // Basic Frontend Validation
        if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.salary) {
            setModalError('Please fill in all required fields.');
            setSaving(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('You must be logged in to perform this action.');
            }

            // Ensure salary is a number
            const payload = {
                ...newEmployee,
                salary: Number(newEmployee.salary)
            };

            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create employee');
            }

            // Success
            setEmployees([...employees, data]);
            setIsModalOpen(false);
            setNewEmployee({
                firstName: '', lastName: '', email: '', designation: '',
                department: '', salary: '', dateOfJoining: '', address: '', phoneNumber: ''
            });

        } catch (err) {
            console.error("Save Employee Error:", err);
            setModalError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const getStatusIcon = (status) => {
        // ... (Status logic remains, maybe mapped to backend status if different)
        // Assuming backend status maps to 'present', 'leave', 'absent'
        // If undefined, default to neutral
        status = status?.toLowerCase() || 'absent';
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
            default: return (
                <div className="status-dot-container yellow" title={status}>
                    <div className="status-dot yellow-fill" />
                </div>
            );
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-muted">Loading employees...</div>;
    // if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="page-container flex flex-col gap-6">

            {/* Toolbar: NEW Button + Search */}
            <div className="toolbar-header">
                <button className="btn-new" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} />
                    <span>Add New Employee</span>
                </button>

                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={16} className="search-icon" />
                </div>
            </div>

            {/* Employee Grid */}
            <div className="employee-grid">
                {filteredEmployees.map((emp) => (
                    <Link to={`/profile/${emp._id}`} key={emp._id} className="card employee-card">

                        {/* Left Box: Avatar */}
                        <div className="card-avatar">
                            <img src={emp.profilePicture || `https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}`} alt={emp.firstName} />
                        </div>

                        {/* Middle Box: Info */}
                        <div className="card-info">
                            <div className="emp-name">{emp.firstName} {emp.lastName}</div>
                            <div className="emp-role">{emp.designation}</div>
                        </div>

                        {/* Right Box: Status (Absolute top-right to match spec "Top-right corner") */}
                        <div className="card-status">
                            {getStatusIcon('present')} {/* Mocking status for now as it's not in Employee model directly */}
                        </div>

                    </Link>
                ))}
            </div>

            {/* ADD EMPLOYEE MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content card">
                        <div className="modal-header">
                            <h2 className="text-xl font-bold">Add New Employee</h2>
                            <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {modalError && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded">{modalError}</div>}

                        <form onSubmit={handleSaveEmployee} className="modal-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" required className="input-field" onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" required className="input-field" onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" required className="input-field" onChange={handleInputChange} />
                                <span className="text-xs text-muted">Must match a registered user email (or implement auto-invite)</span>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input type="text" name="designation" required className="input-field" onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <input type="text" name="department" required className="input-field" onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date of Joining</label>
                                    <input type="date" name="dateOfJoining" required className="input-field" onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Salary (Monthly)</label>
                                    <input type="number" name="salary" required className="input-field" onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" name="address" required className="input-field" onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phoneNumber" required className="input-field" onChange={handleInputChange} />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Employee'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
        /* --- Ultra-Premium Card Styles --- */
        .page-container { 
            width: 100%; max-width: 1600px; margin: 0 auto; 
            padding: 0 8px;
        }
        
        /* Toolbar */
        .toolbar-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 12px 0; margin-bottom: 40px;
        }
        .btn-new {
            display: flex; align-items: center; gap: 10px;
            background: linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%);
            color: white; border: none; padding: 14px 28px; font-weight: 600;
            border-radius: 16px; cursor: pointer; font-size: 0.95rem;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3), 0 1px 2px rgba(255,255,255,0.2) inset;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            letter-spacing: 0.01em;
        }
        .btn-new:hover { 
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(37, 99, 235, 0.4), 0 1px 2px rgba(255,255,255,0.3) inset;
        }
        .btn-new:active { transform: translateY(0); }

        .search-wrapper { position: relative; width: 360px; }
        .search-input {
            width: 100%; padding: 14px 20px; padding-right: 48px;
            background: #ffffff; border: 1px solid #e2e8f0;
            border-radius: 16px; outline: none; font-size: 0.95rem; color: #0f172a;
            box-shadow: 0 2px 4px rgba(0,0,0,0.01);
            transition: all 0.2s ease;
        }
        .search-input:focus { 
            border-color: var(--color-primary); 
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .search-icon {
            position: absolute; right: 18px; top: 50%; transform: translateY(-50%); 
            color: #94a3b8; transition: color 0.2s;
        }
        .search-input:focus + .search-icon { color: var(--color-primary); }

        /* Grid - Generous Spacing */
        .employee-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 32px;
        }
        
        /* Card - "Designer Level" Appearance */
        .employee-card {
            position: relative; 
            background: #ffffff;
            border-radius: 32px; /* Smooth large radius */
            padding: 28px 32px; /* Generous padding */
            display: flex; align-items: center; gap: 24px;
            
            /* Clean border - barely visible to define edges */
            border: 1px solid rgba(226, 232, 240, 0.6);
            
            /* Sophisticated Shadow */
            box-shadow: 
                0 1px 2px rgba(0,0,0,0.02), 
                0 4px 16px rgba(0,0,0,0.02),
                0 24px 40px -8px rgba(0,0,0,0.04);
                
            transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
            text-decoration: none;
            overflow: hidden;
            z-index: 1;
        }
        
        /* Hover State - "Lift & Glow" */
        .employee-card:hover {
            transform: translateY(-8px);
            border-color: rgba(226, 232, 240, 0.8);
            box-shadow: 
                0 1px 2px rgba(0,0,0,0.02),
                0 12px 24px -4px rgba(0,0,0,0.06),
                0 40px 80px -12px rgba(0,0,0,0.08); /* Deep soft shadow */
            z-index: 10;
        }

        /* Avatar - Large & Impactful */
        .card-avatar {
            width: 96px; height: 96px; flex-shrink: 0;
            border-radius: 28px; /* Matching card curvature ratio */
            overflow: hidden;
            background: #f1f5f9;
            box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05); /* Inner definition */
            position: relative;
        }
        .card-avatar img { 
            width: 100%; height: 100%; object-fit: cover; 
            transition: transform 0.5s ease;
        }
        .employee-card:hover .card-avatar img { transform: scale(1.08); }

        /* Info - Hierarchical Typography */
        .card-info {
            display: flex; flex-direction: column; justify-content: center;
            flex: 1; min-width: 0; padding-right: 32px; /* Space for status */
        }
        .emp-name {
            font-family: 'Inter', -apple-system, sans-serif;
            font-weight: 700; font-size: 1.45rem; color: #0f172a;
            letter-spacing: -0.025em; margin-bottom: 4px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .emp-role {
            font-size: 0.95rem; color: #64748b; font-weight: 500;
            letter-spacing: 0.01em;
            display: flex; align-items: center; gap: 6px;
        }
        
        /* Status - Floating Pill/Dot */
        .card-status {
            position: absolute; top: 28px; right: 28px;
        }

        /* Reference-style Halo Dot with Blink */
        .status-dot-container {
            width: 30px; height: 30px; 
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(4px); /* Glassy feel */
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .status-dot { width: 10px; height: 10px; border-radius: 50%; }

        /* Animation Keyframes */
        @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
            100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes pulse-yellow {
            0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(234, 179, 8, 0); }
            100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
        }

        @keyframes pulse-blue {
            0% { filter: drop-shadow(0 0 0 rgba(59, 130, 246, 0.6)); transform: scale(1); opacity: 1; }
            50% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.4)); transform: scale(0.9); opacity: 0.7; }
            100% { filter: drop-shadow(0 0 0 rgba(59, 130, 246, 0)); transform: scale(1); opacity: 1; }
        }

        /* Colors - Soft Pastels with Animations */
        .status-dot-container.green { background: rgba(220, 252, 231, 0.8); }
        .status-dot-container.green .status-dot { 
            background: #16a34a; 
            box-shadow: 0 0 0 2px rgba(255,255,255,0.5);
            animation: pulse-green 2s infinite;
        }
        
        .status-dot-container.yellow { background: rgba(254, 252, 232, 0.8); }
        .status-dot-container.yellow .status-dot { 
            background: #ca8a04; 
            box-shadow: 0 0 0 2px rgba(255,255,255,0.5);
            animation: pulse-yellow 2s infinite;
        }

        .status-dot-container.blue { background: rgba(239, 246, 255, 0.8); } 
        /* Plane icon specialized styling with pulse */
        .status-dot-container.blue .plane-icon { 
            color: #3b82f6; width: 14px; height: 14px;
            display: block; /* Force block to respect transform */
            animation: pulse-blue 1.5s infinite ease-in-out; /* Faster animation */
        }

        /* Hover Bounce for Status */
        .employee-card:hover .status-dot-container {
            transform: scale(1.15) rotate(5deg);
        }

        /* MODAL STYLES */
        .modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
            width: 100%; max-width: 600px;
            max-height: 90vh; overflow-y: auto;
            background: white; border-radius: 16px; padding: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        .modal-header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 24px;
        }
        .icon-btn {
            background: none; border: none; cursor: pointer; color: var(--color-text-muted); padding: 4px;
            border-radius: 50%; transition: background 0.2s;
        }
        .icon-btn:hover { background: #f1f5f9; color: var(--color-text-main); }
        
        .modal-form { display: flex; flex-direction: column; gap: 16px; }
        .form-row { display: flex; gap: 16px; }
        .form-group { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .form-group label {
            font-size: 0.85rem; font-weight: 500; color: var(--color-text-secondary);
        }
        .input-field {
            padding: 10px 12px; border: 1px solid var(--color-border);
            border-radius: 8px; font-size: 0.95rem; outline: none;
            transition: border-color 0.2s;
        }
        .input-field:focus { border-color: var(--color-primary); }
        
        .modal-footer {
            display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px;
        }
        .btn-outline {
            background: none; border: 1px solid var(--color-border);
            padding: 8px 16px; border-radius: 8px; cursor: pointer;
            font-weight: 500; color: var(--color-text-secondary);
        }
        .btn-outline:hover { background: #f8fafc; }

      `}</style>
        </div>
    );
};

export default Employees;
