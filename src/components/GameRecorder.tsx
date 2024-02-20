import React, { useCallback, useEffect, useReducer, useState} from 'react';
import { format } from 'date-fns';
import { setDoc,doc } from 'firebase/firestore';
import { ITeam, GameRecorderProps, IGoal, Team } from '../types';
import { db } from '../database/firebase';
import {  updateGame as update } from '../database/dataActions';
import TeamGameSheet from './TeamGameSheet';
import {
  GameState,
  GameRecorderReducer,
  GameRecorderActions,
} from '../reducers/GameRecorderReducer';



export default function GameRecorder (props: GameRecorderProps) {
  const { teams, players, gameData, id } = props;
  const [state, dispatch] = useReducer(GameRecorderReducer, gameData);
  const { date:matchDate, home:homeTeam, away:awayTeam, homeGoals, awayGoals, draw, winner, loser } = state;

  const getData = useCallback(() => {
    return {
      date: matchDate,
      home: homeTeam,
      away: awayTeam,
      homeGoals,
      awayGoals,
      winner,
      loser,
      draw,
    };
  }, [matchDate,homeTeam,awayTeam,homeGoals,awayGoals,draw,winner,loser]);

  const updateGame = useCallback( async ()=> {
    const data = getData();
    await update(id, data);
    dispatch({ type: GameRecorderActions.updateGame, payload: data });
  },[getData, id])

  useEffect(() => {
    updateGame();
  }, [updateGame, homeGoals, awayGoals]);

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
          us={homeTeam}
          them={awayTeam}
          goals={homeGoals}
          teams={teams}
          players={players}
          label='Home'
          onGoal={(g: IGoal) => {
            dispatch({ type: GameRecorderActions.setHomeGoals, payload: g });
            console.log('homegoals ', homeGoals.length);
          }}
          onTeamSelect={(t: ITeam) => {
            dispatch({ type: GameRecorderActions.setHomeTeam, payload: t });
          }}
        />
        <span className='versus'>VS</span>
        <TeamGameSheet
          us={awayTeam}
          them={homeTeam}
          goals={awayGoals}
          teams={teams}
          players={players}
          label='Away'
          onGoal={(g: IGoal) => {
            dispatch({ type: GameRecorderActions.setAwayGoals, payload: g });
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
