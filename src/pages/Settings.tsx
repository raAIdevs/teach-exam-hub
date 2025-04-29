
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bell,
  Mail,
  Settings as SettingsIcon,
  Lock,
  Loader2
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    emailReports: true,
    reminderEmails: true,
    studentSubmissions: true,
    marketingEmails: false
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [exportSettings, setExportSettings] = useState({
    includeStudentNames: true,
    showUnansweredQuestions: false,
    includeTimeDetails: true,
    format: 'pdf'
  });

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportSettingChange = (setting) => {
    if (setting === 'format') return;
    
    setExportSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleFormatChange = (format) => {
    setExportSettings(prev => ({
      ...prev,
      format
    }));
  };

  const savePassword = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
      setSecurity({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveNotifications = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveExportSettings = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Export settings saved",
        description: "Your export preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600">Customize your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Settings Menu</h3>
            </div>
            <nav className="space-y-1 p-2">
              <a
                href="#notifications"
                className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Bell className="h-5 w-5 mr-3 text-primary" />
                <span>Email Notifications</span>
              </a>
              <a
                href="#security"
                className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Lock className="h-5 w-5 mr-3 text-primary" />
                <span>Security</span>
              </a>
              <a
                href="#exports"
                className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>Report Export</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Email Notifications */}
          <div id="notifications" className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              Email Notifications
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email for important notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="" 
                    className="sr-only peer"
                    checked={notificationSettings.emailNotifications}
                    onChange={() => handleNotificationChange('emailNotifications')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Exam Reports</p>
                  <p className="text-sm text-gray-500">Receive exam completion reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="" 
                    className="sr-only peer"
                    checked={notificationSettings.emailReports}
                    onChange={() => handleNotificationChange('emailReports')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Reminder Emails</p>
                  <p className="text-sm text-gray-500">Receive reminders for scheduled exams</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="" 
                    className="sr-only peer"
                    checked={notificationSettings.reminderEmails}
                    onChange={() => handleNotificationChange('reminderEmails')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Student Submissions</p>
                  <p className="text-sm text-gray-500">Receive emails when students submit exams</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="" 
                    className="sr-only peer"
                    checked={notificationSettings.studentSubmissions}
                    onChange={() => handleNotificationChange('studentSubmissions')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Marketing Emails</p>
                  <p className="text-sm text-gray-500">Receive product updates and marketing</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="" 
                    className="sr-only peer"
                    checked={notificationSettings.marketingEmails}
                    onChange={() => handleNotificationChange('marketingEmails')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={saveNotifications} 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Notification Settings'
                )}
              </Button>
            </div>
          </div>

          {/* Security */}
          <div id="security" className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Lock className="mr-2 h-5 w-5 text-primary" />
              Security
            </h3>

            <form onSubmit={savePassword}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Changing Password...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Export Settings */}
          <div id="exports" className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <SettingsIcon className="mr-2 h-5 w-5 text-primary" />
              Report Export Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Include Student Names</p>
                  <p className="text-sm text-gray-500">Include student names in exported reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={exportSettings.includeStudentNames}
                    onChange={() => handleExportSettingChange('includeStudentNames')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Show Unanswered Questions</p>
                  <p className="text-sm text-gray-500">Include unanswered questions in reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={exportSettings.showUnansweredQuestions}
                    onChange={() => handleExportSettingChange('showUnansweredQuestions')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Include Time Details</p>
                  <p className="text-sm text-gray-500">Show time taken per question in reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={exportSettings.includeTimeDetails}
                    onChange={() => handleExportSettingChange('includeTimeDetails')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <Label>Export Format</Label>
                <div className="flex space-x-3 mt-2">
                  <Button
                    type="button"
                    variant={exportSettings.format === 'pdf' ? 'default' : 'outline'}
                    onClick={() => handleFormatChange('pdf')}
                    className="flex-1"
                  >
                    PDF
                  </Button>
                  <Button
                    type="button"
                    variant={exportSettings.format === 'excel' ? 'default' : 'outline'}
                    onClick={() => handleFormatChange('excel')}
                    className="flex-1"
                  >
                    Excel
                  </Button>
                  <Button
                    type="button"
                    variant={exportSettings.format === 'csv' ? 'default' : 'outline'}
                    onClick={() => handleFormatChange('csv')}
                    className="flex-1"
                  >
                    CSV
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={saveExportSettings}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Export Settings'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
