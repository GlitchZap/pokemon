import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllStudents, getAllSchools, getTransferCertificateRequests } from '../../services/api';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSchools: 0,
    pendingTC: 0,
    recentTC: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Current date and user information
  const currentDateTime = "2025-03-06 07:49:29";
  const currentUserLogin = "GlitchZap";

  useEffect(() => {
    // Fetch dashboard statistics from API
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [students, schools, tcRequests] = await Promise.all([
          getAllStudents(),
          getAllSchools(),
          getTransferCertificateRequests()
        ]);
        
        const pendingRequests = tcRequests ? tcRequests.filter(tc => tc.status === 'pending') : [];
        
        setStats({
          totalStudents: students ? students.length : 0,
          totalSchools: schools ? schools.length : 0,
          pendingTC: pendingRequests.length,
          recentTC: tcRequests ? tcRequests.slice(0, 5) : []
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
        setError('Failed to load dashboard information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="section-title">Administrator Dashboard</h2>
        <p className="text-gray-500">Welcome back, {currentUser?.name || currentUserLogin}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Students</p>
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Schools</p>
            <p className="text-2xl font-bold">{stats.totalSchools}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Pending TC Requests</p>
            <p className="text-2xl font-bold">{stats.pendingTC}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Date</p>
            <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <h3 className="text-lg font-medium">Recent Transfer Certificate Requests</h3>
          </div>
          
          <div className="p-6">
            {stats.recentTC.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.recentTC.map((tc) => (
                        <tr key={tc.tc_id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900">{tc.student_name}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-500">{new Date(tc.application_date).toLocaleDateString()}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                tc.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : tc.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {tc.status.charAt(0).toUpperCase() + tc.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-right">
                  <Link
                    to="/admin/transfer-certificates"
                    className="text-sm text-primary-main hover:text-primary-dark font-medium"
                  >
                    View all transfer certificate requests →
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center p-4 text-gray-500">
                No recent transfer certificate requests
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <h3 className="text-lg font-medium">Quick Actions</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/admin/students"
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150 flex flex-col items-center justify-center text-center"
              >
                <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">Manage Students</span>
              </Link>
              
              <Link
                to="/admin/transfer-certificates"
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150 flex flex-col items-center justify-center text-center"
              >
                <svg className="w-8 h-8 text-yellow-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">TC Approvals</span>
              </Link>
              
              <button
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150 flex flex-col items-center justify-center text-center"
              >
                <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">Generate Reports</span>
              </button>
              
              <button
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150 flex flex-col items-center justify-center text-center"
              >
                <svg className="w-8 h-8 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">System Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        Current Date and Time: 2025-03-06 07:51:07 UTC | User: GlitchZap
      </div>
    </>
  );
};

export default AdminDashboard;