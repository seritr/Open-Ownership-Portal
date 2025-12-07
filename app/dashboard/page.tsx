'use client';
import { useState, useMemo } from 'react';
import { mockApplications, mockPayments } from '@/lib/mockData';
import Header from '@/components/dashboard/Header';
import RoleSwitcher from '@/components/dashboard/RoleSwitcher';
import UrgentAlerts from '@/components/dashboard/UrgentAlerts';
import QuickActions from '@/components/dashboard/QuickActions';
import InsightsGrid from '@/components/dashboard/InsightsGrid';
import SearchFilter from '@/components/dashboard/SearchFilter';
import ApplicationsTable from '@/components/dashboard/ApplicationsTable';
import PaymentsSection from '@/components/dashboard/PaymentsSection';

export default function DashboardPage() {
  const [currentRole, setCurrentRole] = useState<'officer' | 'supervisor'>('officer');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const userName = currentRole === 'officer' ? 'John Doe' : 'Sarah Manager';
  const roleTitle = currentRole === 'officer' ? 'Service Officer' : 'Supervisor';

  // Your existing useMemo logic here (applications, analytics, urgentItems)
  // ... (copy from your original code)

  const applications = useMemo(() => { /* same logic */ }, [currentRole, searchTerm, statusFilter]);
  const analytics = useMemo(() => { /* same */ }, [currentRole]);
  const urgentItems = useMemo(() => { /* same */ }, [applications, currentRole]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header urgentCount={urgentItems.length} currentRole={currentRole} userName={userName} roleTitle={roleTitle} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RoleSwitcher currentRole={currentRole} setCurrentRole={setCurrentRole} />

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {currentRole === 'officer' ? 'John' : 'Sarah'}
          </h2>
          <p className="text-lg text-gray-600">
            {currentRole === 'officer'
              ? `You have ${applications.filter(a => a.status === 'pending').length} pending applications.`
              : `${analytics.pending} applications need attention.`}
          </p>
        </div>

        {urgentItems.length > 0 && <UrgentAlerts items={urgentItems} />}
        <QuickActions currentRole={currentRole} payments={mockPayments} />
        <InsightsGrid analytics={analytics} currentRole={currentRole} />
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} showFilters={showFilters} setShowFilters={setShowFilters} applications={applications} />
        <ApplicationsTable applications={applications} currentRole={currentRole} />
        <PaymentsSection payments={mockPayments} />
      </main>
    </div>
  );
}