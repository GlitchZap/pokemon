import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  userType: Yup.string().oneOf(['student', 'admin'], 'Invalid user type').required('User type is required'),
});

const Login = () => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoginError('');
    try {
      const success = await login(values.username, values.password, values.userType);
      if (!success) {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transform transition-all duration-300 hover:scale-105">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              PM Shri Mahatma Gandhi Government School
            </h1>
            <h2 className="text-xl text-gray-700">
              Login
            </h2>
          </div>
          
          <Formik
            initialValues={{ username: '', password: '', userType: 'student' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className="form-input"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage name="username" component="p" className="error-text" />
                </div>
                
                <div>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="form-input"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="p" className="error-text" />
                </div>
                
                <div className="space-y-2">
                  <p className="form-label">Login as:</p>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center">
                      <Field
                        type="radio"
                        name="userType"
                        value="student"
                        className="form-radio h-4 w-4 text-primary-main"
                      />
                      <span className="ml-2">Student</span>
                    </label>
                    
                    <label className="inline-flex items-center">
                      <Field
                        type="radio"
                        name="userType"
                        value="admin"
                        className="form-radio h-4 w-4 text-primary-main"
                      />
                      <span className="ml-2">Admin</span>
                    </label>
                  </div>
                  <ErrorMessage name="userType" component="p" className="error-text" />
                </div>
                
                {loginError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
                    <p>{loginError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex justify-center"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="text-center text-gray-500 text-sm">
          Current Date and Time: 2025-03-05 18:38:46 UTC
        </div>
      </div>
    </div>
  );
};

export default Login;