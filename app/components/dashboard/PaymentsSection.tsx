'use client';
// components/dashboard/PaymentsSection.tsx
import { DollarSign } from 'lucide-react';
import { Payment } from '@/app/lib/mockData';

interface PaymentsSectionProps {
  payments: Payment[];
}

export default function PaymentsSection({ payments }: PaymentsSectionProps) {
  const totalDue = payments.reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    return status === 'overdue'
      ? 'bg-rose-100 text-rose-800 border-rose-200'
      : 'bg-amber-100 text-amber-800 border-amber-200';
  };

  const payAll = () => {
    if (payments.length === 0) return;
    const ok = window.confirm(`Proceed to pay $${totalDue} for ${payments.length} item(s)?`);
    if (ok) {
      window.alert('Payment initiated (mock).');
    }
  };

  const payOne = (payment: Payment) => {
    const ok = window.confirm(`Pay $${payment.amount} for ${payment.application}?`);
    if (ok) {
      window.alert(`Payment for ${payment.application} initiated (mock).`);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Pending Payments</h3>
            <p className="text-sm text-gray-600 mt-1">${totalDue} total due</p>
          </div>
          <button onClick={payAll} className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg">
            Pay All
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className={`p-4 rounded-xl ${payment.status === 'overdue' ? 'bg-rose-100 animate-pulse' : 'bg-amber-100'}`}>
                  <DollarSign className={`w-6 h-6 ${payment.status === 'overdue' ? 'text-rose-600' : 'text-amber-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <p className="font-bold text-gray-900">{payment.application}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status === 'overdue'
                        ? `${Math.abs(payment.daysUntilDue)} days overdue`
                        : `Due in ${payment.daysUntilDue} days`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{payment.appType}</p>
                  <p className="text-xs text-gray-500 mt-1">Due: {payment.dueDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right mr-4">
                  <p className="text-2xl font-bold text-gray-900">${payment.amount}</p>
                </div>
                <button onClick={() => payOne(payment)} className={`px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-md ${
                  payment.status === 'overdue'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}>
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}