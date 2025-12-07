'use client';
// components/dashboard/UrgentAlerts.tsx
import { LucideIcon} from 'lucide-react';

interface UrgentItem {
  type: string;
  severity: 'critical' | 'high' | 'medium';
  message: string;
  action: string;
  icon: LucideIcon;
}

interface UrgentAlertsProps {
  items: UrgentItem[];
  onAction?: (item: UrgentItem) => void;
}

export default function UrgentAlerts({ items, onAction }: UrgentAlertsProps) {
  return (
    <div className="mb-6 space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all hover:scale-[1.02] ${
            item.severity === 'critical'
              ? 'bg-rose-50 border-rose-300 shadow-rose-100 shadow-lg'
              : item.severity === 'high'
              ? 'bg-amber-50 border-amber-300'
              : 'bg-blue-50 border-blue-300'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${
              item.severity === 'critical' ? 'bg-rose-100' :
              item.severity === 'high' ? 'bg-amber-100' : 'bg-blue-100'
            }`}>
              <item.icon className={`w-6 h-6 ${
                item.severity === 'critical' ? 'text-rose-600' :
                item.severity === 'high' ? 'text-amber-600' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-0.5">{item.message}</p>
              <p className="text-sm text-gray-600">Immediate action required</p>
            </div>
          </div>
          <button
            onClick={() => onAction?.(item)}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 shadow-md ${
            item.severity === 'critical'
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : item.severity === 'high'
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          >
            {item.action}
          </button>
        </div>
      ))}
    </div>
  );
}