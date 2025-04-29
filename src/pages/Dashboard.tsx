
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { FileText, Clock, Users, ChartBar, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  // Dummy data for the dashboard
  const stats = [
    { id: 1, name: 'Total Exams', value: 12, icon: FileText, color: 'bg-blue-500' },
    { id: 2, name: 'Active Exams', value: 3, icon: Clock, color: 'bg-green-500' },
    { id: 3, name: 'Students Tested', value: 248, icon: Users, color: 'bg-purple-500' },
    { id: 4, name: 'Completion Rate', value: '78%', icon: ChartBar, color: 'bg-orange-500' },
  ];

  // Dummy recent exams data
  const recentExams = [
    { id: 1, title: 'Midterm Assessment', date: '2023-04-20', students: 42, average: 76 },
    { id: 2, title: 'Chapter 5 Quiz', date: '2023-04-15', students: 38, average: 84 },
    { id: 3, title: 'Pop Quiz: Cell Biology', date: '2023-04-10', students: 40, average: 65 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}!</h2>
        <p className="text-gray-600">Here's an overview of your exam activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div 
            key={stat.id}
            className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition"
          >
            <div className={`${stat.color} p-3 rounded-full`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Exams */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Recent Exams</h3>
            <Link 
              to="/dashboard/exams" 
              className="text-primary text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentExams.length > 0 ? (
              recentExams.map((exam) => (
                <div key={exam.id} className="px-6 py-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800">{exam.title}</h4>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(exam.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{exam.students} students</p>
                      <p className="text-sm text-gray-500">Avg: {exam.average}%</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No exams created yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            <Link
              to="/dashboard/exams/create"
              className="flex items-center justify-center space-x-2 bg-primary text-white py-3 px-4 rounded-md w-full hover:bg-primary/90 transition"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Create New Exam</span>
            </Link>
            
            <Link
              to="/dashboard/exams"
              className="flex items-center justify-center space-x-2 border border-primary text-primary py-3 px-4 rounded-md w-full hover:bg-primary/10 transition"
            >
              <FileText className="h-5 w-5" />
              <span>Manage Exams</span>
            </Link>
            
            <Link
              to="/dashboard/reports"
              className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-md w-full hover:bg-gray-100 transition"
            >
              <ChartBar className="h-5 w-5" />
              <span>View Reports</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
