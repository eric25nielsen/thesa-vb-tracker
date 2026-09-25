'use client';

import { PoolStanding } from '@/lib/types';

interface StandingsTableProps {
  standings: PoolStanding[];
  highlightTeamId: number;
}

export default function StandingsTable({ standings, highlightTeamId }: StandingsTableProps) {
  const getBracketLabel = (rank: number): string => {
    if (rank === 1) return 'Gold';
    if (rank === 2) return 'Silver';
    if (rank === 3 || rank === 4) return 'Bronze';
    return '';
  };

  const getBracketColor = (rank: number): string => {
    if (rank === 1) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700';
    if (rank === 2) return 'bg-gray-50 dark:bg-gray-700/30 border-gray-300 dark:border-gray-600';
    if (rank === 3 || rank === 4) return 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700';
    return '';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">#</th>
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Team</th>
            <th className="text-center py-2 px-2 font-medium text-gray-700 dark:text-gray-300">W-L</th>
            <th className="text-center py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Sets</th>
            <th className="text-center py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Pts</th>
            <th className="text-center py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Bracket</th>
          </tr>
        </thead>
        <tbody>
          {standings.map(standing => {
            const isHighlighted = standing.TeamId === highlightTeamId;
            const rank = standing.Rank || 0;
            const bracketLabel = getBracketLabel(rank);
            
            return (
              <tr
                key={standing.TeamId}
                className={`
                  border-b border-gray-100 dark:border-gray-800
                  ${isHighlighted ? 'bg-blue-50 dark:bg-blue-900/20 font-semibold' : ''}
                `}
              >
                <td className="py-2 px-2 text-gray-900 dark:text-gray-200">{rank}</td>
                <td className="py-2 px-2 text-gray-900 dark:text-gray-200 truncate max-w-[150px]">
                  {standing.TeamName}
                </td>
                <td className="py-2 px-2 text-center text-gray-900 dark:text-gray-200">
                  {standing.Wins}-{standing.Losses}
                </td>
                <td className="py-2 px-2 text-center text-gray-700 dark:text-gray-300 text-xs">
                  {standing.SetWins}-{standing.SetLosses}
                </td>
                <td className="py-2 px-2 text-center text-gray-700 dark:text-gray-300 text-xs">
                  {standing.PointDiff > 0 ? '+' : ''}{standing.PointDiff}
                </td>
                <td className="py-2 px-2">
                  {bracketLabel && (
                    <div className={`
                      text-center text-xs font-medium py-1 px-2 rounded border
                      ${getBracketColor(rank)}
                    `}>
                      {bracketLabel}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
