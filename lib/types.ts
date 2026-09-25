export interface Team {
  TeamId: number;
  Name: string;
  ClubId: number;
  ClubName: string;
  DivisionId: number;
  DivisionName: string;
  PoolId?: number;
  PoolName?: string;
}

export interface Match {
  MatchId: number;
  TeamAId: number;
  TeamBId: number;
  TeamAName?: string;
  TeamBName?: string;
  Court: string;
  StartTime: string;
  TeamAScore?: number[];
  TeamBScore?: number[];
  WinnerId?: number;
  MatchType: 'pool' | 'bracket';
  BracketLevel?: string;
  RefTeamId?: number;
}

export interface PoolStanding {
  TeamId: number;
  TeamName: string;
  Wins: number;
  Losses: number;
  SetWins: number;
  SetLosses: number;
  PointDiff: number;
  Rank?: number;
}

export interface Pool {
  PoolId: number;
  Name: string;
  DivisionId: number;
  DivisionName: string;
  Teams: Team[];
}

export interface Division {
  DivisionId: number;
  Name: string;
  CodeAlias: string;
  ColorHex: string;
}

export interface EventData {
  Key: string;
  EventId: number;
  Name: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  Divisions: Division[];
}

export const THESA_TEAMS = {
  'jh-black': { id: -50331, name: 'THESA JH Black', shortName: 'JH Black', division: 'MS', pool: 'A' },
  'jh-red': { id: -50332, name: 'THESA JH Red', shortName: 'JH Red', division: 'MS', pool: 'D' },
  'jv-black': { id: -50329, name: 'THESA JV Black', shortName: 'JV Black', division: 'JV', pool: 'E' },
  'jv-red': { id: -50330, name: 'THESA JV Red', shortName: 'JV Red', division: 'JV', pool: 'D' },
  'var': { id: -50328, name: 'THESA Var', shortName: 'Varsity', division: 'Var', pool: 'D' },
} as const;

export type ThesaTeamKey = keyof typeof THESA_TEAMS;
