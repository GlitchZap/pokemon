import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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
export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};

// Student Profile
export const getStudentProfile = async (studentId) => {
  try {
    const response = await API.get(`/students/${studentId}`);
    return response.data.profile;
  } catch (error) {
    console.error('Get Student Profile API Error:', error);
    throw error;
  }
};

// Academic Records
export const getStudentAcademicRecords = async (studentId) => {
  try {
    const response = await API.get(`/students/${studentId}/academic-records`);
    return response.data.academicRecords;
  } catch (error) {
    console.error('Get Academic Records API Error:', error);
    throw error;
  }
};

// Student Documents
export const getStudentDocuments = async (studentId) => {
  try {
    const response = await API.get(`/students/${studentId}/documents`);
    return response.data.documents;
  } catch (error) {
    console.error('Get Documents API Error:', error);
    throw error;
  }
};

export const uploadStudentDocument = async (studentId, formData) => {
  try {
    const response = await API.post(`/students/${studentId}/documents/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload Document API Error:', error);
    throw error;
  }
};

// Transfer Certificates
export const applyForTransferCertificate = async (studentId, tcData) => {
  try {
    const response = await API.post(`/students/${studentId}/transfer-certificate`, tcData);
    return response.data;
  } catch (error) {
    console.error('Apply Transfer Certificate API Error:', error);
    throw error;
  }
};

export const getTransferCertificateStatus = async (studentId) => {
  try {
    const response = await API.get(`/students/${studentId}/transfer-certificate`);
    return response.data.transferCertificates;
  } catch (error) {
    console.error('Get Transfer Certificate Status API Error:', error);
    throw error;
  }
};

// Scheme History
export const getStudentSchemeHistory = async (studentId) => {
  try {
    const response = await API.get(`/students/${studentId}/schemes`);
    return response.data.schemes;
  } catch (error) {
    console.error('Get Scheme History API Error:', error);
    throw error;
  }
};

// Admin Endpoints
export const getAllStudents = async () => {
  try {
    const response = await API.get('/admin/students');
    return response.data.students;
  } catch (error) {
    console.error('Get All Students API Error:', error);
    throw error;
  }
};

export const getStudentDetails = async (studentId) => {
  try {
    const response = await API.get(`/students/${studentId}`);
    return response.data.profile;
  } catch (error) {
    console.error('Get Student Details API Error:', error);
    throw error;
  }
};

export const getTransferCertificateRequests = async () => {
  try {
    const response = await API.get('/admin/transfer-certificates');
    return response.data.transferCertificates;
  } catch (error) {
    console.error('Get Transfer Certificate Requests API Error:', error);
    throw error;
  }
};

export const updateTransferCertificateStatus = async (tcId, statusData) => {
  try {
    const response = await API.patch(`/admin/transfer-certificates/${tcId}`, statusData);
    return response.data;
  } catch (error) {
    console.error('Update Transfer Certificate Status API Error:', error);
    throw error;
  }
};

// School Endpoints
export const getAllSchools = async () => {
  try {
    const response = await API.get('/admin/schools');
    return response.data.schools;
  } catch (error) {
    console.error('Get All Schools API Error:', error);
    throw error;
  }
};

export default API;