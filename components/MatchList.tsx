'use client';

import { Match } from '@/lib/types';
import { formatTime, formatDate, getMatchResult, formatSetScores } from '@/lib/utils';

interface MatchListProps {
  matches: Match[];
  teamId: number;
}

export default function MatchList({ matches, teamId }: MatchListProps) {
  const sortedMatches = [...matches].sort(
    (a, b) => new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedMatches.map(match => {
        const isTeamA = match.TeamAId === teamId;
        const opponentName = isTeamA ? match.TeamBName : match.TeamAName;
        const result = getMatchResult(match, teamId);
        const isPast = new Date(match.StartTime) < new Date();
        const setScores = formatSetScores(match.TeamAScore, match.TeamBScore);

        return (
          <div
            key={match.MatchId}
            className={`
              flex items-center justify-between p-3 rounded-lg border
              ${isPast
                ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800'
              }
            `}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`
                  font-semibold
                  ${isPast ? 'text-gray-900 dark:text-gray-200' : 'text-blue-900 dark:text-blue-200'}
                `}>
                  vs {opponentName || 'TBD'}
                </span>
                {result && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${result === 'W'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }
                  `}>
                    {result}
                  </span>
                )}
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                <div>
                  {formatDate(match.StartTime)} · {formatTime(match.StartTime)} · {match.Court}
                </div>
                {setScores && (
                  <div className="font-mono text-gray-700 dark:text-gray-300">
                    {setScores}
                  </div>
                )}
              </div>
            </div>

            {match.MatchType === 'bracket' && (
              <div className="ml-2 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium rounded">
                {match.BracketLevel || 'Bracket'}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
