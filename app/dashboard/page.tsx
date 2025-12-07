'use client';

import { useState, useMemo } from 'react';
import {
  mockApplications,
  mockPayments,

} from '../lib/mockData';

import Header from '../components/dashboard/Header';
import RoleSwitcher from '../components/dashboard/RoleSwitcher';
import UrgentAlerts from '../components/dashboard/UrgentAlerts';
import QuickActions from '../components/dashboard/QuickActions';
import InsightsGrid from '../components/dashboard/InsightsGrid';
import SearchFilter from '../components/dashboard/SearchFilter';
import ApplicationsTable from '../components/dashboard/ApplicationsTable';
import PaymentsSection from '../components/dashboard/PaymentsSection';

import {DollarSign, Clock, AlertCircle, LucideIcon} from 'lucide-react';

export default function DashboardPage() {
  const [currentRole, setCurrentRole] = useState<'officer' | 'supervisor'>('officer');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dismissedUrgents, setDismissedUrgents] = useState<string[]>([]);

  const userName = currentRole === 'officer' ? 'Jackson Matafwali' : 'Sarah Manager';
  const roleTitle = currentRole === 'officer' ? 'Service Officer' : 'Supervisor';

  // Filtered applications
  const applications = useMemo(() => {
    let filtered = currentRole === 'officer'
      ? mockApplications.filter(app => app.submittedBy === 'Jackson Matafwali')
      : mockApplications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    return filtered;
  }, [currentRole, searchTerm, statusFilter]);

  // Analytics
  const analytics = useMemo(() => {
    const data = currentRole === 'officer'
      ? mockApplications.filter(app => app.submittedBy === 'Jackson Matafwali')
      : mockApplications;

    const total = data.length;
    const pending = data.filter(a => a.status === 'pending').length;
    const approved = data.filter(a => a.status === 'approved').length;
    const inReview = data.filter(a => a.status === 'review').length;
    const rejected = data.filter(a => a.status === 'rejected').length;
    const totalRevenue = data.reduce((sum, a) => sum + a.amount, 0);
    const avgProcessingTime = total > 0
      ? Math.round(data.reduce((sum, a) => sum + a.daysInProcess, 0) / total)
      : 0;

    return {
      total,
      pending,
      approved,
      inReview,
      rejected,
      totalRevenue,
      avgProcessingTime,
    };
  }, [currentRole]);

  // Urgent items (critical alerts)
  const urgentItems = useMemo(() => {
    const urgent: Array<{
      type: string;
      severity: 'critical' | 'high' | 'medium';
      message: string;
      action: string;
      icon: LucideIcon;
    }> = [];

    // Overdue payments
    const overduePayments = mockPayments.filter(p => p.status === 'overdue');
    if (overduePayments.length > 0) {
      urgent.push({
        type: 'payment',
        severity: 'critical',
        message: `${overduePayments.length} overdue payment${overduePayments.length > 1 ? 's' : ''}`,
        action: 'Pay now',
        icon: DollarSign,
      });
    }

    // High-priority pending apps (supervisor only)
    const highPriorityPending = applications.filter(a => a.priority === 'high' && a.status === 'pending');
    if (highPriorityPending.length > 0 && currentRole === 'supervisor') {
      urgent.push({
        type: 'review',
        severity: 'high',
        message: `${highPriorityPending.length} high-priority application${highPriorityPending.length > 1 ? 's' : ''} awaiting review`,
        action: 'Review now',
        icon: Clock,
      });
    }

    // Stalled applications (>7 days)
    const stalled = applications.filter(a => a.daysInProcess > 7 && a.status !== 'approved');
    if (stalled.length > 0 && currentRole === 'supervisor') {
      urgent.push({
        type: 'stalled',
        severity: 'medium',
        message: `${stalled.length} application${stalled.length > 1 ? 's' : ''} stalled (>7 days)`,
        action: 'Investigate',
        icon: AlertCircle,
      });
    }

    return urgent;
  }, [applications, currentRole]);

  // Filter out dismissed urgent items
  const filteredUrgentItems = useMemo(() => {
    if (!urgentItems || urgentItems.length === 0) return [] as typeof urgentItems;
    return urgentItems.filter((i) => !dismissedUrgents.includes(i.type));
  }, [urgentItems, dismissedUrgents]);

  const handleUrgentAction = (item: { type: string }) => {
    const scrollTo = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Perform context action (navigate to relevant section)
    if (item.type === 'payment') {
      scrollTo('payments-section');
    } else if (item.type === 'review') {
      scrollTo('applications-section');
    } else if (item.type === 'stalled') {
      scrollTo('applications-section');
    }

    // Dismiss this urgent item
    setDismissedUrgents((prev) => (prev.includes(item.type) ? prev : [...prev, item.type]));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        urgentCount={filteredUrgentItems.length}
        currentRole={currentRole}
        userName={userName}
        roleTitle={roleTitle}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RoleSwitcher currentRole={currentRole} setCurrentRole={setCurrentRole} />

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Good {getGreeting()}, {currentRole === 'officer' ? 'Jackson' : 'Sarah'}
          </h2>
          <p className="text-lg text-gray-600">
            {currentRole === 'officer'
              ? `You have ${applications.filter(a => a.status === 'pending').length} application${applications.filter(a => a.status === 'pending').length !== 1 ? 's' : ''} pending review.`
              : `${analytics.pending} applications need your attention across all teams.`}
          </p>
        </div>

        {/* Urgent Alerts */}
        {filteredUrgentItems.length > 0 && (
          <UrgentAlerts items={filteredUrgentItems} onAction={handleUrgentAction} />
        )}

        {/* Quick Actions */}
        <QuickActions currentRole={currentRole} payments={mockPayments} />

        {/* Key Metrics */}
        <div id="metrics-section"><InsightsGrid analytics={analytics} currentRole={currentRole} /></div>

        {/* Search & Filters */}
       <SearchFilter
           searchTerm={searchTerm}
           setSearchTerm={setSearchTerm}
           statusFilter={statusFilter}
           setStatusFilter={setStatusFilter}
           applications={applications} showFilters={false} />

        {/* Applications Table */}
        <div id="applications-section"><ApplicationsTable applications={applications} currentRole={currentRole} /></div>

        {/* Payments */}
        <div id="payments-section"><PaymentsSection payments={mockPayments} /></div>
      </main>
    </div>
  );
}