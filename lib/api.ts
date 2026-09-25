import { EventData, Team, Match, Pool, PoolStanding } from './types';
import { fallbackTeams } from './fallback-data';

const AES_BASE_URL = 'https://results.advancedeventsystems.com/api/event/RGFsbGFzX0FuZ2Vsc19DbGFzc2ljXzIwMjY1';
const EVENT_KEY = 'RGFsbGFzX0FuZ2Vsc19DbGFzc2ljXzIwMjY1';

export interface FetchResult<T> {
  data: T | null;
  isFallback: boolean;
  isNotPublished?: boolean;
  timestamp: string;
  error?: string;
}

function isJsonResponse(text: string): boolean {
  const trimmed = text.trim();
  return (trimmed.startsWith('{') || trimmed.startsWith('[')) && !trimmed.includes('<!doctype');
}

export async function fetchEventData(): Promise<FetchResult<EventData>> {
  try {
    const response = await fetch(AES_BASE_URL, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return {
      data,
      isFallback: false,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      data: {
        Key: EVENT_KEY,
        EventId: -50000,
        Name: 'Dallas Angels Classic 2026',
        StartDate: '2026-10-02T00:00:00',
        EndDate: '2026-10-03T23:59:59',
        Location: 'Fieldhouse USA Grapevine',
        Divisions: [
          { DivisionId: -50016, Name: 'Middle School', CodeAlias: 'MS', ColorHex: '#FF7FFF' },
          { DivisionId: -50018, Name: 'Junior Varsity', CodeAlias: 'JV', ColorHex: '#5FBFFF' },
          { DivisionId: -50019, Name: 'Varsity', CodeAlias: 'Var', ColorHex: '#5FDFDF' },
          { DivisionId: -50017, Name: 'Boys', CodeAlias: '', ColorHex: '#BFFF5F' }
        ]
      },
      isFallback: true,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function fetchAllTeams(): Promise<FetchResult<Team[]>> {
  try {
    const divisionIds = [-50016, -50017, -50018, -50019];
    const allTeams: Team[] = [];
    let htmlResponseCount = 0;
    
    for (const divId of divisionIds) {
      try {
        const response = await fetch(`${AES_BASE_URL}/division/${divId}/teams`, {
          headers: { 'Accept': 'application/json' },
          next: { revalidate: 60 }
        });
        
        if (response.ok) {
          const text = await response.text();
          if (isJsonResponse(text)) {
            const teams = JSON.parse(text);
            if (Array.isArray(teams)) {
              allTeams.push(...teams);
            }
          } else {
            htmlResponseCount++;
          }
        }
      } catch (e) {
      }
    }
    
    if (allTeams.length > 0) {
      return {
        data: allTeams,
        isFallback: false,
        timestamp: new Date().toISOString()
      };
    }
    
    if (htmlResponseCount === divisionIds.length) {
      return {
        data: fallbackTeams,
        isFallback: false,
        isNotPublished: true,
        timestamp: new Date().toISOString(),
        error: 'Schedule not published yet by AES'
      };
    }
    
    throw new Error('No teams found');
  } catch (error) {
    return {
      data: fallbackTeams,
      isFallback: true,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'API connection error'
    };
  }
}

export async function fetchPoolMatches(): Promise<FetchResult<Match[]>> {
  try {
    const response = await fetch(`${AES_BASE_URL}/pool-matches`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 }
    });
    
    if (response.ok) {
      const text = await response.text();
      if (isJsonResponse(text)) {
        const data = JSON.parse(text);
        return {
          data: Array.isArray(data) ? data : [],
          isFallback: false,
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          data: [],
          isFallback: false,
          isNotPublished: true,
          timestamp: new Date().toISOString(),
          error: 'Pool matches not published yet'
        };
      }
    }
    
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    return {
      data: [],
      isFallback: true,
      isNotPublished: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'API connection error'
    };
  }
}

export async function fetchBracketMatches(): Promise<FetchResult<Match[]>> {
  try {
    const response = await fetch(`${AES_BASE_URL}/bracket-matches`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 }
    });
    
    if (response.ok) {
      const text = await response.text();
      if (isJsonResponse(text)) {
        const data = JSON.parse(text);
        return {
          data: Array.isArray(data) ? data : [],
          isFallback: false,
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          data: [],
          isFallback: false,
          isNotPublished: true,
          timestamp: new Date().toISOString(),
          error: 'Bracket not published yet'
        };
      }
    }
    
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    return {
      data: [],
      isFallback: true,
      isNotPublished: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'API connection error'
    };
  }
}

