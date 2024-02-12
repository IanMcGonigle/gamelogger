import React from 'react'
import TeamSelector from './TeamSelector';
import AddGoal from './AddGoal';
import { ITeam, IGoal, IPlayer } from '../types';

type TeamGameSheetProps = {
  us?: ITeam;
  them?: ITeam;
  teams: Array<ITeam>;
  goals: Array<IGoal>;
  players: Array<IPlayer>;
  label: string
  onGoal: Function;
  onTeamSelect: Function;
};

const TeamGameSheet = (props: TeamGameSheetProps) => {
  const { teams, us, them, goals, label,players, onGoal, onTeamSelect } = props;
  return (
    <div className='team'>
      {us !== undefined ? (
        <>
          <h2>
            {us.name} : {goals.length}
          </h2>
          {goals && goals.length > 0 && (
            <ul>
              {goals.map((g: IGoal, i:number) => {
                return (
                  <li key={`${i}_${g.player.firstName}`}>
                    {g.player.firstName} {g.player.lastName}
                  </li>
                );
              })}
            </ul>
          )}
          <AddGoal
            team={us}
            opponent={them}
            players={players}
            onComplete={(g: IGoal) => {
              // onGoal([...goals, g]);
              onGoal(g);
            }}
            onCancel={() => {}}
          />
        </>
      ) : (
        <>
          <p>Select {label}:</p>
          <TeamSelector
            teams={teams.filter((t: ITeam) => t.id !== them?.id)}
            setTeam={(t: ITeam) => {
              onTeamSelect(t);
            }}
          />
        </>
      )}
    </div>
  );
};

export default TeamGameSheet