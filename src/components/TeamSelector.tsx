import React from 'react';
import { Team } from '../types';

export interface TeamSelectorProps {
  teams: Array<Team>;
  setTeam:Function
}

export default function TeamSelector (props: TeamSelectorProps) {
  const { teams, setTeam } = props;
  return (
    <div>
        <select
          onChange={(e) => {
            setTeam(teams.find((t: Team) => t.id === e.target.value));
          }}
        > <option value="-1">Select a team</option>
          {teams.map((t: Team) => {
            return (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            );
          })}
        </select>
    </div>
  );
}
