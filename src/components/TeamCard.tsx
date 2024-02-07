import React, { useState } from 'react';
import AddGoal from './AddGoal';
import { IGoal, TeamCardProps } from '../types';



export default function TeamCard (props: TeamCardProps) {
  const { us, them, players } = props;
  const [goals, setGoals] = useState<IGoal[] | []>([]);
  return (
    <div>
      <h2>{us.name} : {goals.length}</h2>
      {goals && goals.length > 0 && (
        <ul>
          {goals.map((g: IGoal) => {
            return (
              <li key={g.player.firstName}>
                {g.player.firstName}{' '}
                {g.player.lastName}
              </li>
            );
          })}
        </ul>
      )}
      <AddGoal
        team={us}
        opponent={them}
        players={players}
        onComplete={(g:IGoal) => {
          setGoals([...goals, g]);
        }}
        onCancel={() => {}}
      />
    </div>
  );
}
