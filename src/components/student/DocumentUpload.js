import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const DocumentUpload = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  // Current date and user information
  const currentDateTime = "2025-03-05 18:57:38";
  const currentUserLogin = "GlitchZap";

  const documentTypes = [
    'Aadhar Card',
    'Birth Certificate',
    'Previous School Records',
    'Medical Certificate',
    'Income Certificate',
    'Caste Certificate',
    'Passport Photo',
    'Migration Certificate',
    'Other',
  ];

  useEffect(() => {
    // Simulate API call with timeout
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock documents data
        const mockDocuments = [
          { document_id: 1, document_type: "Aadhar Card", file_name: "aadhar_card.pdf", upload_date: "2025-02-10" },
          { document_id: 2, document_type: "Birth Certificate", file_name: "birth_certificate.jpg", upload_date: "2025-02-12" },
          { document_id: 3, document_type: "Previous School Records", file_name: "school_records.pdf", upload_date: "2025-02-15" },
        ];
        
        setDocuments(mockDocuments);
        setError(null);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load document list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    
    if (!selectedFile || !documentType) {
      setNotification({
        show: true,
        message: 'Please select a file and document type',
        type: 'error'
      });
      return;
    }
    
    try {
      setUploading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful upload
      const newDocument = {
        document_id: documents.length + 1,
        document_type: documentType,
        file_name: selectedFile.name,
        upload_date: currentDateTime.split(' ')[0]
      };
      
      setDocuments([newDocument, ...documents]);
      
      // Reset form
      setSelectedFile(null);
      setDocumentType('');
      document.getElementById('file-upload').value = '';
      
      setNotification({
        show: true,
        message: 'Document uploaded successfully',
        type: 'success'
      });
    } catch (err) {
      console.error('Error uploading document:', err);
      setNotification({
        show: true,
        message: 'Failed to upload document. Please try again.',
        type: 'error'
      });
    } finally {
      setUploading(false);
    }
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) {
      return (
        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      );
    } else if (fileName.match(/\.(jpeg|jpg|png|gif)$/i)) {
      return (
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  return (
    <>
      <h2 className="section-title">Document Upload</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <h3 className="text-xl font-bold">Upload New Document</h3>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="document-type" className="form-label">
                  Document Type
                </label>
                <select
                  id="document-type"
                  value={documentType}
                  onChange={handleDocumentTypeChange}
                  className="form-input"
                >
                  <option value="">Select document type</option>
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="file-upload" className="form-label">
                  Select File
                </label>
                <div className="mt-1 flex items-center">
                  <label className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-primary-main transition-colors duration-200">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <span className="relative bg-white rounded-md font-medium text-primary-main hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-main">
                          Upload a file
                        </span>
                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </label>
                </div>
                {selectedFile && (
                  <div className="mt-2 text-sm text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={uploading || !selectedFile || !documentType}
              >
                                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Upload Document
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium">Uploaded Documents</h3>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
          </div>
        ) : error ? (
          <div className="p-6">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{error}</p>
            </div>
          </div>
        ) : documents.length > 0 ? (
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <li key={doc.document_id} className="py-4 flex items-center hover:bg-gray-50 -mx-6 px-6 transition duration-150">
                  <div className="mr-4">
                    {getFileIcon(doc.file_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {doc.document_type}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {doc.file_name}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(doc.upload_date).toLocaleDateString()}
                  </div>
                  <div className="ml-4">
                    <button className="text-primary-main hover:text-primary-dark">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No documents have been uploaded yet.
          </div>
        )}
      </div>
      
      {notification.show && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 'bg-red-100 border-l-4 border-red-500 text-red-700'}`}>
          <div className="flex">
            {notification.type === 'success' ? (
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <p>{notification.message}</p>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        Current Date and Time: 2025-03-05 18:59:47 UTC | User: GlitchZap
      </div>
    </>
  );
};

export default DocumentUpload;