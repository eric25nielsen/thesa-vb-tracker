'use client';

import { useEffect, useState } from 'react';
import { THESA_TEAMS, type ThesaTeamKey } from '@/lib/types';
import { parseTeamQuery } from '@/lib/utils';
import Header from '@/components/Header';
import TeamSelector from '@/components/TeamSelector';
import TeamView from '@/components/TeamView';
import { EventData, Team, Match } from '@/lib/types';
import { fetchEventData, fetchAllTeams, fetchPoolMatches, fetchBracketMatches } from '@/lib/api';

export default function Home() {
  const [selectedTeams, setSelectedTeams] = useState<string[]>(['jh-black']);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [poolMatches, setPoolMatches] = useState<Match[]>([]);
  const [bracketMatches, setBracketMatches] = useState<Match[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isFallback, setIsFallback] = useState(false);
  const [isNotPublished, setIsNotPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const teamQuery = params.get('team');
      if (teamQuery) {
        const teamKeys = parseTeamQuery(teamQuery);
        const validKeys = teamKeys.filter(key => key in THESA_TEAMS);
        if (validKeys.length > 0) {
          setSelectedTeams(validKeys);
          return;
        }
      }
      
      const saved = localStorage.getItem('selectedTeams');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSelectedTeams(parsed);
          }
        } catch (e) {
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams));
    }
  }, [selectedTeams]);

  const loadData = async () => {
    setIsLoading(true);
    const [eventResult, teamsResult, poolResult, bracketResult] = await Promise.all([
      fetchEventData(),
      fetchAllTeams(),
      fetchPoolMatches(),
      fetchBracketMatches()
    ]);

    if (eventResult.data) setEventData(eventResult.data);
    if (teamsResult.data) setTeams(teamsResult.data);
    if (poolResult.data) setPoolMatches(poolResult.data);
    if (bracketResult.data) setBracketMatches(bracketResult.data);
    
    setLastUpdated(new Date().toISOString());
    setIsFallback(eventResult.isFallback || teamsResult.isFallback);
    setIsNotPublished(
      teamsResult.isNotPublished === true ||
      poolResult.isNotPublished === true ||
      bracketResult.isNotPublished === true
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const url = buildShareUrl();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'THESA Volleyball — Dallas Angels Classic',
          text: 'Follow THESA volleyball at the Dallas Angels Classic 2026',
          url
        });
      } catch (err) {
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        alert(`Share this link: ${url}`);
      }
    }
  };

  const buildShareUrl = () => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.searchParams.set('team', selectedTeams.join(','));
    return url.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Header 
        lastUpdated={lastUpdated}
        isFallback={isFallback}
        isNotPublished={isNotPublished}
        onRefresh={loadData}
        onShare={handleShare}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-6 pb-20">
        <TeamSelector
          selectedTeams={selectedTeams}
          onTeamsChange={setSelectedTeams}
          allTeams={teams}
        />

        {isLoading && !eventData ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading event data...</p>
          </div>
        ) : isNotPublished ? (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Schedule Not Posted Yet
            </h2>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              Pool assignments and match schedules haven&apos;t been published by AES yet.
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This page updates automatically every 60 seconds. Check back closer to the event!
            </p>
            {lastUpdated && (
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-4">
                Last checked: {new Date(lastUpdated).toLocaleTimeString('en-US', { 
                  timeZone: 'America/Chicago',
                  hour: 'numeric',
                  minute: '2-digit'
                })} CT
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {selectedTeams.map(teamKey => {
              const teamInfo = THESA_TEAMS[teamKey as ThesaTeamKey];
              const team = teams.find(t => t.TeamId === teamInfo.id);
              
              return (
                <TeamView
                  key={teamKey}
                  teamKey={teamKey as ThesaTeamKey}
                  team={team}
                  poolMatches={poolMatches}
                  bracketMatches={bracketMatches}
                  allTeams={teams}
                  eventData={eventData}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
