import React, {useReducer} from 'react';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../database/firebase';
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
  const firstState: AddGoalState = {
    ...initialState,
    teamMates: players.filter((p: IPlayer) => p.teamId === team.id),
  };
  const [state, dispatch] = useReducer(AddGoalReducer, firstState);

  const { addingGoal, addingNewPlayer, teamMates, playerSelectValue, time, penaltyKick, ownGoal, goalScorer } = state;

  const playerString = (player:IPlayer):string => {
    return `${player.jerseyNumber} ${player.firstName} ${player.lastName}`;
  }

  const playerByName = (name:string):IPlayer|void => {
    return teamMates.find((p: IPlayer) => playerString(p) === name);
  }

  return (
    <div className='AddGoal'>
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
        <select
          id='playerSelect'
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
          {teamMates.map((p: IPlayer) => {
            return (
              <option key={p.firstName} value={playerString(p)}>
                #{p.jerseyNumber} {p.firstName} {p.lastName}
              </option>
            );
          })}
        </select>
      )}
      {addingGoal && addingNewPlayer && (
        <AddPlayer
          teams={[team]}
          onComplete={(p: IPlayer) => {
            const ps = playerString(p);
            console.log(p)
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
      {addingGoal && (
        <>
          <input
            type='text'
            pattern='[0-9\+ ]*'
            placeholder='minute scored'
            value={time}
            onChange={(e) => {
              dispatch({
                type: AddGoalActions.setTime,
                payload: e.target.value,
              });
            }}
          />
          <br></br>
          <label htmlFor='penaltyKick'>Penalty Kick</label>
          <input
            type='checkbox'
            name='penaltyKick'
            id='penaltyKick'
            checked={penaltyKick}
            onChange={(e) => {
              dispatch({
                type: AddGoalActions.penaltyKick,
                payload: e.target.checked,
              });
            }}
          />
          <br></br>
          <label htmlFor='ownGoal'>Own Goal</label>
          <input
            type='checkbox'
            name='ownGoal'
            id='ownGoal'
            checked={ownGoal}
            onChange={(e) => {
              dispatch({
                type: AddGoalActions.ownGoal,
                payload: {
                  checked:e.target.checked,
                  teamMates: players.filter((p: IPlayer) => p.teamId === opponent?.id)
                }
              });
            }}
          />
          <button
            disabled={!(goalScorer && time)}
            onClick={ async () => {
              const playerDocRef = doc(db, 'players', goalScorer.id);
              await updateDoc(playerDocRef, { goals: increment(1) });
              onComplete({ team, player: goalScorer, time });
              dispatch({ type: AddGoalActions.reset });
            }}
          >
            save goal
          </button>
        </>
      )}
    </div>
  );
}
