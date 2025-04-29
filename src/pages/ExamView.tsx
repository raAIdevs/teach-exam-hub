
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { 
  Clock, 
  FileText, 
  CheckCircle, 
  Users, 
  ArrowLeft,
  Share2,
  Edit,
  Printer,
  Trash2,
  Copy,
  Loader2,
} from 'lucide-react';

// Mock data for the exam
const examData = {
  id: '123',
  title: 'Biology Midterm Examination',
  description: 'Comprehensive assessment covering chapters 1-5 of the biology curriculum.',
  date: '2023-05-10T14:00:00',
  duration: 90,
  status: 'active',
  instructions: 'Read each question carefully. All MCQs have one correct answer. Long answer questions should be answered in complete sentences.',
  questions: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Which of the following is NOT a characteristic of living organisms?',
      options: [
        'Cellular organization',
        'Response to stimuli',
        'Crystalline structure',
        'Growth and development'
      ],
      correctAnswer: 2
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'The process by which plants convert light energy into chemical energy is called:',
      options: [
        'Respiration',
        'Photosynthesis',
        'Fermentation',
        'Transpiration'
      ],
      correctAnswer: 1
    },
    {
      id: 'q3',
      type: 'long',
      question: 'Explain the difference between mitosis and meiosis. Include at least three key differences and explain why each process is important.',
      marks: 10
    }
  ],
  submissions: 34,
  averageScore: 76,
  link: 'https://examhub.edu/exam/bio-mid-234'
};

const ExamView = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const [exam, setExam] = useState(examData);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(exam.link);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Exam link copied to clipboard.",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  const deleteExam = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Exam deleted",
        description: "The exam has been permanently deleted.",
      });
      setLoading(false);
      // In a real app, we would redirect to the exams list here
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center mb-2">
            <Link to="/dashboard/exams" className="text-gray-600 hover:text-primary mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">{exam.title}</h2>
          </div>
          <p className="text-gray-600">{exam.description}</p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center" onClick={copyLink}>
            {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          
          <Button variant="destructive" size="sm" className="flex items-center" onClick={deleteExam} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Trash2 className="h-4 w-4 mr-1" />}
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Status</p>
            <p className="text-lg font-bold text-green-600">Active</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Date & Time</p>
            <p className="text-lg font-bold text-gray-800">{formatDate(exam.date)}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Submissions</p>
            <p className="text-lg font-bold text-gray-800">{exam.submissions} students</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Average Score</p>
            <p className="text-lg font-bold text-gray-800">{exam.averageScore}%</p>
          </div>
          <div className="bg-amber-100 p-3 rounded-full">
            <FileText className="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </div>
      
      {/* Exam Details */}
      <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Exam Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
              <p className="text-gray-900">{exam.duration} minutes</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Number of Questions</h4>
              <p className="text-gray-900">{exam.questions.length} (MCQ: {exam.questions.filter(q => q.type === 'mcq').length}, Long Answer: {exam.questions.filter(q => q.type === 'long').length})</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Exam Link</h4>
              <div className="flex items-center">
                <p className="text-primary truncate max-w-xs">{exam.link}</p>
                <button onClick={copyLink} className="ml-2 text-gray-500 hover:text-primary">
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Instructions for Students</h4>
            <p className="text-gray-900">{exam.instructions}</p>
          </div>
        </div>
      </div>
      
      {/* Exam Questions Preview */}
      <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Questions Preview</h3>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit Questions
          </Button>
        </div>
        
        <div className="space-y-6">
          {exam.questions.map((question, index) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Question {index + 1}: {question.type === 'mcq' ? 'Multiple Choice' : 'Long Answer'}</h4>
                {question.type === 'long' && <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{question.marks} marks</span>}
              </div>
              
              <p className="text-gray-800 mb-3">{question.question}</p>
              
              {question.type === 'mcq' && (
                <div className="space-y-2 pl-4">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className={`flex items-center p-2 rounded ${question.correctAnswer === optIndex ? 'bg-green-50 border border-green-200' : ''}`}>
                      <div className={`h-4 w-4 rounded-full mr-2 flex items-center justify-center ${question.correctAnswer === optIndex ? 'bg-green-500 text-white' : 'border border-gray-300'}`}>
                        {question.correctAnswer === optIndex && <CheckCircle className="h-3 w-3" />}
                      </div>
                      <span className={question.correctAnswer === optIndex ? 'font-medium' : ''}>{option}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExamView;
