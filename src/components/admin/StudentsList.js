import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentsList = () => {
  // For demo purposes, we'll use mock data
  const [students, setStudents] = useState([
    {
      student_id: 1001,
      name: 'Rahul Kumar',
      dob: '2010-05-15',
      current_school_id: 501,
      contact_info: '+91 9876543210'
    },
    {
      student_id: 1002,
      name: 'Priya Singh',
      dob: '2011-03-22',
      current_school_id: 501,
      contact_info: '+91 9876543211'
    },
    {
      student_id: 1003,
      name: 'Amit Sharma',
      dob: '2009-11-08',
      current_school_id: 502,
      contact_info: '+91 9876543212'
    },
    {
      student_id: 1004,
      name: 'Neha Patel',
      dob: '2010-02-18',
      current_school_id: 501,
      contact_info: '+91 9876543213'
    },
    {
      student_id: 1005,
      name: 'Vikram Reddy',
      dob: '2009-08-30',
      current_school_id: 503,
      contact_info: '+91 9876543214'
    }
  ]);

  const [filteredStudents, setFilteredStudents] = useState(students);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Current date and user information
  const currentDateTime = "2025-03-05 19:25:53";
  const currentUserLogin = "GlitchZap";

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const filtered = students.filter((student) => {
        return (
          student.name.toLowerCase().includes(lowercaseSearchTerm) ||
          student.student_id.toString().includes(lowercaseSearchTerm)
        );
      });
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-main"></div>
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
      <h2 className="section-title">Students List</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or ID"
                className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-primary-main focus:border-primary-main"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex space-x-2">
              <button className="btn-outline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>
              <button className="btn-outline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Export
              </button>
              <button className="btn-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Student
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.student_id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.student_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary-main hover:underline">
                          <Link to={`/admin/students/${student.student_id}`}>
                            {student.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(student.dob).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.current_school_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.contact_info}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link to={`/admin/students/${student.student_id}`} className="text-primary-main hover:text-primary-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <button className="text-gray-600 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredStudents.length} of {students.length} students
          </div>
          
          <div className="flex space-x-1">
            <button className="btn-outline py-1 px-2">Previous</button>
            <button className="btn-primary py-1 px-2">1</button>
            <button className="btn-outline py-1 px-2">2</button>
            <button className="btn-outline py-1 px-2">3</button>
            <button className="btn-outline py-1 px-2">Next</button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        Last updated: {currentDateTime} | User: {currentUserLogin}
      </div>
    </>
  );
};

export default StudentsList;