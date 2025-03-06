import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object({
  reason: Yup.string().required('Reason for transfer is required'),
  destinationSchool: Yup.string().required('Destination school is required'),
  transferDate: Yup.date().required('Transfer date is required'),
  parentConsent: Yup.boolean().oneOf([true], 'Parent/Guardian consent is required'),
});

const TransferCertificate = () => {
  const { currentUser } = useAuth();
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  // Current date and user information
  const currentDateTime = "2025-03-05 18:55:56";
  const currentUserLogin = "GlitchZap";

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Submitted values:', values);
      
      setNotification({
        show: true,
        message: 'Transfer certificate application submitted successfully',
        type: 'success'
      });
      
      resetForm();
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 5000);
    } catch (error) {
      console.error('Error submitting TC application:', error);
      
      setNotification({
        show: true,
        message: 'Failed to submit application. Please try again.',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="section-title">Transfer Certificate Application</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <p className="text-gray-600">
            Fill out the form below to apply for a Transfer Certificate. Please ensure all information is accurate before submitting.
          </p>
        </div>
        
        <div className="p-6">
          <Formik
            initialValues={{
              reason: '',
              destinationSchool: '',
              transferDate: '',
              additionalInfo: '',
              parentConsent: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="reason" className="form-label">
                    Reason for Transfer <span className="text-red-500">*</span>
                  </label>
                  <Field
                    id="reason"
                    name="reason"
                    as="textarea"
                    rows={3}
                    className={`form-input ${touched.reason && errors.reason ? 'border-red-500' : ''}`}
                    placeholder="Please provide the reason for requesting a transfer certificate"
                  />
                  <ErrorMessage name="reason" component="p" className="error-text" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="destinationSchool" className="form-label">
                      Destination School <span className="text-red-500">*</span>
                    </label>
                    <Field
                      id="destinationSchool"
                      name="destinationSchool"
                      type="text"
                      className={`form-input ${touched.destinationSchool && errors.destinationSchool ? 'border-red-500' : ''}`}
                      placeholder="Enter the name of the destination school"
                    />
                    <ErrorMessage name="destinationSchool" component="p" className="error-text" />
                  </div>
                  
                  <div>
                    <label htmlFor="transferDate" className="form-label">
                      Expected Transfer Date <span className="text-red-500">*</span>
                    </label>
                    <Field
                      id="transferDate"
                      name="transferDate"
                      type="date"
                      className={`form-input ${touched.transferDate && errors.transferDate ? 'border-red-500' : ''}`}
                    />
                    <ErrorMessage name="transferDate" component="p" className="error-text" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="additionalInfo" className="form-label">
                    Additional Information (Optional)
                  </label>
                  <Field
                    id="additionalInfo"
                    name="additionalInfo"
                    as="textarea"
                    rows={4}
                    className="form-input"
                    placeholder="Any additional details that might be relevant to your application"
                  />
                </div>
                
                <div>
                  <div className="flex items-center">
                    <Field
                      id="parentConsent"
                      name="parentConsent"
                      type="checkbox"
                      className={`h-4 w-4 text-primary-main focus:ring-primary-light border-gray-300 rounded ${touched.parentConsent && errors.parentConsent ? 'border-red-500' : ''}`}
                    />
                    <label htmlFor="parentConsent" className="ml-2 block text-gray-700">
                      I confirm that I have my parent/guardian's consent for this transfer application <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <ErrorMessage name="parentConsent" component="p" className="error-text" />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary px-6 flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
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
        Current Date and Time: 2025-03-05 18:57:38 UTC | User: GlitchZap
      </div>
    </>
  );
};

export default TransferCertificate;