'use client';
import {LucideIcon, TrendingUp} from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  color: string;
  actionLabel?: string;
  onClick?: () => void;
}

export default function InsightCard({ icon: Icon, title, value, subtitle, trend, color, actionLabel, onClick }: InsightCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group cursor-pointer" onClick={onClick}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-200`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          {trend && (
            <span className="text-sm font-medium text-emerald-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      {actionLabel && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between group-hover:bg-gray-100 transition-colors">
          <span className="text-sm font-medium text-gray-700">{actionLabel}</span>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
        </div>
      )}
    </div>
  );
}