import React, { useCallback, useEffect, useReducer, useContext} from 'react';
import { format } from 'date-fns';
import { setDoc,doc } from 'firebase/firestore';
import { ITeam, Player, IGoal, Team, Goal,  } from '../types';
import { db } from '../database/firebase';
import {  updateGame as update } from '../database/dataActions';
import TeamGameSheet from './TeamGameSheet';
import { StateContext } from '../context/StateContext';
import {
  GameState,
  GameRecorderReducer,
  GameRecorderActions,
} from '../reducers/GameRecorderReducer';
import { match } from 'assert';

type GameRecorderProps = {
  gameData: GameState;
  teams: Array<Team>;
  players: Array<Player>;
  goals:Array<Goal>;
  id: string;
};


export default function GameRecorder (props: GameRecorderProps) {
  const { teams, players, gameData, id, goals } = props;
  const [state, dispatch] = useReducer(GameRecorderReducer, gameData);
  const {
    date: matchDate,
    home: homeTeamId,
    away: awayTeamId,
    goals:goalIds,
  } = state;

  const getData = useCallback(() => {
    return {
      date: matchDate,
      home: homeTeamId,
      away: awayTeamId,
      goals: goalIds,
    };
  }, [matchDate, homeTeamId, awayTeamId, goalIds]);

  const updateGame = useCallback( async ()=> {
    const data = getData();
    await update(id, data);
    dispatch({ type: GameRecorderActions.updateGame, payload: data });
  },[getData, id]);

  const homeTeam: Team|undefined = teams.find((t: Team) => t.id === homeTeamId);
  const awayTeam: Team|undefined = teams.find((t: Team) => t.id === awayTeamId);

  useEffect(() => {
    updateGame();
  }, [updateGame]);

  return (
    <div className='GameRecorder'>
      <div className='inputRow inputRow--centered'>
        {matchDate && (
          <h3
            className='gameDate'
            onDoubleClick={() => {
              dispatch({
                type: GameRecorderActions.setMatchDate,
                payload: null,
              });
            }}
          >
            {format(new Date(matchDate.split('-').join('/')), 'PPPP')}
          </h3>
        )}
        {!matchDate && (
          <input
            type='date'
            onChange={(e: React.FormEvent) => {
              const dateInput: string = (e.target as HTMLInputElement).value;
              dispatch({
                type: GameRecorderActions.setMatchDate,
                payload: dateInput,
              });
            }}
          />
        )}
      </div>
      <div className='teamSheets'>
        <TeamGameSheet
          matchId={id}
          date={matchDate}
          us={homeTeam}
          them={awayTeam}
          goals={goals?.filter((g: Goal) => g.for === homeTeamId)}
          teams={teams}
          players={players}
          label='Home'
          onGoal={(g: Goal) => {
            // dispatch({ type: GameRecorderActions.setHomeGoals, payload: g });
            // console.log('homegoals ', homeGoals.length);
          }}
          onTeamSelect={(t: ITeam) => {
            dispatch({ type: GameRecorderActions.setHomeTeam, payload: t });
          }}
        />
        <span className='versus'>VS</span>
        <TeamGameSheet
          matchId={id}
          date={matchDate}
          us={awayTeam}
          them={homeTeam}
          goals={goals?.filter((g: Goal) => g.for === awayTeamId)}
          teams={teams}
          players={players}
          label='Away'
          onGoal={(g: IGoal) => {
            // dispatch({ type: GameRecorderActions.setAwayGoals, payload: g });
          }}
          onTeamSelect={(t: ITeam) => {
            dispatch({ type: GameRecorderActions.setAwayTeam, payload: t });
          }}
        />
      </div>
      {/* <button onClick={() => updateGame()}>Update Game</button> */}
    </div>
  );
}
