import { Team, Match, Pool } from './types';

export const FALLBACK_TIMESTAMP = '2026-09-25T13:00:00Z';

export const fallbackTeams: Team[] = [
  {
    TeamId: -50331,
    Name: 'THESA JH Black',
    ClubId: -50908,
    ClubName: 'THESA',
    DivisionId: -50016,
    DivisionName: 'Middle School',
    PoolId: -50001,
    PoolName: 'MS Pool A'
  },
  {
    TeamId: -50332,
    Name: 'THESA JH Red',
    ClubId: -50908,
    ClubName: 'THESA',
    DivisionId: -50016,
    DivisionName: 'Middle School',
    PoolId: -50004,
    PoolName: 'MS Pool D'
  },
  {
    TeamId: -50329,
    Name: 'THESA JV Black',
    ClubId: -50908,
    ClubName: 'THESA',
    DivisionId: -50018,
    DivisionName: 'Junior Varsity',
    PoolId: -50008,
    PoolName: 'JV Pool E'
  },
  {
    TeamId: -50330,
    Name: 'THESA JV Red',
    ClubId: -50908,
    ClubName: 'THESA',
    DivisionId: -50018,
    DivisionName: 'Junior Varsity',
    PoolId: -50007,
    PoolName: 'JV Pool D'
  },
  {
    TeamId: -50328,
    Name: 'THESA Var',
    ClubId: -50908,
    ClubName: 'THESA',
    DivisionId: -50019,
    DivisionName: 'Varsity',
    PoolId: -50011,
    PoolName: 'Var Pool D'
  }
];

export const fallbackMatches: Match[] = [
  {
    MatchId: -50100,
    TeamAId: -50331,
    TeamBId: -50400,
    TeamAName: 'THESA JH Black',
    TeamBName: 'Opponent 1',
    Court: 'Ct.9',
    StartTime: '2026-10-02T08:00:00-05:00',
    MatchType: 'pool'
  },
  {
    MatchId: -50101,
    TeamAId: -50331,
    TeamBId: -50401,
    TeamAName: 'THESA JH Black',
    TeamBName: 'Opponent 2',
    Court: 'Ct.9',
    StartTime: '2026-10-02T10:00:00-05:00',
    MatchType: 'pool'
  },
  {
    MatchId: -50102,
    TeamAId: -50331,
    TeamBId: -50402,
    TeamAName: 'THESA JH Black',
    TeamBName: 'Opponent 3',
    Court: 'Ct.9',
    StartTime: '2026-10-02T13:00:00-05:00',
    MatchType: 'pool'
  }
];

export const fallbackRefDuties: Match[] = [
  {
    MatchId: -50103,
    TeamAId: -50403,
    TeamBId: -50404,
    TeamAName: 'Team A',
    TeamBName: 'Team B',
    Court: 'Ct.9',
    StartTime: '2026-10-02T09:00:00-05:00',
    MatchType: 'pool',
    RefTeamId: -50331
  },
  {
    MatchId: -50104,
    TeamAId: -50405,
    TeamBId: -50406,
    TeamAName: 'Team C',
    TeamBName: 'Team D',
    Court: 'Ct.9',
    StartTime: '2026-10-02T11:00:00-05:00',
    MatchType: 'pool',
    RefTeamId: -50331
  }
];
