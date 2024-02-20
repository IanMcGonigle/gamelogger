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
            <img src={us.badge} alt={us.name} />
            {goals.length}
          </h2>
          <AddGoal
            team={us}
            opponent={them}
            players={players}
            onComplete={(g: IGoal) => {
              onGoal(g);
            }}
            onCancel={() => {}}
          />
          {goals && goals.length > 0 && (
            <ul>
              {goals.map((g: IGoal, i: number) => {
                return (
                  <li
                    key={`${i}_${g.player.firstName}`}
                    className={`goal-scored${
                      g.ownGoal ? ' goal-scored--own' : ''
                    }`}
                  >
                    {g.player.firstName} {g.player.lastName}
                    {g.ownGoal ? `(OG)` : ``}
                    {g.penaltyKick ? `(P)` : ``}
                  </li>
                );
              })}
            </ul>
          )}
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