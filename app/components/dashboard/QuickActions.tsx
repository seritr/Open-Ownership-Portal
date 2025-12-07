'use client';
// components/dashboard/QuickActions.tsx
import { useEffect, useState } from 'react';
import type React from 'react';
import { Plus, DollarSign, Eye, BarChart3, Download, ArrowRight, X } from 'lucide-react';

interface QuickActionsProps {
  currentRole: 'officer' | 'supervisor';
  payments: any[];
}

export default function QuickActions({ currentRole, payments }: QuickActionsProps) {
  const totalDue = payments.reduce((s: number, p: any) => s + p.amount, 0);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newForm, setNewForm] = useState({ applicant: '', type: '', amount: '', notes: '' });

  const openNew = () => setShowNewModal(true);
  const closeNew = () => setShowNewModal(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewForm(prev => ({ ...prev, [name]: value }));
  };
  const submitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.applicant.trim() || !newForm.type.trim()) {
      alert('Please fill in Applicant Name and Application Type.');
      return;
    }
    const amountNum = newForm.amount ? Number(newForm.amount) : 0;
    if (newForm.amount && isNaN(amountNum)) {
      alert('Amount must be a number.');
      return;
    }
    alert(`New application started (mock):\n\nApplicant: ${newForm.applicant}\nType: ${newForm.type}\nAmount: $${amountNum || 0}\nNotes: ${newForm.notes || '(none)'}`);
    setShowNewModal(false);
    setNewForm({ applicant: '', type: '', amount: '', notes: '' });
  };

  // Close on Esc
  useEffect(() => {
    if (!showNewModal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowNewModal(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showNewModal]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const triggerExport = () => {
    window.dispatchEvent(new Event('export-applications'));
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
        <span className="text-sm text-gray-500">One-click shortcuts</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* New Application */}
        <button onClick={openNew} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 text-left group border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
              <Plus className="w-6 h-6 text-indigo-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="font-bold text-gray-900 mb-1">New Application</p>
          <p className="text-sm text-gray-600">Submit in under 2 minutes</p>
        </button>

        {/* Pay All */}
        <button onClick={() => scrollTo('payments-section')} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 text-left group border border-gray-100 hover:border-emerald-200 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="font-bold text-gray-900 mb-1">Pay All Pending</p>
          <p className="text-sm text-gray-600">${totalDue} total</p>
        </button>

        {/* Track Status */}
        <button onClick={() => scrollTo('applications-section')} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 text-left group border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="font-bold text-gray-900 mb-1">Track Status</p>
          <p className="text-sm text-gray-600">Real-time updates</p>
        </button>

        {/* Role-specific */}
        {currentRole === 'supervisor' ? (
          <button onClick={() => scrollTo('metrics-section')} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 text-left group border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-bold text-gray-900 mb-1">Team Analytics</p>
            <p className="text-sm text-gray-600">Performance insights</p>
          </button>
        ) : (
          <button onClick={triggerExport} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 text-left group border border-gray-100 hover:border-amber-200 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                <Download className="w-6 h-6 text-amber-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-bold text-gray-900 mb-1">Download Documents</p>
            <p className="text-sm text-gray-600">Export & share</p>
          </button>
        )}
      </div>

      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" onClick={closeNew}>
          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h4 className="text-lg font-bold text-gray-900">Start New Application</h4>
              <button onClick={closeNew} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={submitNew} className="px-5 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="applicant">Applicant Name</label>
                <input
                  id="applicant"
                  name="applicant"
                  value={newForm.applicant}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">Application Type</label>
                <select
                  id="type"
                  name="type"
                  value={newForm.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a type…</option>
                  <option>Trading License</option>
                  <option>Business Name Registration</option>
                  <option>Health Permit</option>
                  <option>Liquor License</option>
                  <option>Fire Safety Certificate</option>
                  <option>Environmental Clearance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">Amount (optional)</label>
                <input
                  id="amount"
                  name="amount"
                  value={newForm.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 250"
                  inputMode="decimal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={newForm.notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Any additional details…"
                />
              </div>

              <div className="pt-2 border-t flex justify-end gap-2">
                <button type="button" onClick={closeNew} className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Start (Mock)</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}