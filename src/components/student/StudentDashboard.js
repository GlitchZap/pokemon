import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = ({ children }) => {
  const { currentUser, logout } = useAuth();
  
  // Updated timestamp
  const currentDateTime = "2025-03-05 18:50:24";
  const currentUserLogin = "GlitchZap";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-primary-main text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4">{currentUser?.name || currentUserLogin}</span>
            <button 
              onClick={logout}
              className="px-3 py-1 bg-white text-primary-main rounded hover:bg-gray-100 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="font-bold text-lg text-gray-800">Navigation</h2>
              </div>
              <nav>
                <ul className="divide-y divide-gray-200">
                  <li>
                    <Link 
                      to="/student/dashboard" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/student/profile" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/student/academic-records" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Academic Records
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/student/transfer-certificate" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Transfer Certificate
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/student/document-upload" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Document Upload
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/student/scheme-history" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Scheme History
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="md:w-3/4 lg:w-4/5">
            <div className="bg-white rounded-lg shadow-md p-6">
              {children || (
                <div className="welcome-content">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome, {currentUser?.name || currentUserLogin}!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Use the navigation menu to access your student information, academic records, apply for transfer certificates, and more.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <div className="card bg-blue-50 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-bold text-lg mb-2">View Profile</h3>
                      <p className="text-sm text-gray-600">Access your personal information and school details.</p>
                      <Link to="/student/profile" className="text-blue-600 text-sm inline-block mt-3 hover:underline">Go to Profile →</Link>
                    </div>
                    
                    <div className="card bg-green-50 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-bold text-lg mb-2">Academic Records</h3>
                      <p className="text-sm text-gray-600">Check your grades, attendance, and performance reports.</p>
                      <Link to="/student/academic-records" className="text-green-600 text-sm inline-block mt-3 hover:underline">View Records →</Link>
                    </div>
                    
                    <div className="card bg-purple-50 border-l-4 border-purple-500 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-bold text-lg mb-2">Document Upload</h3>
                      <p className="text-sm text-gray-600">Submit required documents and view uploaded files.</p>
                      <Link to="/student/document-upload" className="text-purple-600 text-sm inline-block mt-3 hover:underline">Upload Documents →</Link>
                    </div>
                  </div>
                  
                  <div className="mt-12 text-sm text-gray-500">
                    Current Date and Time: {currentDateTime} UTC
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p>PM Shri Mahatma Gandhi Government School Management System &copy; 2025</p>
      </footer>
    </div>
  );
};

export default StudentDashboard;