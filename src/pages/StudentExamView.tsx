
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Book, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  AlertCircle,
  Loader2
} from 'lucide-react';

// Mock exam data
const examData = {
  id: 'bio123',
  title: 'Biology Midterm Examination',
  teacherName: 'Dr. Sarah Johnson',
  institute: 'Lincoln High School',
  description: 'Comprehensive assessment covering chapters 1-5 of the biology curriculum.',
  duration: 90, // in minutes
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
      ]
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
      ]
    },
    {
      id: 'q3',
      type: 'long',
      question: 'Explain the difference between mitosis and meiosis. Include at least three key differences and explain why each process is important.',
      marks: 10
    },
    {
      id: 'q4',
      type: 'mcq',
      question: 'Which organelle is responsible for protein synthesis in a cell?',
      options: [
        'Mitochondria',
        'Golgi apparatus',
        'Ribosome',
        'Lysosome'
      ]
    },
    {
      id: 'q5',
      type: 'mcq',
      question: 'DNA replication occurs during which phase of the cell cycle?',
      options: [
        'G1 phase',
        'S phase',
        'G2 phase',
        'M phase'
      ]
    }
  ]
};

const StudentExamView = () => {
  const { toast } = useToast();
  const { examId } = useParams();
  const [exam, setExam] = useState(examData);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    studentId: ''
  });
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // Convert to seconds
  const [examStarted, setExamStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState('intro'); // intro, exam, confirmation, success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warningShown, setWarningShown] = useState(false);

  useEffect(() => {
    // Initialize empty answers when exam starts
    if (examStarted) {
      const initialAnswers = {};
      exam.questions.forEach(q => {
        initialAnswers[q.id] = q.type === 'mcq' ? null : '';
      });
      setAnswers(initialAnswers);
    }
  }, [examStarted, exam.questions]);

  useEffect(() => {
    let timer;
    
    // Start timer when exam begins
    if (examStarted && timeLeft > 0 && currentStep === 'exam') {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          // Show 5 minute warning
          if (prevTime === 300 && !warningShown) { // 5 minutes in seconds
            toast({
              title: "Time warning!",
              description: "You have 5 minutes remaining.",
              variant: "destructive",
            });
            setWarningShown(true);
          }
          
          // Auto submit with 10 seconds left
          if (prevTime === 10) {
            toast({
              title: "Time's almost up!",
              description: "Your exam will be submitted in 10 seconds.",
              variant: "destructive",
            });
          }
          
          // Time's up, auto submit
          if (prevTime === 1) {
            handleSubmit(true);
          }
          
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [examStarted, timeLeft, currentStep, warningShown]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
    parts.push(`${remainingSeconds}s`);
    
    return parts.join(' ');
  };

  const handleStartExam = () => {
    if (!studentInfo.name || !studentInfo.email) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email address.",
        variant: "destructive",
      });
      return;
    }
    
    setExamStarted(true);
    setCurrentStep('exam');
    toast({
      title: "Exam started",
      description: `You have ${exam.duration} minutes to complete this exam. Good luck!`,
    });
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (isAutoSubmit = false) => {
    setCurrentStep('confirmation');
    
    // If it's an auto-submit due to time expiration, show a different message
    if (isAutoSubmit) {
      setCurrentStep('success');
      toast({
        title: "Time's up!",
        description: "Your exam has been automatically submitted.",
        variant: "destructive",
      });
    }
  };

  const confirmSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setCurrentStep('success');
      setIsSubmitting(false);
      toast({
        title: "Submission successful",
        description: "Your exam has been submitted successfully.",
      });
    }, 1500);
  };

  const calculateProgress = () => {
    if (!examStarted) return 0;
    
    const totalQuestions = exam.questions.length;
    const answeredQuestions = Object.values(answers).filter(answer => {
      if (answer === null) return false;
      if (typeof answer === 'string' && answer.trim() === '') return false;
      return true;
    }).length;
    
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-gray-900">TeachExamHub</h1>
          </div>
          
          {examStarted && currentStep === 'exam' && (
            <div className="flex items-center">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                <Clock className="h-4 w-4" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Introduction Step */}
        {currentStep === 'intro' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 mb-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{exam.title}</h2>
                <p className="text-gray-500">{exam.institute}</p>
                <p className="text-gray-500">Created by: {exam.teacherName}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-gray-700 mr-2" />
                    <h3 className="font-medium text-gray-800">Exam Duration</h3>
                  </div>
                  <p className="text-gray-600">{exam.duration} minutes</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-gray-700 mr-2" />
                    <h3 className="font-medium text-gray-800">Questions</h3>
                  </div>
                  <p className="text-gray-600">{exam.questions.length} questions ({exam.questions.filter(q => q.type === 'mcq').length} MCQ, {exam.questions.filter(q => q.type === 'long').length} long answer)</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Instructions:</h3>
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-gray-600">{exam.instructions}</p>
                </div>
              </div>
              
              <div className="mb-6 border border-orange-200 bg-orange-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Important Notice:</h3>
                    <ul className="text-gray-600 list-disc list-inside space-y-1">
                      <li>Do not refresh the page during the exam.</li>
                      <li>The exam will auto-submit when the timer ends.</li>
                      <li>Ensure you have a stable internet connection.</li>
                      <li>Your answers are automatically saved as you type.</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-4">Enter Your Information:</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      value={studentInfo.name}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="student-email">Email Address</Label>
                    <Input
                      id="student-email"
                      type="email"
                      value={studentInfo.email}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="student-id">Student ID (Optional)</Label>
                    <Input
                      id="student-id"
                      value={studentInfo.studentId}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, studentId: e.target.value }))}
                      placeholder="Enter your student ID if applicable"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button onClick={handleStartExam} size="lg">
                  Start Exam
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Exam Step */}
        {currentStep === 'exam' && (
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800">Your Progress</h3>
                <span className="text-sm text-gray-600">{calculateProgress()}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
            
            {/* Questions */}
            <div className="space-y-6 mb-6">
              {exam.questions.map((question, index) => (
                <div key={question.id} className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-gray-800">Question {index + 1}</h3>
                    {question.type === 'long' && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {question.marks} marks
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-800 mb-4">{question.question}</p>
                  
                  {question.type === 'mcq' && (
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center">
                          <input
                            type="radio"
                            id={`q${index}-opt${optIndex}`}
                            name={`question-${question.id}`}
                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                            checked={answers[question.id] === optIndex}
                            onChange={() => handleAnswer(question.id, optIndex)}
                          />
                          <label 
                            htmlFor={`q${index}-opt${optIndex}`}
                            className="ml-2 block text-gray-800"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'long' && (
                    <div>
                      <Textarea
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                        placeholder="Type your answer here..."
                        className="mt-1"
                        rows={6}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Write a comprehensive answer. This question is worth {question.marks} marks.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Submit Button */}
            <div className="text-center">
              <Button onClick={() => handleSubmit()} size="lg">
                Submit Exam
              </Button>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {currentStep === 'confirmation' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 text-center">
              <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Submit Your Exam?</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to submit your exam? You won't be able to make any changes after submission.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setCurrentStep('exam')}>
                  Go Back
                </Button>
                <Button onClick={confirmSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Yes, Submit'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {currentStep === 'success' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 text-center">
              <div className="rounded-full bg-green-100 p-4 mx-auto w-24 h-24 flex items-center justify-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Exam Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you, {studentInfo.name}. Your exam has been successfully submitted.
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-500 text-sm">
                  A confirmation email has been sent to {studentInfo.email}.
                  <br />
                  You may now close this window.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-auto py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TeachExamHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudentExamView;
