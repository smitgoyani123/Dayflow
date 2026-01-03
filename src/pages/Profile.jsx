import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Briefcase, Calendar, Shield, DollarSign, FileText, Lock, User, Edit2, Plus, X, Check } from 'lucide-react';

const Profile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('resume');
    const [isAdmin, setIsAdmin] = useState(true); // Toggle for demo

    // Mock Employee Data
    const [employee, setEmployee] = useState({
        name: 'Alex Johnson',
        role: 'Software Engineer',
        dept: 'Engineering',
        joinDate: 'Jan 15, 2022',
        email: 'alex.j@company.com',
        phone: '+1 (555) 123-4567',
        reportsTo: 'Michael Chen',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
        certifications: ['AWS Certified Solutions Architect', 'Meta Frontend Developer'],
        about: 'Passionate developer with 5+ years of experience in building scalable web applications. Specialized in modern JavaScript frameworks and cloud infrastructure.',
        jobLove: 'I love solving complex problems and building tools that make people\'s lives easier. The collaborative culture here is amazing.',
        hobbies: 'Hiking, Photography, Open Source Contributing, Sci-Fi Novels',
        address: '123 Tech Park, San Francisco, CA 94105',
    });

    // Handlers for updates
    const handleUpdate = (field, value) => {
        setEmployee(prev => ({ ...prev, [field]: value }));
    };

    const handleAddList = (field, item) => {
        setEmployee(prev => ({
            ...prev,
            [field]: [...prev[field], item]
        }));
    };

    const handleRemoveList = (field, itemToRemove) => {
        setEmployee(prev => ({
            ...prev,
            [field]: prev[field].filter(i => i !== itemToRemove)
        }));
    };

    const salary = {
        monthlyWage: 50000,
        yearlyWage: 600000,
        workingDaysPerWeek: 5,
        breakTime: 1,
        components: {
            basic: { amount: 25000, percentage: 50.00, description: 'Define Basic salary from company cost compute it based on monthly Wages' },
            hra: { amount: 12500, percentage: 50.00, description: 'HRA provided to employees 50% of the basic salary' },
            standardAllowance: { amount: 4167, percentage: 16.67, description: 'A standard allowance is a predetermined, fixed amount provided to employee as part of their salary' },
            performanceBonus: { amount: 2082.50, percentage: 8.33, description: 'Variable amount paid during payroll. The value defined by the company and calculated as a % of the basic salary' },
            lta: { amount: 2082.50, percentage: 8.33, description: 'LTA is paid by the company to employees to cover their travel expenses. and calculated as a % of the basic salary' },
            fixedAllowance: { amount: 2918, percentage: 11.67, description: 'fixed allowance portion of wages is determined after calculating all salary components' }
        },
        pf: {
            employee: { amount: 3000, percentage: 12.00, description: 'PF is calculated based on the basic salary' },
            employer: { amount: 3000, percentage: 12.00, description: 'PF is calculated based on the basic salary' }
        },
        tax: {
            professionalTax: { amount: 200, description: 'Professional Tax deducted from the Gross salary' }
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'resume':
                return (
                    <div className="tab-content">
                        <div className="resume-section">
                            <EditableSection
                                title="About"
                                content={employee.about}
                                onSave={(val) => handleUpdate('about', val)}
                            />

                            <EditableSection
                                title="What I love about my job"
                                content={employee.jobLove}
                                onSave={(val) => handleUpdate('jobLove', val)}
                            />

                            <EditableSection
                                title="My interests and hobbies"
                                content={employee.hobbies}
                                onSave={(val) => handleUpdate('hobbies', val)}
                            />

                            <ListSection
                                title="Skills"
                                items={employee.skills}
                                onAdd={(item) => handleAddList('skills', item)}
                                onRemove={(item) => handleRemoveList('skills', item)}
                            />

                            <ListSection
                                title="Certifications"
                                items={employee.certifications}
                                onAdd={(item) => handleAddList('certifications', item)}
                                onRemove={(item) => handleRemoveList('certifications', item)}
                            />

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

                const totalComponents = Object.values(salary.components).reduce((sum, comp) => sum + comp.amount, 0);

                return (
                    <div className="tab-content">
                        <div className="salary-section">
                            {/* Top Section - Wage Information */}
                            <div className="salary-wage-info">
                                <div className="wage-field">
                                    <label className="wage-label">Month Wage</label>
                                    <div className="wage-value">
                                        <span className="wage-amount">{salary.monthlyWage.toLocaleString()}</span>
                                        <span className="wage-unit">/ Month</span>
                                    </div>
                                </div>
                                <div className="wage-field">
                                    <label className="wage-label">Yearly wage</label>
                                    <div className="wage-value">
                                        <span className="wage-amount">{salary.yearlyWage.toLocaleString()}</span>
                                        <span className="wage-unit">/ Yearly</span>
                                    </div>
                                </div>
                                <div className="wage-field">
                                    <label className="wage-label">No of working days in a week</label>
                                    <div className="wage-value">
                                        <span className="wage-amount">{salary.workingDaysPerWeek}</span>
                                    </div>
                                </div>
                                <div className="wage-field">
                                    <label className="wage-label">Break Time</label>
                                    <div className="wage-value">
                                        <span className="wage-amount">{salary.breakTime}</span>
                                        <span className="wage-unit">/hrs</span>
                                    </div>
                                </div>
                            </div>

                            {/* Two Column Layout */}
                            <div className="salary-details-grid">
                                {/* Left Column - Salary Components */}
                                <div className="salary-components-column">
                                    <h3 className="salary-column-title">Salary Components</h3>

                                    <SalaryComponent
                                        label="Basic Salary"
                                        amount={salary.components.basic.amount}
                                        percentage={salary.components.basic.percentage}
                                        description={salary.components.basic.description}
                                    />

                                    <SalaryComponent
                                        label="House Rent Allowance (HRA)"
                                        amount={salary.components.hra.amount}
                                        percentage={salary.components.hra.percentage}
                                        description={salary.components.hra.description}
                                    />

                                    <SalaryComponent
                                        label="Standard Allowance"
                                        amount={salary.components.standardAllowance.amount}
                                        percentage={salary.components.standardAllowance.percentage}
                                        description={salary.components.standardAllowance.description}
                                    />

                                    <SalaryComponent
                                        label="Performance Bonus"
                                        amount={salary.components.performanceBonus.amount}
                                        percentage={salary.components.performanceBonus.percentage}
                                        description={salary.components.performanceBonus.description}
                                    />

                                    <SalaryComponent
                                        label="Leave Travel Allowance (LTA)"
                                        amount={salary.components.lta.amount}
                                        percentage={salary.components.lta.percentage}
                                        description={salary.components.lta.description}
                                    />

                                    <SalaryComponent
                                        label="Fixed Allowance"
                                        amount={salary.components.fixedAllowance.amount}
                                        percentage={salary.components.fixedAllowance.percentage}
                                        description={salary.components.fixedAllowance.description}
                                    />
                                </div>

                                {/* Right Column - Contributions and Deductions */}
                                <div className="salary-contributions-column">
                                    <h3 className="salary-column-title">Provident Fund (PF) Contribution</h3>

                                    <SalaryComponent
                                        label="Employee"
                                        amount={salary.pf.employee.amount}
                                        percentage={salary.pf.employee.percentage}
                                        description={salary.pf.employee.description}
                                    />

                                    <SalaryComponent
                                        label="Employer"
                                        amount={salary.pf.employer.amount}
                                        percentage={salary.pf.employer.percentage}
                                        description={salary.pf.employer.description}
                                    />

                                    <div className="salary-section-divider"></div>

                                    <h3 className="salary-column-title">Tax Deductions</h3>

                                    <SalaryComponent
                                        label="Professional Tax"
                                        amount={salary.tax.professionalTax.amount}
                                        description={salary.tax.professionalTax.description}
                                    />
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



                /* Editable Section */
                .section-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }
                .section-header-row .section-title {
                    margin-bottom: 0;
                }
                .section-title {
                    font-size: 1.35rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                    margin: 0 0 24px 0;
                }
                .edit-btn {
                    padding: 8px;
                    border-radius: 50%;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    transition: all 0.2s;
                    background: transparent;
                    border: none;
                }
                .edit-btn:hover {
                    background-color: var(--color-background);
                    color: var(--color-primary);
                }
                .edit-textarea {
                    width: 100%;
                    min-height: 120px;
                    padding: 12px;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    font-family: inherit;
                    font-size: 0.95rem;
                    resize: vertical;
                    margin-bottom: 16px;
                }
                .edit-textarea:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }
                .edit-actions {
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                }
                .btn-save, .btn-cancel {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    border-radius: var(--radius-md);
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                }
                .btn-save {
                    background: var(--color-primary);
                    color: white;
                    border: none;
                }
                .btn-cancel {
                    background: white;
                    border: 1px solid var(--color-border);
                    color: var(--color-text-secondary);
                }

                /* List Section */
                .remove-skill-btn {
                    margin-left: 8px;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    border: none;
                    background: none;
                    padding: 2px;
                    border-radius: 50%;
                }
                .remove-skill-btn:hover {
                    background: rgba(0,0,0,0.05);
                    color: #ef4444;
                }
                .add-trigger-btn {
                    margin-top: 16px;
                    background: none;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: var(--color-primary);
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    padding: 8px 0;
                }
                .add-trigger-btn:hover {
                    text-decoration: underline;
                }
                .add-item-form {
                    margin-top: 16px;
                    display: flex;
                    gap: 8px;
                }
                .add-input {
                    flex: 1;
                    padding: 8px 12px;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    font-size: 0.9rem;
                }
                .add-input:focus {
                    outline: none;
                    border-color: var(--color-primary);
                }
                .add-btn-submit {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                }

                /* Resume Section (Legacy support if needed, but overridden) */
                .resume-section {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                /* Skills Tag Update */
                .skill-tag {
                    padding: 8px 14px;
                    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                    border: 1px solid #bfdbfe;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--color-primary);
                    transition: all 0.2s;
                    display: inline-flex;
                    align-items: center;
                }

                /* Responsive */
                @media (max-width: 900px) {
                    .resume-grid {
                        grid-template-columns: 1fr;
                    }
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
                    gap: 32px;
                }

                /* Wage Info Top Section */
                .salary-wage-info {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    padding: 24px;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                }
                .wage-field {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .wage-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--color-text-secondary);
                }
                .wage-value {
                    display: flex;
                    align-items: baseline;
                    gap: 4px;
                }
                .wage-amount {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                }
                .wage-unit {
                    font-size: 0.875rem;
                    color: var(--color-text-muted);
                }

                /* Salary Details Grid - Two Column Layout */
                .salary-details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                }
                .salary-components-column,
                .salary-contributions-column {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .salary-column-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                    margin: 0;
                    padding-bottom: 12px;
                    border-bottom: 2px solid var(--color-border);
                }

                /* Salary Component Item */
                .salary-component-item {
                    padding: 20px;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .salary-component-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    padding-bottom: 12px;
                    border-bottom: 1px solid var(--color-divider);
                }
                .salary-component-amount {
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                }
                .amount-value {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                }
                .amount-unit {
                    font-size: 0.85rem;
                    color: var(--color-text-muted);
                }
                .salary-component-percentage {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--color-primary);
                }
                .salary-component-label {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--color-text-main);
                }
                .salary-component-description {
                    font-size: 0.85rem;
                    line-height: 1.5;
                    color: var(--color-text-secondary);
                }

                .salary-section-divider {
                    height: 2px;
                    background: var(--color-border);
                    margin: 8px 0;
                }

                /* Private Section */
                .resume-section {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                /* Skills */
                .skills-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
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
                    .salary-wage-info {
                        grid-template-columns: 1fr;
                    }
                    .salary-details-grid {
                        grid-template-columns: 1fr;
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

const SalaryComponent = ({ label, amount, percentage, description }) => (
    <div className="salary-component-item">
        <div className="salary-component-header">
            <div className="salary-component-amount">
                <span className="amount-value">{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className="amount-unit">₹ / month</span>
            </div>
            {percentage !== undefined && (
                <div className="salary-component-percentage">
                    {percentage.toFixed(2)} %
                </div>
            )}
        </div>
        <div className="salary-component-label">{label}:</div>
        <div className="salary-component-description">{description}</div>
    </div>
);

// Helper Components
const EditableSection = ({ title, content, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState(content);

    const handleSave = () => {
        onSave(tempContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempContent(content);
        setIsEditing(false);
    };

    return (
        <div className="section-card">
            <div className="section-header-row">
                <h3 className="section-title">{title}</h3>
                {!isEditing && (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        <Edit2 size={16} />
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="edit-form">
                    <textarea
                        className="edit-textarea"
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                    />
                    <div className="edit-actions">
                        <button className="btn-cancel" onClick={handleCancel}>
                            <X size={16} /> Cancel
                        </button>
                        <button className="btn-save" onClick={handleSave}>
                            <Check size={16} /> Save
                        </button>
                    </div>
                </div>
            ) : (
                <p className="section-description">{content}</p>
            )}
        </div>
    );
};

const ListSection = ({ title, items, onAdd, onRemove }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState('');

    const handleAdd = () => {
        if (newItem.trim()) {
            onAdd(newItem.trim());
            setNewItem('');
            setIsAdding(false);
        }
    };

    return (
        <div className="section-card">
            <h3 className="section-title">{title}</h3>
            <div className="skills-container">
                {items.map(item => (
                    <span key={item} className="skill-tag">
                        {item}
                        <button className="remove-skill-btn" onClick={() => onRemove(item)}>
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>

            {isAdding ? (
                <div className="add-item-form">
                    <input
                        className="add-input"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder={`Add ${title}...`}
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    />
                    <button className="add-btn-submit" onClick={handleAdd}>
                        <Check size={16} />
                    </button>
                    <button className="add-btn-submit" style={{ backgroundColor: '#ef4444', marginLeft: '4px' }} onClick={() => setIsAdding(false)}>
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <button className="add-trigger-btn" onClick={() => setIsAdding(true)}>
                    <Plus size={16} /> Add {title}
                </button>
            )}
        </div>
    );
};

export default Profile;