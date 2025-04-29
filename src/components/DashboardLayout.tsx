
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Book, 
  LayoutDashboard, 
  FileText, 
  ChartBar, 
  Settings, 
  LogOut, 
  Menu,
  X,
  User
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Exams', path: '/dashboard/exams', icon: FileText },
    { name: 'Reports', path: '/dashboard/reports', icon: ChartBar },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b px-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gray-900">TeachExamHub</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition ${
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive(item.path) ? "text-white" : "text-gray-500"}`} />
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-md transition"
          >
            <LogOut className="h-5 w-5 text-gray-500" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileSidebarOpen(false)}
      ></div>

      <aside className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 border-b px-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gray-900">TeachExamHub</span>
          </Link>
          <button onClick={() => setMobileSidebarOpen(false)}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition ${
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setMobileSidebarOpen(false)}
              >
                <item.icon className={`h-5 w-5 ${isActive(item.path) ? "text-white" : "text-gray-500"}`} />
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-md transition"
          >
            <LogOut className="h-5 w-5 text-gray-500" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 bg-white shadow-sm px-6">
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 md:ml-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => isActive(item.path))?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-700">
                {user?.name || 'Teacher'}
              </span>
              <span className="text-xs text-gray-500">
                {user?.institute || 'School'}
              </span>
            </div>
            <div className="ml-3 relative">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.name?.[0] || 'T'}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
