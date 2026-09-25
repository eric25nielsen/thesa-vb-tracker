'use client';

import { useEffect, useState } from 'react';
import { Match } from '@/lib/types';
import { formatTime, formatDate, getTimeUntil } from '@/lib/utils';

interface NextMatchCardProps {
  match: Match;
  teamId: number;
  allMatches: Match[];
}

export default function NextMatchCard({ match, teamId, allMatches }: NextMatchCardProps) {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getTimeUntil(match.StartTime));
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 30000);
    
    return () => clearInterval(interval);
  }, [match.StartTime]);

  const isTeamA = match.TeamAId === teamId;
  const opponentName = isTeamA ? match.TeamBName : match.TeamAName;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl shadow-lg p-5 text-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium uppercase tracking-wide opacity-90">
          Next Match
        </h3>
        {countdown && countdown !== 'Started' && (
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-semibold">{countdown}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-2xl font-bold mb-1">
            vs {opponentName || 'TBD'}
          </div>
          <div className="flex items-center gap-4 text-sm opacity-90">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatDate(match.StartTime)} · {formatTime(match.StartTime)} CT
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm opacity-90">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {match.Court}
        </div>
      </div>
    </div>
  );
}
