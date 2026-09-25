'use client';

import { useMemo } from 'react';
import { THESA_TEAMS, type ThesaTeamKey, Team, Match, EventData } from '@/lib/types';
import { getTeamMatches, getNextMatch, getRefDuties, calculateStandings } from '@/lib/api';
import NextMatchCard from './NextMatchCard';
import RefDutyCard from './RefDutyCard';
import MatchList from './MatchList';
import StandingsTable from './StandingsTable';

interface TeamViewProps {
  teamKey: ThesaTeamKey;
  team?: Team;
  poolMatches: Match[];
  bracketMatches: Match[];
  allTeams: Team[];
  eventData: EventData | null;
}

export default function TeamView({ teamKey, team, poolMatches, bracketMatches, allTeams, eventData }: TeamViewProps) {
  const teamInfo = THESA_TEAMS[teamKey];
  
  const allMatches = useMemo(() => [...poolMatches, ...bracketMatches], [poolMatches, bracketMatches]);
  
  const teamMatches = useMemo(
    () => getTeamMatches(teamInfo.id, allMatches),
    [teamInfo.id, allMatches]
  );

  const nextMatch = useMemo(
    () => getNextMatch(teamInfo.id, allMatches),
    [teamInfo.id, allMatches]
  );

  const refDuties = useMemo(
    () => getRefDuties(teamInfo.id, allMatches),
    [teamInfo.id, allMatches]
  );

  const poolTeams = useMemo(
    () => allTeams.filter(t => t.PoolId === team?.PoolId && team?.PoolId),
    [allTeams, team?.PoolId]
  );

  const poolStandings = useMemo(
    () => {
      if (poolTeams.length === 0) return [];
      const poolMatchesForThisPool = poolMatches.filter(m => 
        poolTeams.some(t => t.TeamId === m.TeamAId || t.TeamId === m.TeamBId)
      );
      return calculateStandings(poolTeams, poolMatchesForThisPool);
    },
    [poolTeams, poolMatches]
  );

  const eventStarted = eventData ? new Date(eventData.StartDate) < new Date() : false;

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {teamInfo.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {teamInfo.division}
          {team?.PoolName && ` · ${team.PoolName}`}
        </p>
      </div>

      {nextMatch && <NextMatchCard match={nextMatch} teamId={teamInfo.id} allMatches={allMatches} />}
      
      {refDuties.length > 0 && <RefDutyCard duties={refDuties} />}

      {teamMatches.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
            Schedule & Results
          </h3>
          <MatchList matches={teamMatches} teamId={teamInfo.id} />
        </div>
      )}

      {poolStandings.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
            {team?.PoolName || 'Pool'} Standings
          </h3>
          <StandingsTable standings={poolStandings} highlightTeamId={teamInfo.id} />
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Saturday Bracket: 1st → Gold, 2nd → Silver, 3rd-4th → Bronze
            </p>
          </div>
        </div>
      )}

      {!eventStarted && teamMatches.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
            Event starts Friday, October 2nd
          </p>
        </div>
      )}
    </div>
  );
}
