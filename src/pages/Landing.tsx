
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, ChartBar, Calendar } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">TeachExamHub</h1>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-primary hover:underline font-medium">Login</Link>
            <Link to="/signup" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition shadow-sm">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Effortless Exam Management for Teachers
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Create, share, and evaluate exams with a powerful yet simple platform designed exclusively for educators.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="px-8 py-3 bg-primary text-white rounded-md text-lg font-medium hover:bg-primary/90 transition shadow-md text-center">
                  Get Started
                </Link>
                <Link to="/login" className="px-8 py-3 border border-primary text-primary rounded-md text-lg font-medium hover:bg-primary/10 transition text-center">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Teacher using laptop"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features Designed for Teachers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exam Creation</h3>
              <p className="text-gray-600">
                Create exams with MCQs and long-answer questions. Save drafts until you're ready to publish.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Set exam duration and availability. Control when students can take the exam.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <ChartBar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Reports</h3>
              <p className="text-gray-600">
                View comprehensive analytics and results. Auto-grading for MCQs saves time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simple Sharing</h3>
              <p className="text-gray-600">
                Share exams with a link. No student accounts needed - just share and go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your exam process?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of teachers who have simplified their exam workflow with TeachExamHub.
          </p>
          <Link to="/signup" className="px-8 py-3 bg-white text-primary rounded-md text-lg font-medium hover:bg-gray-100 transition shadow-md inline-block">
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <Book className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-gray-900">TeachExamHub</h2>
              </div>
              <p className="mt-2 text-gray-600 max-w-md">
                Simplifying exam creation and management for teachers worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Terms</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-10 pt-6 text-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} TeachExamHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
