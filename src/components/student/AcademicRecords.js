import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AcademicRecords = () => {
  const { currentUser } = useAuth();
  const [academicRecords, setAcademicRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Current date and user information
  const currentDateTime = "2025-03-05 18:52:18";
  const currentUserLogin = "GlitchZap";

  useEffect(() => {
    // Simulate API call with timeout
    const fetchAcademicRecords = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock academic records data
        const mockRecords = [
          { record_id: 1, subject: "Mathematics", year: 2024, semester: 1, marks: 85, grade: "A" },
          { record_id: 2, subject: "Science", year: 2024, semester: 1, marks: 78, grade: "B+" },
          { record_id: 3, subject: "English", year: 2024, semester: 1, marks: 92, grade: "A+" },
          { record_id: 4, subject: "Social Studies", year: 2024, semester: 1, marks: 88, grade: "A" },
          { record_id: 5, subject: "Hindi", year: 2024, semester: 1, marks: 90, grade: "A+" },
          { record_id: 6, subject: "Mathematics", year: 2023, semester: 2, marks: 82, grade: "A-" },
          { record_id: 7, subject: "Science", year: 2023, semester: 2, marks: 76, grade: "B" },
          { record_id: 8, subject: "English", year: 2023, semester: 2, marks: 89, grade: "A" },
          { record_id: 9, subject: "Social Studies", year: 2023, semester: 2, marks: 84, grade: "B+" },
          { record_id: 10, subject: "Hindi", year: 2023, semester: 2, marks: 87, grade: "A" }
        ];
        
        setAcademicRecords(mockRecords);
        setError(null);
      } catch (err) {
        console.error('Error fetching academic records:', err);
        setError('Failed to load academic records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicRecords();
  }, []);

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
        Last updated: {currentDateTime}
      </div>
    </>
  );
};

export default AcademicRecords;