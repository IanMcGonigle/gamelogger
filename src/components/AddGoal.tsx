import React, {useReducer} from 'react';
import { incrementGoalsScored } from '../database/dataActions';
import { ITeam, IPlayer } from '../types';
import { AddGoalActions, AddGoalReducer, AddGoalState, initialState } from '../reducers/AddGoalReducer';
import AddPlayer from './AddPlayer';

export interface AddGoalProps {
  team: ITeam;
  opponent?:ITeam;
  players: Array<IPlayer>;
  onComplete: Function
  onCancel: Function
}

export default function AddGoal (props: AddGoalProps) {
  const { players, team, onComplete, opponent} = props;
  const firstState: AddGoalState = { ...initialState };
  const [state, dispatch] = useReducer(AddGoalReducer, firstState);

  const { addingGoal, addingNewPlayer, playerSelectValue, time, penaltyKick, ownGoal, goalScorer } = state;

  const playerString = (player:IPlayer):string => {
    return `${player.jerseyNumber} ${player.firstName} ${player.lastName}`;
  }

  const playerByName = (name:string):IPlayer|void => {
    return players.find((p: IPlayer) => playerString(p) === name);
  }

  return (
    <div className={`AddGoal${addingGoal ? ' AddGoal--addingGoal' : ''}`}>
      {!addingGoal && (
        <button
          onClick={() => {
            dispatch({ type: AddGoalActions.addGoal });
          }}
        >
          Add Goal
        </button>
      )}
      {addingGoal && !addingNewPlayer && (
        <div className='inputRow'>
          <label htmlFor={`playerSelect_${team.id}`}>Goal Scorer</label>
          <select
            id={`playerSelect_${team.id}`}
            value={playerSelectValue}
            onChange={(e) => {
              if (e.target.value === 'addNewPlayer') {
                dispatch({ type: AddGoalActions.addNewPlayer, payload: true });
              } else {
                dispatch({
                  type: AddGoalActions.addGoalScorer,
                  payload: {
                    goalScorer: playerByName(e.target.value),
                    playerSelectValue: e.target.value,
                  },
                });
              }
            }}
          >
            <option value='-1'>Select goal scorer</option>
            <option value='addNewPlayer'>Add player</option>
            {players
              .filter((p: IPlayer) => {
                if (ownGoal) {
                  return p.teamId === opponent?.id;
                } else {
                  return p.teamId === team?.id;
                }
              })
              .map((p: IPlayer) => {
                return (
                  <option key={p.firstName} value={playerString(p)}>
                    #{p.jerseyNumber} {p.firstName} {p.lastName}
                  </option>
                );
              })}
          </select>
        </div>
      )}
      {addingGoal && addingNewPlayer && (
        <AddPlayer
          teams={[team]}
          onComplete={(p: IPlayer) => {
            const ps = playerString(p);
            console.log(p);
            dispatch({
              type: AddGoalActions.addNewGoalScorer,
              payload: {
                goalScorer: p,
                playerSelectValue: ps,
              },
            });
          }}
          onCancel={() => {
            dispatch({ type: AddGoalActions.addNewPlayer, payload: false });
          }}
        />
      )}
      {addingGoal && !addingNewPlayer && (
        <>
          <div className='inputRow'>
            <label htmlFor=''>Minute Scored</label>
            <input
              type='text'
              pattern='[0-9\+ ]*'
              value={time}
              onChange={(e) => {
                dispatch({
                  type: AddGoalActions.setTime,
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div className='checkboxRow'>
            <input
              type='checkbox'
              id={`penaltyKick_${team.id}`}
              checked={penaltyKick}
              onChange={(e) => {
                dispatch({
                  type: AddGoalActions.penaltyKick,
                  payload: e.target.checked,
                });
              }}
            />
            <label htmlFor={`penaltyKick_${team.id}`}>Penalty Kick</label>
          </div>
          <div className='checkboxRow'>
            <input
              type='checkbox'
              id={`ownGoal_${team.id}`}
              checked={ownGoal}
              onChange={(e) => {
                dispatch({
                  type: AddGoalActions.ownGoal,
                  payload: {
                    checked: e.target.checked,
                  },
                });
              }}
            />
            <label htmlFor={`ownGoal_${team.id}`}>Own Goal</label>
          </div>
          <div className='inputRow'>
            <button
              disabled={!(goalScorer)}
              onClick={async () => {
                const add: number = ownGoal ? 0 : 1;
                await incrementGoalsScored(goalScorer, add);
                onComplete({
                  team,
                  player: goalScorer,
                  time,
                  ownGoal,
                  penaltyKick,
                });
                dispatch({ type: AddGoalActions.reset });
              }}
            >
              save goal
            </button>
            <button
              onClick={() => {
                dispatch({ type: AddGoalActions.reset });
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
