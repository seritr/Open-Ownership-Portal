'use client';

import { useEffect, useMemo, useState } from 'react';
import { Eye, MessageSquare, Download, FileText, User, X } from 'lucide-react';
import { Application } from '@/app/lib/mockData';

interface ApplicationsTableProps {
  applications: Application[];
  currentRole: 'officer' | 'supervisor';
}

export default function ApplicationsTable({ applications, currentRole }: ApplicationsTableProps) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      review: 'bg-blue-100 text-blue-800 border-blue-200',
      rejected: 'bg-rose-100 text-rose-800 border-rose-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityIndicator = (priority: string) => {
    if (priority === 'high') return <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />;
    if (priority === 'medium') return <div className="w-2 h-2 bg-amber-500 rounded-full" />;
    return <div className="w-2 h-2 bg-emerald-500 rounded-full" />;
  };

  const csv = useMemo(() => {
    if (applications.length === 0) return '';
    const headers = ['ID','Type','Status','Submitted By','Assigned To','Date','Amount','Priority','Days In Process','Next Action'];
    const rows = applications.map(a => [
      a.id,
      a.type,
      a.status,
      a.submittedBy,
      a.assignedTo,
      a.date,
      String(a.amount),
      a.priority,
      String(a.daysInProcess),
      a.nextAction
    ]);
    const toCSVLine = (arr: string[]) => arr.map(v => {
      const val = (v ?? '').toString().replace(/"/g, '""');
      return /[",\n]/.test(val) ? `"${val}"` : val;
    }).join(',');
    return [toCSVLine(headers), ...rows.map(r => toCSVLine(r as unknown as string[]))].join('\n');
  }, [applications]);

  const downloadCSV = () => {
    if (!csv) return;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applications.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Allow other components to trigger export via event
  useEffect(() => {
    const handler = () => downloadCSV();
    window.addEventListener('export-applications', handler as EventListener);
    return () => window.removeEventListener('export-applications', handler as EventListener);
  }, [csv]);

  const handleMessage = (app: Application) => {
    const message = window.prompt(`Send a message regarding ${app.id}:`, 'Hello, I have a question about your application.');
    if (message && message.trim()) {
      window.alert('Message sent (mock):\n\n' + message);
    }
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">No applications found</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {currentRole === 'officer' ? 'My Applications' : 'All Applications'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {applications.length} result{applications.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button onClick={downloadCSV} className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center">
          Export list
          <Download className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Application</th>
              {currentRole === 'supervisor' && (
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Officer</th>
              )}
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Next Action</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Days</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {getPriorityIndicator(app.priority)}
                    <div>
                      <p className="text-sm font-bold text-gray-900">{app.id}</p>
                      <p className="text-xs text-gray-600">{app.type}</p>
                    </div>
                  </div>
                </td>

                {currentRole === 'supervisor' && (
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{app.submittedBy}</p>
                        <p className="text-xs text-gray-500">{app.assignedTo}</p>
                      </div>
                    </div>
                  </td>
                )}

                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${getStatusColor(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{app.nextAction}</p>
                  <p className="text-xs text-gray-500">{app.date}</p>
                </td>

                <td className="px-6 py-4">
                  <span className={`text-sm font-bold ${
                    app.daysInProcess > 7 ? 'text-rose-600' :
                    app.daysInProcess > 5 ? 'text-amber-600' : 'text-gray-900'
                  }`}>
                    {app.daysInProcess} days
                  </span>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-900">${app.amount}</p>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setSelectedApp(app)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleMessage(app)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Message">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button onClick={() => setSelectedApp(app)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                      Open
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h4 className="text-lg font-bold text-gray-900">Application Details</h4>
              <button onClick={() => setSelectedApp(null)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">ID</span><span className="font-semibold text-gray-900">{selectedApp.id}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Type</span><span className="font-semibold text-gray-900">{selectedApp.type}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Status</span><span className="font-semibold text-gray-900">{selectedApp.status}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Submitted By</span><span className="font-semibold text-gray-900">{selectedApp.submittedBy}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Assigned To</span><span className="font-semibold text-gray-900">{selectedApp.assignedTo}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Date</span><span className="font-semibold text-gray-900">{selectedApp.date}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-semibold text-gray-900">${selectedApp.amount}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Priority</span><span className="font-semibold text-gray-900">{selectedApp.priority}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Days In Process</span><span className="font-semibold text-gray-900">{selectedApp.daysInProcess}</span></div>
              <div className="text-sm"><span className="text-gray-500">Next Action</span><div className="font-semibold text-gray-900">{selectedApp.nextAction}</div></div>
            </div>
            <div className="px-5 py-4 border-t flex justify-end gap-2">
              <button onClick={() => { setSelectedApp(null); }} className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">Close</button>
              <button onClick={() => { setSelectedApp(null); window.alert('Started processing (mock)'); }} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Start Processing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}