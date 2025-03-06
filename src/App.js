import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Login from './pages/Login';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import Profile from './components/student/Profile';
import AcademicRecords from './components/student/AcademicRecords';
import TransferCertificate from './components/student/TransferCertificate';
import DocumentUpload from './components/student/DocumentUpload';
import SchemeHistory from './components/student/SchemeHistory';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import StudentsList from './components/admin/StudentsList';
import TransferCertificateApproval from './components/admin/TransferCertificateApproval';

// Wrapper components for Dashboard Layouts
const StudentDashboardLayout = ({ component: Component }) => {
  return (
    <StudentDashboard>
      <Component />
    </StudentDashboard>
  );
};

const AdminDashboardLayout = ({ component: Component }) => {
  return (
    <AdminDashboard>
      <Component />
    </AdminDashboard>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Student Routes */}
            <Route element={<ProtectedRoute requiredUserType="student" />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route 
                path="/student/profile"
                element={<StudentDashboardLayout component={Profile} />}
              />
              <Route 
                path="/student/academic-records"
                element={<StudentDashboardLayout component={AcademicRecords} />}
              />
              <Route 
                path="/student/transfer-certificate"
                element={<StudentDashboardLayout component={TransferCertificate} />}
              />
              <Route 
                path="/student/document-upload"
                element={<StudentDashboardLayout component={DocumentUpload} />}
              />
              <Route 
                path="/student/scheme-history"
                element={<StudentDashboardLayout component={SchemeHistory} />}
              />
            </Route>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute requiredUserType="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route 
                path="/admin/students"
                element={<AdminDashboardLayout component={StudentsList} />}
              />
              <Route 
                path="/admin/transfer-certificates"
                element={<AdminDashboardLayout component={TransferCertificateApproval} />}
              />
            </Route>
            
            {/* Fallback for any other routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;