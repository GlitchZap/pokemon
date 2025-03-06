import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudentProfile } from '../../services/api';

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Current date and user information
  const currentDateTime = "2025-03-06 07:39:13";
  const currentUserLogin = "GlitchZap";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        if (currentUser && currentUser.id) {
          const profileData = await getStudentProfile(currentUser.id);
          setProfile(profileData);
          setError(null);
        } else {
          setError('User information not available');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

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

  if (!profile) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
        <p>No profile information found.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="section-title">My Profile</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <h3 className="text-xl font-bold">Personal Information</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 mb-1">Student ID</p>
                <p className="font-medium">{profile.student_id}</p>
              </div>
              
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
              
              {profile.aadhar_id && (
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 mb-1">Aadhar ID</p>
                  <p className="font-medium">{profile.aadhar_id}</p>
                </div>
              )}
              
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="font-medium">{new Date(profile.dob).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 mb-1">Contact Information</p>
                <p className="font-medium">{profile.contact_info}</p>
              </div>
              
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 mb-1">School ID</p>
                <p className="font-medium">{profile.current_school_id}</p>
              </div>
              
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 mb-1">School Name</p>
                <p className="font-medium">{profile.school_name}</p>
              </div>
              
              {profile.enrollment_date && (
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 mb-1">Enrollment Date</p>
                  <p className="font-medium">{new Date(profile.enrollment_date).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-right">
            <button className="btn-outline">Edit Contact Information</button>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
          Last updated: {currentDateTime}
        </div>
      </div>
    </>
  );
};

export default Profile;