import React, {useState} from 'react';
import { ITeam, IPlayer } from '../types';
import AddPlayer from './AddPlayer';

export interface AddGoalProps {
  team: ITeam;
  players: Array<IPlayer>;
  onComplete: Function
  onCancel: Function
}

export default function AddGoal (props: AddGoalProps) {
  const { players, team, onComplete} = props;
  const [addingGoal, setAddingGoal] = useState<boolean>(false);
  const [time, setTime] = useState<number>();
  const [addingPlayer, setAddingPlayer] = useState<boolean>(false);
  const [goalScorer, setGoalScorer] = useState<IPlayer|void>();
  const [teammates, setTeammates] = useState<IPlayer[]>(players.filter((p: IPlayer) => p.teamId === team.id));
  const [selectValue, setSelectValue] = useState<number|string>(-1);

  const playerString = (player:IPlayer):string => {
    return `${player.jerseyNumber} ${player.firstName} ${player.lastName}`;
  }

  const playerByName = (name:string):IPlayer|void => {
    return teammates.find((p: IPlayer) => playerString(p) === name);
  }

  return (
    <div className='AddGoal'>
      {!addingGoal && (
        <button
          onClick={() => {
            setAddingGoal(!addingGoal);
          }}
        >
          Add Goal
        </button>
      )}
      {addingGoal && !addingPlayer && (
        <select
          id='playerSelect'
          value={selectValue}
          onChange={(e) => {
            console.log(e.target.value);
            if (e.target.value === 'addNewPlayer') {
              setAddingPlayer(true);
              setSelectValue(-1);
              return;
            }
            const p = playerByName(e.target.value);
            if (p) {
              setGoalScorer(p);
            }
          }}
        >
          <option value='-1'>Select goal scorer</option>
          <option value='addNewPlayer'>Add player</option>
          {teammates.map((p: IPlayer) => (
            <option key={p.firstName} value={playerString(p)}>
              #{p.jerseyNumber} {p.firstName} {p.lastName}
            </option>
          ))}
        </select>
      )}
      {addingGoal && addingPlayer && (
        <AddPlayer
          teams={[team]}
          onComplete={(p: IPlayer) => {
            setTeammates([...teammates, p]);
            setGoalScorer(p);
            setSelectValue(-1);
            setAddingPlayer(false);
          }}
          onCancel={() => {
            setAddingPlayer(false);
            setSelectValue(-1);
          }}
        />
      )}
      {addingGoal && (
        <>
          <input
            type='number'
            placeholder='minute scored'
            value={time}
            onChange={(e) => {
              setTime(Number(e.target.value));
            }}
          />
          <button
            onClick={() => {
              onComplete({ team, player: goalScorer, time });
            }}
          >
            save goal
          </button>
        </>
      )}
    </div>
  );
}
