import React, {useReducer} from 'react';
import { incrementGoalsScored, addGoalScored } from '../database/dataActions';
import { AnimatePresence, motion } from 'framer-motion';
import { Team, Player, Goal, IGoal } from '../types';
import { AddGoalActions, AddGoalReducer, AddGoalState, initialState } from '../reducers/AddGoalReducer';
import AddPlayer from './AddPlayer';

export interface AddGoalProps {
  date: string,
  match: string,
  team: Team;
  opponent?:Team;
  players: Array<Player>;
  onComplete: Function
  onCancel: Function
}

export default function AddGoal (props: AddGoalProps) {
  const { players, team, onComplete, opponent, date, match} = props;
  const firstState: AddGoalState = { ...initialState };
  const [state, dispatch] = useReducer(AddGoalReducer, firstState);

  const { addingGoal, addingNewPlayer, playerSelectValue, time, penaltyKick, ownGoal, goalScorer } = state;

  const playerByName = (name:string):Player|void => {
    return players.find((p: Player) => p.fullName === name);
  }

  return (
    <div className={`AddGoal${addingGoal ? ' zzzzzzAddGoal--addingGoal' : ''}`}>
      {!addingGoal && (
        <button
          onClick={() => {
            dispatch({ type: AddGoalActions.addGoal });
          }}
        >
          Add Goal
        </button>
      )}
      {addingGoal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className='AddGoal AddGoal--addingGoal'
          >
            {addingGoal && addingNewPlayer && (
              <AddPlayer
                teams={[team]}
                onComplete={(p: Player) => {
                  console.log(p);
                  dispatch({
                    type: AddGoalActions.addNewGoalScorer,
                    payload: {
                      goalScorer: p,
                      playerSelectValue: p.fullName,
                    },
                  });
                }}
                onCancel={() => {
                  dispatch({
                    type: AddGoalActions.addNewPlayer,
                    payload: false,
                  });
                }}
              />
            )}
            {addingGoal && !addingNewPlayer && (
              <>
                <div className='inputRow'>
                  <label htmlFor={`playerSelect_${team.id}`}>Goal Scorer</label>
                  <select
                    id={`playerSelect_${team.id}`}
                    value={playerSelectValue}
                    onChange={(e) => {
                      if (e.target.value === 'addNewPlayer') {
                        dispatch({
                          type: AddGoalActions.addNewPlayer,
                          payload: true,
                        });
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
                      .filter((p: Player) => {
                        if (ownGoal) {
                          return p.teamId === opponent?.id;
                        } else {
                          return p.teamId === team?.id;
                        }
                      })
                      .map((p: Player) => {
                        return (
                          <option key={p.firstName} value={p.fullName}>
                            #{p.jerseyNumber} {p.firstName} {p.lastName}
                          </option>
                        );
                      })}
                  </select>
                </div>
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
                <div className='buttonRow'>
                  <button
                    disabled={!goalScorer}
                    onClick={async () => {
                      const add: number = ownGoal ? 0 : 1;
                      const goalData = {
                        date,
                        matchId: match,
                        for: team.id,
                        against: opponent?.id || '',
                        playerId: goalScorer.id,
                        penaltyKick,
                        ownGoal
                      } as IGoal;
                      const newGoal = new Goal(goalData);
                      await addGoalScored(newGoal);
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
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
