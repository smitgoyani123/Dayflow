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
        .page-container { width: 100%; }
        
        /* Toolbar */
        .toolbar-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 8px 0; border-bottom: 2px solid #f1f5f9; margin-bottom: 24px;
        }
        .btn-new {
            display: flex; align-items: center; gap: 8px;
            background-color: var(--color-primary); /* Use primary blue instead of purple */
            color: white; border: none; padding: 10px 20px; font-weight: 600;
            border-radius: 8px; cursor: pointer; font-size: 0.95rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* Subtle shadow */
            transition: all 0.2s ease;
        }
        .btn-new:hover { 
            background-color: #1d4ed8; /* Slightly darker blue */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .btn-new:active { transform: translateY(1px); }

        .search-wrapper { position: relative; width: 320px; }
        .search-input {
            width: 100%; padding: 10px 16px; padding-right: 40px;
            border: 2px solid #e2e8f0; border-radius: 100px;
            outline: none; background: white; font-size: 0.9rem;
            transition: border-color 0.2s;
        }
        .search-input:focus { border-color: #a855f7; }
        .search-icon {
            position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--color-text-muted);
        }

        /* Grid - Compacter cards to fit more in row and minimize gaps */
        .employee-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;
        }
        
        /* Card Styles - Premium Visual Elevation */
        .employee-card {
            position: relative; 
            background: linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%); /* Subtle gradient/texture */
            border: 1px solid rgba(226, 232, 240, 0.8); /* Low contrast border */
            border-radius: 20px; /* Increased radius */
            padding: 32px;
            display: flex; align-items: center; gap: 32px;
            /* Layered shadows for depth */
            box-shadow: 
                0 4px 6px -1px rgba(0, 0, 0, 0.02), 
                0 2px 4px -1px rgba(0, 0, 0, 0.02);
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); /* 200ms smooth transition */
            text-decoration: none; color: inherit;
            min-height: 140px;
        }
        
        .employee-card:hover {
            transform: translateY(-4px); /* Subtle lift */
            /* Enhanced shadow on hover */
            box-shadow: 
                0 20px 25px -5px rgba(0, 0, 0, 0.05), 
                0 10px 10px -5px rgba(0, 0, 0, 0.01);
            border-color: rgba(203, 213, 225, 0.8); /* Slightly clearer border on hover */
        }

        /* Avatar - Premium Treatment */
        .card-avatar {
            width: 80px; height: 80px; flex-shrink: 0;
            border-radius: 20px; /* Slight squiggle/rounded sq logic */
            overflow: hidden;
            /* Premium 'Picture Frame' Style */
            border: 2px solid #ffffff; /* Inner white border for clean separation */
            display: block; /* Ensure block layout for shadow */
            box-shadow: 0 0 0 1px #cbd5e1, 0 2px 4px rgba(0,0,0,0.05); /* Outer slate ring + depth shadow */
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .card-avatar img { width: 100%; height: 100%; object-fit: cover; }

        /* Info - Typography Refinement */
        .card-info {
            display: flex; flex-direction: column; justify-content: center;
            overflow: hidden;
            flex: 1;
            gap: 4px; /* Tighter gap */
        }
        .emp-name {
            font-weight: 700; font-size: 1.25rem; color: #1e293b; /* Reduced from 1.4rem */
            letter-spacing: -0.02em; line-height: 1.3;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .emp-role {
            font-size: 0.95rem; color: #64748b; margin-top: 2px; /* Reduced margin */
            font-weight: 500; letter-spacing: 0.01em;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Status Top Right */
        .card-status {
            position: absolute; top: 20px; right: 20px;
        }
        
        /* Status Dot Styles - Soft Glow */
        .status-dot-container {
            width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
            border-radius: 50%;
            position: relative;
            /* Base glow for all */
            box-shadow: 0 0 0 1px rgba(255,255,255,0.8);
        }
        
        /* Blink/Pulse Animations */
        @keyframes blink-green {
            0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); opacity: 1; }
            50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); opacity: 0.8; }
            100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); opacity: 1; }
        }
        @keyframes blink-yellow {
            0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); opacity: 1; }
            50% { box-shadow: 0 0 0 6px rgba(234, 179, 8, 0); opacity: 0.8; }
            100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); opacity: 1; }
        }

        @keyframes blink-blue {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); opacity: 1; }
            50% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); opacity: 0.8; }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); opacity: 1; }
        }

        .status-dot-container.green { 
            background-color: #dcfce7;
            animation: blink-green 3s infinite;
        }
        .status-dot-container.yellow { 
            background-color: #fef9c3;
            animation: blink-yellow 3s infinite;
        }
        .status-dot-container.blue { 
            background-color: #dbeafe; 
            animation: blink-blue 3s infinite; /* Added blink animation */
        }

        .status-dot { width: 10px; height: 10px; border-radius: 50%; }
        .status-dot.green-fill { background-color: #22c55e; }
        .status-dot.yellow-fill { background-color: #ca8a04; }
        /* Tilted plane icon - Default is already tilted Top-Right */
        .plane-icon { color: #2563eb; display:block; }

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
