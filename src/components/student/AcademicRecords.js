import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudentAcademicRecords } from '../../services/api';

const AcademicRecords = () => {
  const { currentUser } = useAuth();
  const [academicRecords, setAcademicRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Current date and user information
  const currentDateTime = "2025-03-06 07:39:13";
  const currentUserLogin = "GlitchZap";

  useEffect(() => {
    const fetchAcademicRecords = async () => {
      try {
        setLoading(true);
        if (currentUser && currentUser.id) {
          const records = await getStudentAcademicRecords(currentUser.id);
          setAcademicRecords(records);
          setError(null);
        } else {
          setError('User information not available');
        }
      } catch (err) {
        console.error('Error fetching academic records:', err);
        setError('Failed to load academic records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicRecords();
  }, [currentUser]);

  // Group records by year
  const recordsByYear = academicRecords.reduce((acc, record) => {
    if (!acc[record.year]) {
      acc[record.year] = [];
    }
    acc[record.year].push(record);
    return acc;
  }, {});

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

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <>
      <h2 className="section-title">Academic Records</h2>
      
      {Object.keys(recordsByYear).length > 0 ? (
        <div className="space-y-8">
          {Object.keys(recordsByYear)
            .sort((a, b) => b - a) // Sort years in descending order
            .map((year) => (
              <div key={year} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Academic Year {year}</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recordsByYear[year]
                        .sort((a, b) => a.semester - b.semester) // Sort semesters in ascending order
                        .map((record) => (
                          <tr key={record.record_id} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{record.subject}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{record.semester}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{record.marks}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-bold rounded-full ${getGradeColor(record.grade)}`}>
                                {record.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          }
        </div>
      ) : (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
          <p>No academic records found.</p>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        Last updated: 2025-03-06 07:40:57
      </div>
    </>
  );
};

export default AcademicRecords;