export async function fetchPools(divisionId: number): Promise<FetchResult<Pool[]>> {
  try {
    const response = await fetch(`${AES_BASE_URL}/division/${divisionId}/pools`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 }
    });
    
    if (response.ok) {
      const text = await response.text();
      if (isJsonResponse(text)) {
        const data = JSON.parse(text);
        return {
          data: Array.isArray(data) ? data : [],
          isFallback: false,
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          data: [],
          isFallback: false,
          isNotPublished: true,
          timestamp: new Date().toISOString(),
          error: 'Pools not published yet'
        };
      }
    }
    
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    return {
      data: [],
      isFallback: true,
      isNotPublished: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'API connection error'
    };
  }
}

export function calculateStandings(teams: Team[], matches: Match[]): PoolStanding[] {
  const standings = new Map<number, PoolStanding>();
  
  teams.forEach(team => {
    standings.set(team.TeamId, {
      TeamId: team.TeamId,
      TeamName: team.Name,
      Wins: 0,
      Losses: 0,
      SetWins: 0,
      SetLosses: 0,
      PointDiff: 0
    });
  });
  
  matches.forEach(match => {
    if (!match.TeamAScore || !match.TeamBScore || !match.WinnerId) return;
    
    const teamA = standings.get(match.TeamAId);
    const teamB = standings.get(match.TeamBId);
    
    if (!teamA || !teamB) return;
    
    const aSetWins = match.TeamAScore.filter((score, i) => score > match.TeamBScore![i]).length;
    const bSetWins = match.TeamBScore.filter((score, i) => score > match.TeamAScore![i]).length;
    
    teamA.SetWins += aSetWins;
    teamA.SetLosses += bSetWins;
    teamB.SetWins += bSetWins;
    teamB.SetLosses += aSetWins;
    
    if (match.WinnerId === match.TeamAId) {
      teamA.Wins++;
      teamB.Losses++;
    } else {
      teamB.Wins++;
      teamA.Losses++;
    }
    
    const aPoints = match.TeamAScore.reduce((sum, s) => sum + s, 0);
    const bPoints = match.TeamBScore.reduce((sum, s) => sum + s, 0);
    teamA.PointDiff += (aPoints - bPoints);
    teamB.PointDiff += (bPoints - aPoints);
  });
  
  const standingsArray = Array.from(standings.values());
  
  standingsArray.sort((a, b) => {
    if (a.Wins !== b.Wins) return b.Wins - a.Wins;
    if (a.Losses !== b.Losses) return a.Losses - b.Losses;
    if (a.SetWins !== b.SetWins) return b.SetWins - a.SetWins;
    if (a.SetLosses !== b.SetLosses) return a.SetLosses - b.SetLosses;
    return b.PointDiff - a.PointDiff;
  });
  
  standingsArray.forEach((standing, index) => {
    standing.Rank = index + 1;
  });
  
  return standingsArray;
}

export function getRefDuties(teamId: number, matches: Match[]): Match[] {
  return matches.filter(m => m.RefTeamId === teamId);
}

export function getTeamMatches(teamId: number, matches: Match[]): Match[] {
  return matches.filter(m => m.TeamAId === teamId || m.TeamBId === teamId);
}

export function getNextMatch(teamId: number, matches: Match[]): Match | null {
  const now = new Date();
  const teamMatches = getTeamMatches(teamId, matches);
  const upcomingMatches = teamMatches
    .filter(m => new Date(m.StartTime) > now)
    .sort((a, b) => new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime());
  
  return upcomingMatches[0] || null;
}
