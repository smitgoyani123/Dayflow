# Dayflow HRMS

Dayflow is a modern, full-stack Human Resource Management System (HRMS) designed to streamline employee management, attendance tracking, and leave management. It features a premium "Glassmorphism" UI and a robust Node.js backend.

## 🚀 Features

-   **Employee Management**:
    -   Add, view, and list employees.
    -   Detailed employee profiles.
    -   Role-based access (Admin & Employee).
-   **Attendance Tracking**:
    -   Daily Check-in / Check-out with live timer.
    -   Automatic status calculation (Present, Half-day, Absent).
    -   Monthly attendance history view.
-   **Time Off (Leave) Management**:
    -   Request various types of leave (PTO, Sick, Casual, Unpaid).
    -   Track leave balances.
    -   Admin approval workflow.
-   **Authentic UI/UX**:
    -   Google-inspired "Glassmorphism" design.
    -   Rich gradients, blur effects, and smooth animations.
    -   Responsive layout.

## 🛠️ Tech Stack

### Frontend
-   **React** (Vite): Fast and modern UI library.
-   **React Router**: Client-side routing.
-   **Lucide React**: Modern, consistent icons.
-   **CSS Variables**: For theming and premium styling.

### Backend
-   **Node.js & Express**: Scalable server-side runtime.
-   **MongoDB & Mongoose**: Flexible NoSQL database schema.
-   **JWT (JSON Web Tokens)**: Secure stateless authentication.
-   **Bcrypt.js**: Password hashing.

## 📦 Installation & Setup

### Prerequisites
-   Node.js (v14+ recommended)
-   MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Dayflow
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in `c:\Dayflow\backend\.env` with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
# Development mode (restarts on changes)
npm run dev

# Or standard start
npm start
```
*Server runs on http://localhost:5000*

### 3. Frontend Setup
Open a new terminal, navigate to the project root (where `vite.config.js` is located):
```bash
cd c:\Dayflow
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*Frontend runs on http://localhost:5173* (or similar).

## 🔑 Usage

1.  **Login**: Use the default Admin credentials (seeded via `backend/seed.js` if run):
    -   **Email**: `admin@dayflow.com`
    -   **Password**: `password123`
2.  **Dashboard/TopNav**: Navigate between *Employees*, *Attendance*, and *Time Off*.
3.  **Employees**: Click "Add New Employee" to register staff.
4.  **Attendance**: Click "Check In" to start your day.
5.  **Time Off**: View cards for leave balance and apply for leave.

## 🤝 Contribution
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License
This project is licensed under the ISC License.
