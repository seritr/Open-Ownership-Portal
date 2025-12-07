'use client';
import { useState } from 'react';
import { Bell, Menu, X, User, Zap } from 'lucide-react';

interface HeaderProps {
  urgentCount: number;
  currentRole: 'officer' | 'supervisor';
  userName: string;
  roleTitle: string;
}

export default function Header({ urgentCount, currentRole, userName, roleTitle }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const handleBellClick = () => {
    if (urgentCount > 0) {
      alert(`${urgentCount} urgent item${urgentCount > 1 ? 's' : ''} need your attention.`);
      scrollTo('payments-section');
    } else {
      alert('No urgent notifications.');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ServiceHub</h1>
                <p className="text-xs text-gray-500">Digital Portal</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-3">
            <button onClick={handleBellClick} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative group" aria-label="Notifications">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {urgentCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-rose-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-pulse">
                  {urgentCount}
                </span>
              )}
            </button>

            <div className="flex items-center space-x-3 border-l pl-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{roleTitle}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {['Dashboard', 'Applications', 'Payments', 'Reports'].map(item => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Dashboard') window.scrollTo({ top: 0, behavior: 'smooth' });
                  else if (item === 'Applications') scrollTo('applications-section');
                  else if (item === 'Payments') scrollTo('payments-section');
                  else if (item === 'Reports') scrollTo('metrics-section');
                }}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${item === 'Dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}