import React, { useState, useEffect } from 'react';

const TransferCertificateApproval = () => {
  // For demo purposes, we'll use mock data
  const [tcRequests, setTcRequests] = useState([
    {
      tc_id: 101,
      student_id: 1001,
      student_name: "Rahul Kumar",
      application_date: "2025-02-28",
      destination_school: "Delhi Public School",
      reason: "Family relocating to Delhi",
      status: "pending",
      comments: "",
      processed_by: "",
      processed_date: ""
    },
    {
      tc_id: 102,
      student_id: 1002,
      student_name: "Priya Singh",
      application_date: "2025-03-01",
      destination_school: "St. Mary's School",
      reason: "Better educational facilities",
      status: "pending",
      comments: "",
      processed_by: "",
      processed_date: ""
    },
    {
      tc_id: 103,
      student_id: 1003,
      student_name: "Amit Sharma",
      application_date: "2025-02-20",
      destination_school: "Green Valley School",
      reason: "Moving to different district",
      status: "approved",
      comments: "All documents verified. Approved.",
      processed_by: "GlitchZap",
      processed_date: "2025-02-25"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTc, setSelectedTc] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [comments, setComments] = useState('');
  
  // Current date and user information
  const currentDateTime = "2025-03-05 18:54:02";
  const currentUserLogin = "GlitchZap";

  const handleActionClick = (tc, initialStatus) => {
    setSelectedTc(tc);
    setStatusUpdate(initialStatus);
    setComments('');
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

  const handleUpdateStatus = () => {
    if (!selectedTc || !statusUpdate) {
      return;
    }
    
    // Update the local state to reflect changes
    setTcRequests(tcRequests.map(tc => {
      if (tc.tc_id === selectedTc.tc_id) {
        return {
          ...tc,
          status: statusUpdate,
          comments: comments,
          processed_by: currentUserLogin,
          processed_date: currentDateTime
        };
      }
      return tc;
    }));
    
    setDialogOpen(false);
    
    // Show a notification or success message here
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800 flex items-center w-max">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 flex items-center w-max">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 flex items-center w-max">
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

  // Updated timestamp
  // const currentDateTime = "2025-03-05 18:55:56";

  return (
    <>
      <h2 className="section-title">Transfer Certificate Requests</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <p className="text-gray-600">
            Review and approve/reject transfer certificate applications from students.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TC ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
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
                      <div className="text-sm font-medium text-gray-900">{tc.tc_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{tc.student_name}</div>
                      <div className="text-xs text-gray-500">ID: {tc.student_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{new Date(tc.application_date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{tc.destination_school}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(tc.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {tc.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <button 
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs transition duration-150"
                            onClick={() => handleActionClick(tc, 'approved')}
                          >
                            Approve
                          </button>
                          <button 
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs transition duration-150"
                            onClick={() => handleActionClick(tc, 'rejected')}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded text-xs transition duration-150"
                          onClick={() => handleActionClick(tc, tc.status)}
                        >
                          View Details
                        </button>
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
      
      {/* Status Update Modal */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto p-8 w-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {selectedTc?.status === 'pending' ? 'Update Transfer Certificate Status' : 'Transfer Certificate Details'}
            </h3>
            
            {selectedTc && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Student</p>
                  <p className="font-medium">{selectedTc.student_name} (ID: {selectedTc.student_id})</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium">{new Date(selectedTc.application_date).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Destination School</p>
                  <p className="font-medium">{selectedTc.destination_school}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium">{selectedTc.reason}</p>
                </div>
                
                {selectedTc.status === 'pending' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select 
                        value={statusUpdate}
                        onChange={handleStatusChange}
                        className="form-input"
                      >
                        <option value="">Select status</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                      <textarea
                        value={comments}
                        onChange={handleCommentsChange}
                        rows="3"
                        className="form-input"
                        placeholder="Add your comments here"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium capitalize">{selectedTc.status}</p>
                    </div>
                    {selectedTc.processed_by && (
                      <div>
                        <p className="text-sm text-gray-500">Processed By</p>
                        <p className="font-medium">{selectedTc.processed_by}</p>
                      </div>
                    )}
                    {selectedTc.processed_date && (
                      <div>
                        <p className="text-sm text-gray-500">Processed Date</p>
                        <p className="font-medium">{new Date(selectedTc.processed_date).toLocaleString()}</p>
                      </div>
                    )}
                    {selectedTc.comments && (
                      <div>
                        <p className="text-sm text-gray-500">Comments</p>
                        <p className="font-medium">{selectedTc.comments}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                onClick={handleDialogClose}
                className="btn-outline"
              >
                Cancel
              </button>
              {selectedTc?.status === 'pending' && (
                <button 
                  onClick={handleUpdateStatus}
                  className="btn-primary"
                  disabled={!statusUpdate}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        Last updated: {currentDateTime} | User: {currentUserLogin}
      </div>
    </>
  );
};

export default TransferCertificateApproval;