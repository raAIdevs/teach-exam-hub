
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  ChartBar, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

// Sample data for demonstration
const examData = [
  { id: 1, title: "Midterm Biology Exam", date: "2023-04-10", students: 38, avgScore: 76, passingRate: 87 },
  { id: 2, title: "Chapter 5 Physics Quiz", date: "2023-04-15", students: 42, avgScore: 68, passingRate: 79 },
  { id: 3, title: "Chemistry Pop Quiz", date: "2023-04-20", students: 40, avgScore: 81, passingRate: 92 },
];

// Mock data for charts
const scoreDistribution = [
  { range: '0-20', count: 3 },
  { range: '21-40', count: 7 },
  { range: '41-60', count: 12 },
  { range: '61-80', count: 15 },
  { range: '81-100', count: 10 }
];

const timeDistribution = [
  { range: '<30min', count: 8 },
  { range: '30-45min', count: 15 },
  { range: '45-60min', count: 10 },
  { range: '>60min', count: 5 }
];

const questionPerformance = [
  { id: 1, correct: 32, incorrect: 6 },
  { id: 2, correct: 28, incorrect: 10 },
  { id: 3, correct: 35, incorrect: 3 },
  { id: 4, correct: 20, incorrect: 18 },
  { id: 5, correct: 30, incorrect: 8 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const [selectedExam, setSelectedExam] = useState(examData[0]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Exam Reports</h2>
        <p className="text-gray-600">Detailed performance analytics for your exams</p>
      </div>

      {/* Exam Selection */}
      <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Select Exam</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examData.map((exam) => (
            <div
              key={exam.id}
              onClick={() => setSelectedExam(exam)}
              className={`border rounded-lg p-4 cursor-pointer transition ${
                selectedExam.id === exam.id
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              <h4 className="font-medium text-gray-900">{exam.title}</h4>
              <p className="text-sm text-gray-500">
                {new Date(exam.date).toLocaleDateString()} • {exam.students} students
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Students</p>
            <p className="text-2xl font-bold text-gray-800">{selectedExam.students}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Average Score</p>
            <p className="text-2xl font-bold text-gray-800">{selectedExam.avgScore}%</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <ChartBar className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Passing Rate</p>
            <p className="text-2xl font-bold text-gray-800">{selectedExam.passingRate}%</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <CheckCircle className="h-6 w-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Avg. Completion Time</p>
            <p className="text-2xl font-bold text-gray-800">42 min</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Score Distribution Chart */}
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={scoreDistribution}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8">
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Distribution Chart */}
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Completion Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {timeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Question Performance */}
      <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Question Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={questionPerformance}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" label={{ value: 'Question Number', position: 'insideBottom', offset: -5 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="correct" stackId="a" fill="#82ca9d" name="Correct" />
              <Bar dataKey="incorrect" stackId="a" fill="#ff8042" name="Incorrect" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Students */}
      <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Students</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Taken</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Cooper</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">98%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32 min</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Passed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wade Warren</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">95%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 min</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Passed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Esther Howard</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">37 min</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Passed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Devon Lane</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">88%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">51 min</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Passed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cameron Williamson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">40 min</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Passed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
