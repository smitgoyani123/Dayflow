# Dayflow – Human Resource Management System (HRMS)

**Every workday, perfectly aligned.**

---

## 1. Introduction

### 1.1 Purpose

The purpose of this document is to define the **functional** and **non-functional** requirements of the **Dayflow Human Resource Management System (HRMS)**. The system aims to digitize and streamline core HR operations such as employee onboarding, profile management, attendance tracking, leave management, payroll visibility, and approval workflows for admins and HR officers.

### 1.2 Scope

The HRMS will provide the following features:

* Secure authentication (Sign Up / Sign In)
* Role-based access (Admin/HR vs Employee)
* Employee profile management
* Attendance tracking (daily/weekly view)
* Leave and time-off management
* Approval workflows for Admin/HR

### 1.3 Definitions & Abbreviations

| Term                   | Description                                  |
| ---------------------- | -------------------------------------------- |
| **Admin / HR Officer** | User with management and approval privileges |
| **Employee**           | Regular user with limited access             |
| **Time-Off**           | Paid leave, sick leave, unpaid leave, etc.   |

---

## 2. User Classes and Characteristics

| User Type              | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| **Admin / HR Officer** | Manages employees, approves leave & attendance, views payroll details       |
| **Employee**           | Views personal profile, attendance, applies for leave, views salary details |

---

## 3. Functional Requirements

### 3.1 Authentication & Authorization

#### 3.1.1 Sign Up

Users can register using the following details:

* Employee ID
* Email
* Password
* Role (Employee / HR)

Additional rules:

* Password must follow defined security rules
* Email verification is mandatory

#### 3.1.2 Sign In

* Users can log in using email and password
* Invalid credentials should display appropriate error messages
* Successful login redirects the user to their dashboard

---

### 3.2 Dashboard

#### 3.2.1 Employee Dashboard

The Employee Dashboard displays:

* Quick-access cards:

  * Profile
  * Attendance
  * Leave Requests
  * Logout
* Recent activity and important alerts

#### 3.2.2 Admin / HR Dashboard

The Admin/HR Dashboard displays:

* Employee list
* Attendance records
* Leave approval requests
* Ability to switch between employee profiles

---

### 3.3 Employee Profile Management

#### 3.3.1 View Profile

Employees can view the following information:

* Personal details
* Job details
* Salary structure
* Documents
* Profile picture

#### 3.3.2 Edit Profile

* Employees can edit limited fields:

  * Address
  * Phone number
  * Profile picture
* Admin/HR can edit all employee details

---

### 3.4 Attendance Management

#### 3.4.1 Attendance Tracking

* Daily and weekly attendance views
* Employee check-in and check-out functionality
* Attendance status types:

  * Present
  * Absent
  * Half-day
  * Leave

#### 3.4.2 Attendance View

* Employees can view only their own attendance records
* Admin/HR can view attendance for all employees

---

### 3.5 Leave & Time-Off Management

#### 3.5.1 Apply for Leave (Employee)

Employees can:

* Select leave type:

  * Paid Leave
  * Sick Leave
  * Unpaid Leave
* Choose a date range
* Add remarks

Leave request statuses:

* Pending
* Approved
* Rejected

#### 3.5.2 Leave Approval (Admin/HR)

Admin/HR users can:

* View all leave requests
* Approve or reject leave applications
* Add comments for decisions

Changes should reflect immediately in employee records.

---

### 3.6 Payroll / Salary Management

#### 3.6.1 Employee Payroll View

* Payroll information is read-only for employees

#### 3.6.2 Admin Payroll Control

Admin/HR users can:

* View payroll details of all employees
* Update salary structures
* Ensure payroll accuracy

---

## 4. Future Enhancements

* Email and notification alerts
* Analytics and reporting dashboard

  * Attendance reports
  * Salary slips
  * Payroll summaries

---

## 5. Design Reference

* **Excalidraw Wireframe:**
  [https://link.excalidraw.com/l/65VNwvy7c4X/58RLEJ4oOwh](https://link.excalidraw.com/l/65VNwvy7c4X/58RLEJ4oOwh)

---

**Document Version:** 1.0
**Project Name:** Dayflow – HRMS
