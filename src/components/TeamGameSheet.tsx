import React from 'react'
import TeamSelector from './TeamSelector';
import AddGoal from './AddGoal';
import { ITeam, IGoal, IPlayer, Team, Goal, Player } from '../types';

type TeamGameSheetProps = {
  date?:string,
  matchId?: string;
  us?: Team;
  them?: Team;
  teams: Array<Team>;
  goals: Array<Goal>;
  players: Array<Player>;
  label: string
  onGoal: Function;
  onTeamSelect: Function;
};

const TeamGameSheet = (props: TeamGameSheetProps) => {
  const { teams, us, them, goals, label, players, onGoal, onTeamSelect, date = "", matchId = "" } = props;
  return (
    <div className='team'>
      {us !== undefined ? (
        <>
          <h2>
            <img src={us.badge} alt={us.name} />
            {goals.length}
          </h2>
          <AddGoal
            date={date}
            match={matchId}
            team={us}
            opponent={them}
            players={players}
            onComplete={(g: IGoal) => {
              onGoal(g);
            }}
            onCancel={() => {}}
          />
          {goals && goals.length > 0 && (
            <ol>
              {goals.map((g: Goal, i: number) => {
                const player = players.find( (p:Player) => p.id === g.playerId)
                return (
                  <li
                    key={`${i}_${player?.firstName}`}
                    className={`goal-scored${
                      g.ownGoal ? ' goal-scored--own' : ''
                    }`}
                  >
                    {player?.fullName}
                    {g.ownGoal ? `(OG)` : ``}
                    {g.penaltyKick ? `(P)` : ``}
                  </li>
                );
              })}
            </ol>
          )}
        </>
      ) : (
        <>
          <p>Select {label}:</p>
          <TeamSelector
            teams={teams.filter((t: Team) => t.id !== them?.id)}
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