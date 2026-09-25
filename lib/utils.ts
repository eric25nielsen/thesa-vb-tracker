export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago',
    hour12: true
  }).format(date);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Chicago'
  }).format(date);
}

export function formatDateTime(dateStr: string): string {
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`;
}

export function getTimeUntil(dateStr: string): string {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  
  if (diff < 0) return 'Started';
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function parseTeamQuery(query: string | null): string[] {
  if (!query) return [];
  return query.split(',').map(t => t.trim().toLowerCase());
}

export function buildShareUrl(teams: string[]): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.searchParams.set('team', teams.join(','));
  return url.toString();
}

export function getMatchResult(
  match: { TeamAId: number; TeamBId: number; TeamAScore?: number[]; TeamBScore?: number[]; WinnerId?: number },
  teamId: number
): 'W' | 'L' | null {
  if (!match.WinnerId) return null;
  if (match.TeamAId !== teamId && match.TeamBId !== teamId) return null;
  return match.WinnerId === teamId ? 'W' : 'L';
}

export function formatSetScores(scoreA?: number[], scoreB?: number[]): string {
  if (!scoreA || !scoreB) return '';
  return scoreA.map((a, i) => `${a}-${scoreB[i]}`).join(', ');
}
