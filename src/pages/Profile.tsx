
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { User, Mail, BookOpen, Building, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: user?.subject || '',
    institute: user?.institute || '',
    bio: 'Dedicated educator with 5+ years of teaching experience.',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsSubmitting(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        <p className="text-gray-600">View and edit your profile information</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="md:flex">
          {/* Profile sidebar */}
          <div className="md:w-1/3 border-r p-6 flex flex-col items-center">
            <div className="h-32 w-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl mb-4">
              {user?.name?.[0] || 'T'}
            </div>
            <h3 className="text-xl font-semibold mb-1">{user?.name}</h3>
            <p className="text-gray-600 mb-4">{user?.subject} Teacher</p>
            <div className="w-full mt-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-2 px-4 border border-primary text-primary rounded-md hover:bg-primary/10 transition"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile content */}
          <div className="md:w-2/3 p-6">
            <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 absolute ml-3" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={`pl-10 w-full px-4 py-2 border rounded-md ${
                        isEditing 
                          ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                          : "border-transparent bg-gray-100"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 absolute ml-3" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={`pl-10 w-full px-4 py-2 border rounded-md ${
                        isEditing 
                          ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                          : "border-transparent bg-gray-100"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-gray-400 absolute ml-3" />
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={`pl-10 w-full px-4 py-2 border rounded-md ${
                        isEditing 
                          ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                          : "border-transparent bg-gray-100"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="institute" className="block text-sm font-medium text-gray-700 mb-1">
                    Institute/School
                  </label>
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-400 absolute ml-3" />
                    <input
                      type="text"
                      name="institute"
                      id="institute"
                      value={formData.institute}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={`pl-10 w-full px-4 py-2 border rounded-md ${
                        isEditing 
                          ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                          : "border-transparent bg-gray-100"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-2 border rounded-md ${
                      isEditing 
                        ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                        : "border-transparent bg-gray-100"
                    }`}
                  ></textarea>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
