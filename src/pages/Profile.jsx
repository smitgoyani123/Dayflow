import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Briefcase, Calendar, Shield, DollarSign, FileText, Lock, User } from 'lucide-react';

const Profile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('resume');
    const [isAdmin, setIsAdmin] = useState(true); // Toggle for demo

    // Mock Employee Data
    const employee = {
        name: 'Alex Johnson',
        role: 'Software Engineer',
        dept: 'Engineering',
        joinDate: 'Jan 15, 2022',
        email: 'alex.j@company.com',
        phone: '+1 (555) 123-4567',
        reportsTo: 'Michael Chen',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
        about: 'Passionate developer with 5+ years of experience in building scalable web applications. Specialized in modern JavaScript frameworks and cloud infrastructure.',
        address: '123 Tech Park, San Francisco, CA 94105',
    };

    const salary = {
        basic: 5000,
        hra: 2000,
        allowance: 1000,
        bonus: 500,
        deductions: {
            pf: 250,
            tax: 150
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'resume':
                return (
                    <div className="tab-content">
                        <div className="resume-section">
                            <div className="section-card">
                                <h3 className="section-title">About</h3>
                                <p className="section-description">{employee.about}</p>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title">Skills</h3>
                                <div className="skills-container">
                                    {employee.skills.map(skill => (
                                        <span key={skill} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title">Professional Information</h3>
                                <div className="info-grid">
                                    <InfoItem 
                                        label="Department" 
                                        value={employee.dept} 
                                        icon={<Briefcase size={18} />} 
                                    />
                                    <InfoItem 
                                        label="Manager" 
                                        value={employee.reportsTo} 
                                        icon={<User size={18} />} 
                                    />
                                    <InfoItem 
                                        label="Joined Date" 
                                        value={employee.joinDate} 
                                        icon={<Calendar size={18} />} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'salary':
                if (!isAdmin) {
                    return (
                        <div className="permission-message">
                            <Shield size={48} />
                            <h3>Access Restricted</h3>
                            <p>You do not have permission to view this section.</p>
                        </div>
                    );
                }

                const totalEarnings = salary.basic + salary.hra + salary.allowance + salary.bonus;
                const totalDeductions = salary.deductions.pf + salary.deductions.tax;
                const netSalary = totalEarnings - totalDeductions;

                return (
                    <div className="tab-content">
                        <div className="salary-section">
                            <div className="salary-summary-card">
                                <div className="salary-summary-content">
                                    <div className="salary-summary-info">
                                        <p className="salary-label">Net Monthly Salary</p>
                                        <h2 className="salary-amount">${netSalary.toLocaleString()}</h2>
                                        <p className="salary-period">Current Financial Year 2024-2025</p>
                                    </div>
                                </div>
                            </div>

                            <div className="salary-breakdown">
                                <div className="breakdown-card earnings-card">
                                    <div className="breakdown-header">
                                        <h4 className="breakdown-title earnings-title">Earnings</h4>
                                    </div>
                                    <div className="breakdown-content">
                                        <BreakdownRow label="Basic Salary" value={`$${salary.basic.toLocaleString()}`} />
                                        <BreakdownRow label="HRA" value={`$${salary.hra.toLocaleString()}`} />
                                        <BreakdownRow label="Special Allowance" value={`$${salary.allowance.toLocaleString()}`} />
                                        <BreakdownRow label="Bonus" value={`$${salary.bonus.toLocaleString()}`} />
                                        <div className="breakdown-divider"></div>
                                        <BreakdownRow 
                                            label="Total Earnings" 
                                            value={`$${totalEarnings.toLocaleString()}`} 
                                            isTotal={true}
                                        />
                                    </div>
                                </div>

                                <div className="breakdown-card deductions-card">
                                    <div className="breakdown-header">
                                        <h4 className="breakdown-title deductions-title">Deductions</h4>
                                    </div>
                                    <div className="breakdown-content">
                                        <BreakdownRow label="Provident Fund" value={`$${salary.deductions.pf.toLocaleString()}`} />
                                        <BreakdownRow label="Professional Tax" value={`$${salary.deductions.tax.toLocaleString()}`} />
                                        <div className="breakdown-divider"></div>
                                        <BreakdownRow 
                                            label="Total Deductions" 
                                            value={`$${totalDeductions.toLocaleString()}`} 
                                            isTotal={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'private':
                return (
                    <div className="tab-content">
                        <div className="private-section">
                            <div className="section-card">
                                <h3 className="section-title">Contact Information</h3>
                                <div className="info-grid-private">
                                    <InfoItem 
                                        label="Email Address" 
                                        value={employee.email} 
                                        icon={<Mail size={18} />} 
                                    />
                                    <InfoItem 
                                        label="Phone Number" 
                                        value={employee.phone} 
                                        icon={<Phone size={18} />} 
                                    />
                                    <InfoItem 
                                        label="Address" 
                                        value={employee.address} 
                                        icon={<MapPin size={18} />} 
                                        fullWidth={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="tab-content">
                        <div className="security-section">
                            <div className="section-card">
                                <h3 className="section-title">Password & Security</h3>
                                <p className="section-description">
                                    Keep your account secure by regularly updating your password.
                                </p>
                                <div className="security-actions">
                                    <button className="btn btn-primary security-btn">
                                        <Lock size={18} />
                                        <span>Change Password</span>
                                    </button>
                                </div>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title">Two-Factor Authentication</h3>
                                <p className="section-description">
                                    Add an extra layer of security to your account with two-factor authentication.
                                </p>
                                <div className="security-actions">
                                    <button className="btn btn-outline security-btn">
                                        <Shield size={18} />
                                        <span>Enable 2FA</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header card">
                <div className="header-top">
                    <div className="profile-img-lg">
                        <img src={`https://i.pravatar.cc/150?u=${id || 1}`} alt="Profile" />
                    </div>
                    <div className="profile-basic">
                        <h1 className="profile-name">{employee.name}</h1>
                        <p className="profile-role">{employee.role}</p>
                        <div className="profile-info-pills">
                            <span className="info-pill">
                                <Mail size={14} />
                                <span>{employee.email}</span>
                            </span>
                            <span className="info-pill">
                                <MapPin size={14} />
                                <span>San Francisco</span>
                            </span>
                        </div>
                    </div>
                    <div className="header-actions">
                        <label className="admin-toggle">
                            <input 
                                type="checkbox" 
                                checked={isAdmin} 
                                onChange={e => setIsAdmin(e.target.checked)} 
                            />
                            <span>View as Admin</span>
                        </label>
                    </div>
                </div>

                <div className="header-tabs">
                    <TabButton 
                        id="resume" 
                        label="Resume" 
                        icon={<FileText size={18} />} 
                        active={activeTab} 
                        onClick={setActiveTab} 
                    />
                    <TabButton 
                        id="private" 
                        label="Private Info" 
                        icon={<Shield size={18} />} 
                        active={activeTab} 
                        onClick={setActiveTab} 
                    />
                    <TabButton 
                        id="salary" 
                        label="Salary Info" 
                        icon={<DollarSign size={18} />} 
                        active={activeTab} 
                        onClick={setActiveTab} 
                    />
                    <TabButton 
                        id="security" 
                        label="Security" 
                        icon={<Lock size={18} />} 
                        active={activeTab} 
                        onClick={setActiveTab} 
                    />
                </div>
            </div>

            {/* Tab Content */}
            <div className="profile-body">
                {renderTabContent()}
            </div>

            <style>{`
                .profile-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 24px;
                }

                /* Profile Header */
                .profile-header {
                    padding: 0;
                    overflow: hidden;
                    margin-bottom: 24px;
                }
                .header-top {
                    padding: 40px 32px;
                    display: flex;
                    gap: 32px;
                    align-items: flex-start;
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                }
                .profile-img-lg {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid var(--color-surface);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    flex-shrink: 0;
                }
                .profile-img-lg img { 
                    width: 100%; 
                    height: 100%; 
                    object-fit: cover; 
                }
                
                .profile-basic { 
                    flex: 1;
                    min-width: 0;
                }
                .profile-name {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--color-text-main);
                    margin: 0 0 8px 0;
                }
                .profile-role {
                    font-size: 1.1rem;
                    color: var(--color-text-secondary);
                    margin: 0 0 16px 0;
                }
                .profile-info-pills {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                .info-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 14px;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 20px;
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                }
                .info-pill svg {
                    flex-shrink: 0;
                }

                .header-actions {
                    display: flex;
                    align-items: flex-start;
                    padding-top: 4px;
                }
                .admin-toggle {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                    cursor: pointer;
                }
                .admin-toggle input[type="checkbox"] {
                    cursor: pointer;
                    width: 16px;
                    height: 16px;
                }

                .header-tabs {
                    display: flex;
                    border-top: 1px solid var(--color-border);
                    background-color: #fafbfc;
                }
                .tab-btn {
                    padding: 18px 24px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.95rem;
                    color: var(--color-text-secondary);
                    border-bottom: 3px solid transparent;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: none;
                    border-left: none;
                    border-right: none;
                    border-top: none;
                    font-weight: 500;
                }
                .tab-btn:hover { 
                    color: var(--color-primary); 
                    background-color: rgba(37, 99, 235, 0.05);
                }
                .tab-btn.active {
                    color: var(--color-primary);
                    border-bottom-color: var(--color-primary);
                    background-color: transparent;
                }
                .tab-btn svg {
                    flex-shrink: 0;
                }

                /* Profile Body */
                .profile-body {
                    min-height: 400px;
                }
                .tab-content {
                    animation: fadeIn 0.3s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Section Card */
                .section-card {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: 32px;
                    margin-bottom: 0;
                }
                .section-title {
                    font-size: 1.35rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                    margin: 0 0 20px 0;
                }
                .section-description {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: var(--color-text-secondary);
                    margin: 0 0 24px 0;
                }

                /* Resume Section */
                .resume-section {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                /* Skills */
                .skills-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .skill-tag {
                    padding: 10px 18px;
                    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                    border: 1px solid #bfdbfe;
                    border-radius: 24px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--color-primary);
                    transition: all 0.2s;
                }
                .skill-tag:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);
                }

                /* Info Grid */
                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }
                .info-grid-private {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }
                .info-item {
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                }
                .info-item.full-width {
                    grid-column: 1 / -1;
                }
                .info-icon {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-primary);
                    flex-shrink: 0;
                }
                .info-content {
                    flex: 1;
                    min-width: 0;
                }
                .info-label { 
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: var(--color-text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 6px;
                    display: block;
                }
                .info-value { 
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--color-text-main);
                    word-break: break-word;
                }

                /* Salary Section */
                .salary-section {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .salary-summary-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: var(--radius-lg);
                    padding: 32px;
                    color: white;
                    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
                }
                .salary-summary-content {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                }
                .salary-summary-info {
                    width: 100%;
                }
                .salary-label {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.85);
                    margin: 0 0 8px 0;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .salary-amount {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0 0 6px 0;
                    line-height: 1.2;
                }
                .salary-period {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.75);
                    margin: 0;
                    font-weight: 500;
                }

                .salary-breakdown {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 24px;
                }
                .breakdown-card {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: 32px;
                }
                .breakdown-header {
                    margin-bottom: 24px;
                    padding-bottom: 16px;
                    border-bottom: 2px solid var(--color-border);
                }
                .breakdown-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 0;
                }
                .earnings-title {
                    color: var(--color-status-green);
                }
                .deductions-title {
                    color: var(--color-status-red);
                }
                .breakdown-content {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .breakdown-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                }
                .breakdown-row.total {
                    padding-top: 20px;
                    margin-top: 8px;
                    border-top: 2px solid var(--color-border);
                }
                .breakdown-label {
                    font-size: 0.95rem;
                    color: var(--color-text-secondary);
                    font-weight: 500;
                }
                .breakdown-value {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                }
                .breakdown-row.total .breakdown-label,
                .breakdown-row.total .breakdown-value {
                    font-size: 1.1rem;
                    font-weight: 700;
                }
                .breakdown-row.total .breakdown-value {
                    color: var(--color-primary);
                }
                .breakdown-divider {
                    height: 1px;
                    background: var(--color-divider);
                    margin: 8px 0;
                }

                /* Private Section */
                .private-section {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                /* Security Section */
                .security-section {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .security-actions {
                    margin-top: 8px;
                }
                .security-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 24px;
                    font-size: 0.95rem;
                    font-weight: 500;
                    border-radius: var(--radius-md);
                    transition: all 0.2s;
                    cursor: pointer;
                }
                .security-btn svg {
                    flex-shrink: 0;
                }

                /* Permission Message */
                .permission-message {
                    text-align: center;
                    padding: 80px 32px;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                }
                .permission-message svg {
                    color: var(--color-text-muted);
                    margin-bottom: 24px;
                }
                .permission-message h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                    margin: 0 0 12px 0;
                }
                .permission-message p {
                    font-size: 0.95rem;
                    color: var(--color-text-secondary);
                    margin: 0;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .profile-container {
                        padding: 16px;
                    }
                    .header-top {
                        flex-direction: column;
                        text-align: center;
                        align-items: center;
                        padding: 32px 24px;
                    }
                    .profile-basic {
                        text-align: center;
                    }
                    .profile-info-pills {
                        justify-content: center;
                    }
                    .salary-breakdown {
                        grid-template-columns: 1fr;
                    }
                    .salary-amount {
                        font-size: 1.75rem;
                    }
                    .header-tabs {
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                    }
                    .tab-btn {
                        padding: 16px 20px;
                        font-size: 0.9rem;
                    }
                    .info-grid,
                    .info-grid-private {
                        grid-template-columns: 1fr;
                    }
                    .section-card {
                        padding: 24px;
                    }
                }
            `}</style>
        </div>
    );
};

const TabButton = ({ id, label, icon, active, onClick }) => (
    <button 
        type="button"
        className={`tab-btn ${active === id ? 'active' : ''}`} 
        onClick={() => onClick(id)}
    >
        {icon} {label}
    </button>
);

const InfoItem = ({ label, value, icon, fullWidth }) => (
    <div className={`info-item ${fullWidth ? 'full-width' : ''}`}>
        <div className="info-icon">{icon}</div>
        <div className="info-content">
            <span className="info-label">{label}</span>
            <div className="info-value">{value}</div>
        </div>
    </div>
);

const BreakdownRow = ({ label, value, isTotal = false }) => (
    <div className={`breakdown-row ${isTotal ? 'total' : ''}`}>
        <span className="breakdown-label">{label}</span>
        <span className="breakdown-value">{value}</span>
    </div>
);

export default Profile;