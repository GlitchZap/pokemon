import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTransferCertificateRequests, updateTransferCertificateStatus } from '../../services/api';

const TransferCertificateApproval = () => {
  const { currentUser } = useAuth();
  const [tcRequests, setTcRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTc, setSelectedTc] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [comments, setComments] = useState('');
  
  // Current date and user information
  const currentDateTime = "2025-03-06 07:46:09";
  const currentUserLogin = "GlitchZap";

  useEffect(() => {
    // Fetch transfer certificate requests from API
    const fetchTcRequests = async () => {
      try {
        setLoading(true);
        const requests = await getTransferCertificateRequests();
        setTcRequests(requests || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching TC requests:', err);
        setError('Failed to load transfer certificate requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTcRequests();
  }, []);

  const handleActionClick = (tc, initialStatus) => {
    setSelectedTc(tc);
    setStatusUpdate(initialStatus === 'pending' ? '' : initialStatus);
    setComments(tc.comments || '');
    setDialogOpen(true);
  };

  const handleStatusChange = (event) => {
    setStatusUpdate(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleUpdateStatus = async () => {
    if (!selectedTc || !statusUpdate) {
      return;
    }
    
    try {
      setLoading(true);
      
      const payload = {
        status: statusUpdate,
        comments: comments,
        processed_by: currentUser.username || currentUserLogin
      };
      
      await updateTransferCertificateStatus(selectedTc.tc_id, payload);
      
      // Update the local state to reflect changes
      setTcRequests(tcRequests.map(tc => {
        if (tc.tc_id === selectedTc.tc_id) {
          return {
            ...tc,
            status: statusUpdate,
            comments: comments,
            processed_by: currentUser.username || currentUserLogin,
            processed_date: currentDateTime
          };
        }
        return tc;
      }));
      
      setDialogOpen(false);
    } catch (err) {
      console.error('Error updating TC status:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Rejected
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  if (loading && !tcRequests.length) {
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
      <h2 className="section-title">Transfer Certificate Requests</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
          <p className="text-gray-600">
            Review and approve/reject transfer certificate applications from students.
          </p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination School</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tcRequests.length > 0 ? (
                  tcRequests.map((tc) => (
                    <tr key={tc.tc_id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">TC-{tc.tc_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{tc.student_name}</div>
                        <div className="text-sm text-gray-500">ID: {tc.student_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(tc.application_date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tc.destination_school}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(tc.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {tc.status === 'pending' ? (
                          <div className="flex space-x-2">
                            <button
                              className="text-green-600 hover:text-green-900"
                              onClick={() => handleActionClick(tc, 'pending')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleActionClick(tc, tc.status)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No transfer certificate requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Modal dialog for status update */}
      {dialogOpen && selectedTc && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Update Transfer Certificate Status
                    </h3>
                    
                    <div className="mt-4">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Student: <span className="font-medium text-gray-900">{selectedTc.student_name}</span></p>
                        <p className="text-sm text-gray-500">Destination School: <span className="font-medium text-gray-900">{selectedTc.destination_school}</span></p>
                        <p className="text-sm text-gray-500">Application Date: <span className="font-medium text-gray-900">{new Date(selectedTc.application_date).toLocaleDateString()}</span></p>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-main focus:border-primary-main sm:text-sm rounded-md"
                          value={statusUpdate}
                          onChange={handleStatusChange}
                        >
                          <option value="" disabled>Select status</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                          Comments
                        </label>
                        <textarea
                          id="comments"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-main focus:border-primary-main sm:text-sm"
                          rows={3}
                          value={comments}
                          onChange={handleCommentsChange}
                          placeholder="Provide any comments or reasons for the status update"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={loading || !statusUpdate}
                  onClick={handleUpdateStatus}
                >
                  {loading ? 'Processing...' : 'Update Status'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDialogClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        Current Date and Time: 2025-03-06 07:47:50 UTC | User: GlitchZap
      </div>
    </>
  );
};

export default TransferCertificateApproval;