'use client';

import { Match } from '@/lib/types';
import { formatTime, formatDate } from '@/lib/utils';

interface RefDutyCardProps {
  duties: Match[];
}

export default function RefDutyCard({ duties }: RefDutyCardProps) {
  const upcomingDuties = duties
    .filter(d => new Date(d.StartTime) > new Date())
    .sort((a, b) => new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime());

  if (upcomingDuties.length === 0) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-4">
      <h3 className="text-md font-semibold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Ref / Work Duty
      </h3>
      <div className="space-y-2">
        {upcomingDuties.map(duty => (
          <div key={duty.MatchId} className="flex items-center justify-between text-sm">
            <div className="text-amber-900 dark:text-amber-200">
              {formatDate(duty.StartTime)} · {formatTime(duty.StartTime)}
            </div>
            <div className="text-amber-700 dark:text-amber-300 font-medium">
              {duty.Court}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
