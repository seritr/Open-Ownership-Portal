// components/dashboard/InsightsGrid.tsx
import InsightCard from './InsightCard';
import { FileText, Clock, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';

interface InsightsGridProps {
  analytics: any;
  currentRole: 'officer' | 'supervisor';
}

export default function InsightsGrid({ analytics, currentRole }: InsightsGridProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Key Metrics</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center">
          View details
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard icon={FileText} title="Total Applications" value={analytics.total} subtitle={`Avg. ${analytics.avgProcessingTime} days`} trend="+12%" color="bg-indigo-600" actionLabel="View all" />
        <InsightCard icon={Clock} title="Awaiting Action" value={analytics.pending} subtitle={`${analytics.inReview} in review`} color="bg-amber-600" actionLabel="Review now" />
        <InsightCard icon={CheckCircle} title="Approved Today" value={analytics.approved} trend="+8%" subtitle="On track" color="bg-emerald-600" actionLabel="See approved" />
        {currentRole === 'supervisor' ? (
          <InsightCard icon={DollarSign} title="Revenue" value={`$${analytics.totalRevenue.toLocaleString()}`} trend="+15%" subtitle="This period" color="bg-purple-600" actionLabel="View breakdown" />
        ) : (
          <InsightCard icon={TrendingUp} title="Success Rate" value="85%" subtitle="Your approval rate" trend="+3%" color="bg-blue-600" actionLabel="View history" />
        )}
      </div>
    </div>
  );
}