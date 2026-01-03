import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Briefcase, Calendar, Shield, DollarSign, FileText, Lock } from 'lucide-react';

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
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        about: 'Passionate developer with 5+ years of experience in building scalable web applications.',
        address: '123 Tech Park, San Francisco, CA',
        salary: {
            basic: 5000,
            hra: 2000,
            allowance: 1000,
            bonus: 500,
            deductions: {
                pf: 250,
                tax: 150
            }
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'resume':
                return (
                    <div className="tab-content flex flex-col gap-6">
                        <div className="section">
                            <h3 className="section-title">About</h3>
                            <p className="text-secondary">{employee.about}</p>
                        </div>

                        <div className="section">
                            <h3 className="section-title">Skills</h3>
                            <div className="flex gap-2 flex-wrap">
                                {employee.skills.map(skill => (
                                    <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="section">
                            <h3 className="section-title">Professional Info</h3>
                            <div className="info-grid">
                                <InfoItem label="Department" value={employee.dept} icon={<Briefcase size={16} />} />
                                <InfoItem label="Manager" value={employee.reportsTo} icon={<UserIcon />} />
                                <InfoItem label="Joined" value={employee.joinDate} icon={<Calendar size={16} />} />
                            </div>
                        </div>
                    </div>
                );

            case 'salary':
                if (!isAdmin) return <div className="p-8 text-center text-muted">You do not have permission to view this section.</div>;

                const totalEarnings = employee.salary.basic + employee.salary.hra + employee.salary.allowance + employee.salary.bonus;
                const totalDeductions = employee.salary.deductions.pf + employee.salary.deductions.tax;
                const netSalary = totalEarnings - totalDeductions;

                return (
                    <div className="tab-content flex flex-col gap-6">
                        <div className="salary-card card bg-primary-light">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-secondary">Net Monthly Salary</p>
                                    <h2 className="text-2xl">${netSalary.toLocaleString()}</h2>
                                </div>
                                <div className="badge-year">2024-2025</div>
                            </div>
                        </div>

                        <div className="salary-breakdown grid-2-col">
                            <div className="card breakdown-card">
                                <h4 className="card-title text-green">Earnings</h4>
                                <div className="row"><span>Basic</span><span>${employee.salary.basic}</span></div>
                                <div className="row"><span>HRA</span><span>${employee.salary.hra}</span></div>
                                <div className="row"><span>Special Allowance</span><span>${employee.salary.allowance}</span></div>
                                <div className="row"><span>Bonus</span><span>${employee.salary.bonus}</span></div>
                                <div className="divider"></div>
                                <div className="row total"><span>Total Earnings</span><span>${totalEarnings}</span></div>
                            </div>

                            <div className="card breakdown-card">
                                <h4 className="card-title text-red">Deductions</h4>
                                <div className="row"><span>Provident Fund</span><span>${employee.salary.deductions.pf}</span></div>
                                <div className="row"><span>Professional Tax</span><span>${employee.salary.deductions.tax}</span></div>
                                <div className="divider"></div>
                                <div className="row total"><span>Total Deductions</span><span>${totalDeductions}</span></div>
                            </div>
                        </div>
                    </div>
                );

            case 'private':
                return (
                    <div className="tab-content">
                        <div className="info-grid">
                            <InfoItem label="Email" value={employee.email} icon={<Mail size={16} />} />
                            <InfoItem label="Phone" value={employee.phone} icon={<Phone size={16} />} />
                            <InfoItem label="Address" value={employee.address} icon={<MapPin size={16} />} />
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="tab-content">
                        <button className="btn btn-outline flex gap-2 items-center">
                            <Lock size={16} /> Change Password
                        </button>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <div className="profile-container flex flex-col gap-6">

            {/* Profile Header */}
            <div className="profile-header card">
                <div className="header-top">
                    <div className="profile-img-lg">
                        <img src={`https://i.pravatar.cc/150?u=${id || 1}`} alt="Profile" />
                    </div>
                    <div className="profile-basic">
                        <h1 className="text-2xl">{employee.name}</h1>
                        <p className="text-secondary">{employee.role}</p>
                        <div className="flex gap-4 mt-2">
                            <span className="info-pill"><Mail size={14} /> {employee.email}</span>
                            <span className="info-pill"><MapPin size={14} /> San Francisco</span>
                        </div>
                    </div>
                    <div className="header-actions">
                        {/* Admin Toggle for Demo */}
                        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                            <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                            View as Admin
                        </label>
                    </div>
                </div>

                <div className="header-tabs">
                    <TabButton id="resume" label="Resume" icon={<FileText size={16} />} active={activeTab} onClick={setActiveTab} />
                    <TabButton id="private" label="Private Info" icon={<Shield size={16} />} active={activeTab} onClick={setActiveTab} />
                    <TabButton id="salary" label="Salary Info" icon={<DollarSign size={16} />} active={activeTab} onClick={setActiveTab} />
                    <TabButton id="security" label="Security" icon={<Lock size={16} />} active={activeTab} onClick={setActiveTab} />
                </div>
            </div>

            {/* Tab Content */}
            <div className="profile-body">
                {renderTabContent()}
            </div>

            <style>{`
        .profile-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .profile-header {
          padding: 0;
          overflow: hidden;
        }
        .header-top {
          padding: 32px;
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .profile-img-lg {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--color-bg);
          box-shadow: var(--shadow-sm);
        }
        .profile-img-lg img { width: 100%; height: 100%; object-fit: cover; }
        
        .profile-basic { flex: 1; }
        .info-pill {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.85rem; color: var(--color-text-secondary);
        }

        .header-tabs {
          display: flex;
          padding: 0 32px;
          border-top: 1px solid var(--color-border);
          background-color: #fcfcfc;
        }
        .tab-btn {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn:hover { color: var(--color-primary); background-color: rgba(0,0,0,0.02); }
        .tab-btn.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
          font-weight: 500;
        }

        .section-title {
          font-size: 1.1rem;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .skill-tag {
          padding: 6px 14px;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 100px;
          font-size: 0.85rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }
        .info-item {
          display: flex;
          gap: 12px;
        }
        .info-icon {
          width: 32px; height: 32px;
          background: var(--color-bg);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          color: var(--color-text-muted);
        }
        .info-label { font-size: 0.75rem; color: var(--color-text-muted); }
        .info-value { font-size: 0.95rem; font-weight: 500; }

        .salary-breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .grid-2-col { grid-template-columns: 1fr 1fr; }
        .breakdown-card { padding: 24px; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 0.95rem; }
        .card-title { margin-bottom: 16px; font-weight: 600; }
        .text-green { color: var(--color-status-green); }
        .text-red { color: var(--color-status-red); }
        .total { font-weight: 700; font-size: 1.1rem; padding-top: 12px; }
        
        .bg-primary-light {
          background: linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%);
          color: white;
        }
        .bg-primary-light .text-secondary { color: rgba(255,255,255,0.8); }
        .badge-year {
          padding: 4px 12px;
          background: rgba(255,255,255,0.2);
          border-radius: 100px;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .header-top { flex-direction: column; text-align: center; }
          .profile-basic .flex { justify-content: center; }
          .salary-breakdown { grid-template-columns: 1fr; }
          .header-tabs { overflow-x: auto; }
        }
      `}</style>
        </div>
    );
};

const TabButton = ({ id, label, icon, active, onClick }) => (
    <div className={`tab-btn ${active === id ? 'active' : ''}`} onClick={() => onClick(id)}>
        {icon} {label}
    </div>
);

const InfoItem = ({ label, value, icon }) => (
    <div className="info-item">
        <div className="info-icon">{icon}</div>
        <div>
            <div className="info-label">{label}</div>
            <div className="info-value">{value}</div>
        </div>
    </div>
);

const UserIcon = () => <Briefcase size={16} />;

export default Profile;
