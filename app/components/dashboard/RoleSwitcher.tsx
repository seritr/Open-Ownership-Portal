// components/dashboard/RoleSwitcher.tsx
'use client';

import { User } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: 'officer' | 'supervisor';
  setCurrentRole: (role: 'supervisor' | 'officer') => void;
}

export default function RoleSwitcher({ currentRole, setCurrentRole }: RoleSwitcherProps) {
  return (
    <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-indigo-900">Demo Mode</p>
            <p className="text-xs text-indigo-700">Switch between user roles</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentRole('officer')}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentRole === 'officer'
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200'
            }`}
          >
            Service Officer
          </button>
          <button
            onClick={() => setCurrentRole('supervisor')}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentRole === 'supervisor'
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200'
            }`}
          >
            Supervisor
          </button>
        </div>
      </div>
    </div>
  );
}