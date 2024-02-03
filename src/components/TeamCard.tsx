import React, { useState } from 'react';
import AddGoal from './AddGoal';
import { IGoal, TeamCardProps, IPlayer } from '../types';



export default function TeamCard (props: TeamCardProps) {
  const { us, players } = props;
  const [goals, setGoals] = useState<IGoal[] | []>([]);
  return (
    <div>
      <h2>{us.name}</h2>
      {goals && goals.length > 0 && (
        <ul>
          {goals.map((g: IGoal) => {
            return (
              <li key={g.player.firstName}>
                #{g.player.jerseyNumber} {g.player.firstName}{' '}
                {g.player.lastName}
              </li>
            );
          })}
        </ul>
      )}
      <AddGoal
        team={us}
        players={players}
        onComplete={() => {}}
        onCancel={() => {}}
      />
      {/* <div className='AddGoal'>
        <select>
          {players
            .filter((p: IPlayer) => p.teamId === us.id)
            .map((p: IPlayer) => (
              <option key={p.firstName}>
                #{p.jerseyNumber} {p.firstName}{' '}
                {p.lastName}
              </option>
            ))}
        </select>
        <input type="number" placeholder='minute scored'/>
      </div> */}
    </div>
  );
}
