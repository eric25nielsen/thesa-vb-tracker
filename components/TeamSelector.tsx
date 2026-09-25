'use client';

import { THESA_TEAMS, type ThesaTeamKey, Team } from '@/lib/types';

interface TeamSelectorProps {
  selectedTeams: string[];
  onTeamsChange: (teams: string[]) => void;
  allTeams: Team[];
}

export default function TeamSelector({ selectedTeams, onTeamsChange, allTeams }: TeamSelectorProps) {
  const thesaKeys: ThesaTeamKey[] = ['jh-black', 'jh-red', 'jv-red', 'jv-black', 'var'];

  const toggleTeam = (teamKey: string) => {
    if (selectedTeams.includes(teamKey)) {
      if (selectedTeams.length > 1) {
        onTeamsChange(selectedTeams.filter(t => t !== teamKey));
      }
    } else {
      onTeamsChange([...selectedTeams, teamKey]);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Follow Teams
      </h2>
      <div className="flex flex-wrap gap-2">
        {thesaKeys.map(key => {
          const team = THESA_TEAMS[key];
          const isSelected = selectedTeams.includes(key);
          
          return (
            <button
              key={key}
              onClick={() => toggleTeam(key)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                }
              `}
            >
              {team.shortName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
