import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication
export const login = (credentials) => {
  return API.post('/auth/login', credentials);
};

// Student Profile
export const getStudentProfile = (studentId) => {
  return API.get(`/students/${studentId}`);
};

// Academic Records
export const getStudentAcademicRecords = (studentId) => {
  return API.get(`/students/${studentId}/academic-records`);
};

// Student Documents
export const getStudentDocuments = (studentId) => {
    return API.get(`/students/${studentId}/documents`);
  };
  
  export const uploadStudentDocument = (studentId, formData) => {
    return API.post(`/students/${studentId}/documents/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  
  // Transfer Certificates
  export const applyForTransferCertificate = (studentId, tcData) => {
    return API.post(`/students/${studentId}/transfer-certificate`, tcData);
  };
  
  export const getTransferCertificateStatus = (studentId) => {
    return API.get(`/students/${studentId}/transfer-certificate`);
  };
  
  // Scheme History
  export const getStudentSchemeHistory = (studentId) => {
    return API.get(`/students/${studentId}/schemes`);
  };
  
  // Admin Endpoints
  export const getAllStudents = () => {
    return API.get('/admin/students');
  };
  
  export const getStudentDetails = (studentId) => {
    return API.get(`/admin/students/${studentId}`);
  };
  
  export const getTransferCertificateRequests = () => {
    return API.get('/admin/transfer-certificates');
  };
  
  export const updateTransferCertificateStatus = (tcId, statusData) => {
    return API.patch(`/admin/transfer-certificates/${tcId}`, statusData);
  };
  
  // School Endpoints
  export const getAllSchools = () => {
    return API.get('/admin/schools');
  };
  
  export const getSchoolDetails = (schoolId) => {
    return API.get(`/admin/schools/${schoolId}`);
  };
  
  export default API;