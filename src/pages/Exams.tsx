
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Share2, Eye } from 'lucide-react';

const Exams = () => {
  // Dummy exams data
  const exams = [
    {
      id: 1,
      title: 'Midterm Assessment',
      status: 'published',
      createdAt: '2023-04-01',
      duration: 120, // minutes
      questions: 45,
      attempts: 42
    },
    {
      id: 2,
      title: 'Chapter 5 Quiz',
      status: 'published',
      createdAt: '2023-04-10',
      duration: 45,
      questions: 20,
      attempts: 38
    },
    {
      id: 3,
      title: 'Final Exam Draft',
      status: 'draft',
      createdAt: '2023-04-15',
      duration: 180,
      questions: 60,
      attempts: 0
    },
    {
      id: 4,
      title: 'Pop Quiz: Cell Biology',
      status: 'published',
      createdAt: '2023-03-25',
      duration: 30,
      questions: 15,
      attempts: 40
    },
    {
      id: 5,
      title: 'Semester Review Test',
      status: 'draft',
      createdAt: '2023-04-18',
      duration: 90,
      questions: 35,
      attempts: 0
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Exams</h2>
          <p className="text-gray-600">Manage all your created exams</p>
        </div>
        <Link
          to="/dashboard/exams/create"
          className="flex items-center space-x-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create New</span>
        </Link>
      </div>

      {/* Filters/Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search exams..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Sort By</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Exams List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exam
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Questions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attempts
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{exam.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${exam.status === 'published' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {exam.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(exam.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.duration} mins
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.questions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.attempts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 flex justify-end">
                  <button className="text-gray-600 hover:text-gray-900" title="View">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900" title="Edit">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-green-600 hover:text-green-900" title="Share">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" title="Delete">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {exams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't created any exams yet</p>
          <Link
            to="/dashboard/exams/create"
            className="inline-flex items-center space-x-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create Your First Exam</span>
          </Link>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Exams;
