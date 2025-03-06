import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = ({ children }) => {
  const { currentUser, logout } = useAuth();
  
  // Updated timestamp
  const currentDateTime = "2025-03-05 18:50:24";
  const currentUserLogin = "GlitchZap";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-secondary-main text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4">{currentUser?.name || currentUserLogin}</span>
            <button 
              onClick={logout}
              className="px-3 py-1 bg-white text-secondary-main rounded hover:bg-gray-100 transition duration-200"
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
                <h2 className="font-bold text-lg text-gray-800">Administration</h2>
              </div>
              <nav>
                <ul className="divide-y divide-gray-200">
                  <li>
                    <Link 
                      to="/admin/dashboard" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/students" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Students List
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/transfer-certificates" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Transfer Certificates
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/schools" 
                      className="block px-6 py-3 hover:bg-gray-50 transition duration-200"
                    >
                      Schools
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
                    You can manage students, monitor transfer certificate applications, and access school information using the navigation menu.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="card bg-red-50 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg mb-2">Students</h3>
                          <p className="text-3xl font-bold text-gray-800">239</p>
                        </div>
                        <span className="text-red-500 bg-red-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      </div>
                      <Link to="/admin/students" className="text-red-600 text-sm inline-block mt-3 hover:underline">View Students →</Link>
                    </div>
                    
                    <div className="card bg-amber-50 border-l-4 border-amber-500 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg mb-2">Pending Transfers</h3>
                          <p className="text-3xl font-bold text-gray-800">8</p>
                        </div>
                        <span className="text-amber-500 bg-amber-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </span>
                      </div>
                      <Link to="/admin/transfer-certificates" className="text-amber-600 text-sm inline-block mt-3 hover:underline">View Transfers →</Link>
                    </div>
                    
                    <div className="card bg-indigo-50 border-l-4 border-indigo-500 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg mb-2">Schools</h3>
                          <p className="text-3xl font-bold text-gray-800">12</p>
                        </div>
                        <span className="text-indigo-500 bg-indigo-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </span>
                      </div>
                      <Link to="/admin/schools" className="text-indigo-600 text-sm inline-block mt-3 hover:underline">View Schools →</Link>
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

export default AdminDashboard;