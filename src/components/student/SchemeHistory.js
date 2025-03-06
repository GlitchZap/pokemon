import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudentSchemeHistory } from '../../services/api';

const SchemeHistory = () => {
  const { currentUser } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Updated timestamp
  const currentDateTime = "2025-03-06 07:44:25";
  const currentUserLogin = "GlitchZap";

  useEffect(() => {
    // Fetch scheme history from API
    const fetchSchemeHistory = async () => {
      try {
        setLoading(true);
        if (currentUser && currentUser.id) {
          const schemesData = await getStudentSchemeHistory(currentUser.id);
          setSchemes(schemesData || []);
          setError(null);
        } else {
          setError('User information not available');
        }
      } catch (err) {
        console.error('Error fetching scheme history:', err);
        setError('Failed to load scheme history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeHistory();
  }, [currentUser]);

  const isSchemeActive = (startDate, endDate) => {
    const start = new Date(startDate);
    const currentDate = new Date();
    const end = endDate ? new Date(endDate) : null;
    
    return start <= currentDate && (!end || currentDate <= end);
  };

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
      <h2 className="section-title">Government Scheme History</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-teal-500 to-green-600 text-white">
          <h3 className="text-xl font-bold">Active and Past Schemes</h3>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            This page shows your participation in various government schemes and benefits.
          </p>
          
          {schemes.length > 0 ? (
            <div className="space-y-6">
              {schemes.map((scheme) => {
                const active = isSchemeActive(scheme.start_date, scheme.end_date);
                
                return (
                  <div 
                    key={scheme.history_id} 
                    className={`border rounded-lg overflow-hidden transition duration-200 transform hover:scale-[1.01] ${active ? 'border-green-500' : 'border-gray-200'}`}
                  >
                    <div className={`px-6 py-4 flex justify-between items-center ${active ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <h4 className="text-lg font-medium">{scheme.scheme_name}</h4>
                      {active ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-semibold flex items-center">
                          <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-semibold">
                          Inactive
                        </span>
                      )}
                    </div>
                    
                    <div className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="font-medium">{new Date(scheme.start_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">End Date</p>
                          <p className="font-medium">{scheme.end_date ? new Date(scheme.end_date).toLocaleDateString() : 'Ongoing'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Benefits</p>
                          <p className="font-medium">{scheme.benefits || 'Not specified'}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Details</p>
                        <p>{scheme.details || 'No additional details available.'}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-10 bg-gray-50 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No scheme history found</h3>
              <p className="mt-1 text-sm text-gray-500">
                You are not currently enrolled in any government schemes.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        Current Date and Time: 2025-03-06 07:44:25 UTC | User: GlitchZap
      </div>
    </>
  );
};

export default SchemeHistory;