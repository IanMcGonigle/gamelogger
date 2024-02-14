import React, { useReducer} from 'react';
import { format } from 'date-fns';
import { setDoc,doc } from 'firebase/firestore';
import { ITeam, GameRecorderProps, IGoal } from '../types';
import { db } from '../database/firebase';
import TeamGameSheet from './TeamGameSheet';
import {
  GameState,
  GameRecorderReducer,
  GameRecorderActions,
} from '../reducers/GameRecorderReducer';



export default function GameRecorder (props: GameRecorderProps) {
  const { teams, players, gameData, id } = props;
  const [state, dispatch] = useReducer(GameRecorderReducer, gameData);
  const { date:matchDate, home:homeTeam, away:awayTeam, homeGoals, awayGoals } = state;
  const getData = ():GameState => {
    return {
      date: matchDate,
      home: homeTeam,
      away: awayTeam,
      homeGoals,
      awayGoals
    };
  }
  const updateGame = async () => {
    try{
      const newData = getData();
      const docRef = doc(db, 'games', id);
      await setDoc(docRef, newData);
      dispatch({ type: GameRecorderActions.updateGame, payload: newData });
    } catch(error){
      console.log(error);
    }
  };

  return (
    <div className='GameRecorder'>
      <div className='inputRow'>
        {matchDate && <h3>{format(new Date(matchDate), 'PPPP')}</h3>}
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
            dispatch({type: GameRecorderActions.setHomeGoals, payload:g})
          }}
          onTeamSelect={(t: ITeam) => {
            dispatch({ type: GameRecorderActions.setHomeTeam, payload: t });
          }}
        />
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
      <button onClick={() => updateGame()}>Update Game</button>
    </div>
  );
}
