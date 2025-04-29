
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock,
  CalendarClock,
  Plus,
  Save,
  Trash2,
  FileText,
  Settings,
  Loader2
} from 'lucide-react';

const ExamCreator = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examType, setExamType] = useState('draft'); // draft or publish
  
  const [examData, setExamData] = useState({
    title: '',
    description: '',
    duration: 60,
    date: '',
    instructions: '',
    questions: [
      { type: 'mcq', question: '', options: ['', '', '', ''], correctAnswer: 0 },
    ]
  });

  const addQuestion = (type) => {
    const newQuestion = type === 'mcq' 
      ? { type: 'mcq', question: '', options: ['', '', '', ''], correctAnswer: 0 }
      : { type: 'long', question: '', answer: '', marks: 5 };
    
    setExamData({
      ...examData,
      questions: [...examData.questions, newQuestion]
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions.splice(index, 1);
    setExamData({
      ...examData,
      questions: updatedQuestions
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...examData.questions];
    
    if (field === 'option') {
      const [optionIndex, optionValue] = value;
      updatedQuestions[index].options[optionIndex] = optionValue;
    } else {
      updatedQuestions[index][field] = value;
    }
    
    setExamData({
      ...examData,
      questions: updatedQuestions
    });
  };

  const handleExamDataChange = (field, value) => {
    setExamData({
      ...examData,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: examType === 'publish' ? "Exam Published" : "Draft Saved",
        description: examType === 'publish' 
          ? "Your exam has been published and can now be shared with students."
          : "Your exam draft has been saved successfully.",
      });
      
      // Redirect would happen here in a real implementation
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save exam. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New Exam</h2>
        <p className="text-gray-600">Configure your exam settings and add questions</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Exam Details Card */}
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Settings className="mr-2 h-5 w-5 text-primary" />
            Exam Settings
          </h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="title">Exam Title</Label>
              <Input 
                id="title" 
                value={examData.title} 
                onChange={(e) => handleExamDataChange('title', e.target.value)} 
                placeholder="e.g. Midterm Biology Exam"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="date">Exam Date</Label>
              <div className="relative mt-1">
                <CalendarClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  id="date" 
                  type="date" 
                  value={examData.date} 
                  onChange={(e) => handleExamDataChange('date', e.target.value)} 
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <div className="relative mt-1">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  id="duration"
                  type="number"
                  min={5}
                  value={examData.duration}
                  onChange={(e) => handleExamDataChange('duration', Number(e.target.value))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="description">Brief Description</Label>
              <Textarea 
                id="description" 
                value={examData.description}
                onChange={(e) => handleExamDataChange('description', e.target.value)}
                placeholder="Short description of what this exam covers"
                className="mt-1"
                rows={2}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="instructions">Instructions for Students</Label>
              <Textarea 
                id="instructions" 
                value={examData.instructions}
                onChange={(e) => handleExamDataChange('instructions', e.target.value)}
                placeholder="Instructions that will be shown to students before they start the exam"
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Questions
            </h3>
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => addQuestion('mcq')}
                className="flex items-center text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add MCQ
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => addQuestion('long')}
                className="flex items-center text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Long Answer
              </Button>
            </div>
          </div>

          {examData.questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No questions added yet. Use the buttons above to add questions.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {examData.questions.map((question, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-4 bg-white bg-opacity-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 -mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mb-3">
                    <Label htmlFor={`question-${index}`}>Question Text</Label>
                    <Textarea 
                      id={`question-${index}`}
                      value={question.question}
                      onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                      placeholder="Enter your question here"
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  {question.type === 'mcq' && (
                    <div className="space-y-3">
                      <Label>Answer Options</Label>
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`q${index}-opt${optIndex}`}
                            name={`q${index}-correct`}
                            checked={question.correctAnswer === optIndex}
                            onChange={() => updateQuestion(index, 'correctAnswer', optIndex)}
                            className="h-4 w-4 text-primary"
                          />
                          <Input 
                            value={option}
                            onChange={(e) => updateQuestion(index, 'option', [optIndex, e.target.value])}
                            placeholder={`Option ${optIndex + 1}`}
                            className="flex-1"
                          />
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 mt-1">
                        Select the radio button next to the correct answer.
                      </p>
                    </div>
                  )}

                  {question.type === 'long' && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`marks-${index}`}>Marks</Label>
                        <Input 
                          id={`marks-${index}`}
                          type="number"
                          min={1}
                          value={question.marks}
                          onChange={(e) => updateQuestion(index, 'marks', Number(e.target.value))}
                          className="w-24"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`sample-${index}`}>Sample Answer (Optional)</Label>
                        <Textarea 
                          id={`sample-${index}`}
                          value={question.answer || ''}
                          onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                          placeholder="Enter a sample answer for your reference"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setExamType('draft');
              handleSubmit(new Event('click'));
            }}
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button 
            type="submit"
            onClick={() => setExamType('publish')}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {examType === 'publish' ? 'Publishing...' : 'Saving...'}
              </>
            ) : (
              <>Publish Exam</>
            )}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ExamCreator;
